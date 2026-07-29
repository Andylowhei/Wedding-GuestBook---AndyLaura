import { pgTable, text, timestamp, integer, date } from "drizzle-orm/pg-core";

export const guestbookMessages = pgTable("guestbook_messages", {
  id: text("id").primaryKey(),
  name: text("name").notNull().default("Anonymous"),
  message: text("message").notNull(),
  mood: text("mood").notNull().default("NEUTRAL"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const dailyCounters = pgTable("daily_counters", {
  day: date("day").primaryKey(),
  msgCount: integer("msg_count").notNull().default(0),
});
