import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { guestbookMessages, dailyCounters } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import { detectMood } from "@/lib/sentiment";
import { randomUUID } from "crypto";

const MAX_CHARS = 300;
const DAILY_LIMIT = 500;

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

async function reserveSlot(): Promise<number> {
  const today = todayISO();
  const result = await db
    .insert(dailyCounters)
    .values({ day: today, msgCount: 1 })
    .onConflictDoUpdate({
      target: dailyCounters.day,
      set: { msgCount: sql`${dailyCounters.msgCount} + 1` },
    })
    .returning({ msgCount: dailyCounters.msgCount });

  return result[0].msgCount;
}

export async function GET() {
  const msgs = await db
    .select()
    .from(guestbookMessages)
    .orderBy(desc(guestbookMessages.createdAt))
    .limit(200);

  return NextResponse.json(msgs);
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const name = (typeof body.name === "string" ? body.name : "Anonymous")
    .trim()
    .slice(0, 40) || "Anonymous";
  const message = (typeof body.message === "string" ? body.message : "")
    .trim()
    .slice(0, MAX_CHARS);

  if (!message) {
    return NextResponse.json(
      { error: "Message cannot be empty." },
      { status: 400 }
    );
  }

  const count = await reserveSlot();
  if (count > DAILY_LIMIT) {
    return NextResponse.json(
      { error: "The guestbook is full for today. Come back tomorrow!" },
      { status: 429 }
    );
  }

  const mood = detectMood(message);
  const id = `msg#${randomUUID()}`;
  const now = new Date();

  const [item] = await db
    .insert(guestbookMessages)
    .values({ id, name, message, mood, createdAt: now })
    .returning();

  return NextResponse.json(item);
}
