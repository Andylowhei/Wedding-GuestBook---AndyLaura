"use client";

import { useEffect, useState, useCallback, useRef } from "react";

interface GuestbookMessage {
  id: string;
  name: string;
  message: string;
  mood: string;
  createdAt: string;
}

const MOOD_COLOURS: Record<string, string> = {
  POSITIVE: "#EAF6E9",
  NEGATIVE: "#FDECEA",
  NEUTRAL: "#F1F2F4",
  MIXED: "#FFF4E5",
};

const MOOD_EMOJI: Record<string, string> = {
  POSITIVE: "😊",
  NEGATIVE: "😢",
  NEUTRAL: "😐",
  MIXED: "🤔",
};

const MOOD_BORDER: Record<string, string> = {
  POSITIVE: "#B8DCAF",
  NEGATIVE: "#F3C1BD",
  NEUTRAL: "#D4D6DA",
  MIXED: "#F0D9AA",
};

export default function GuestbookSection() {
  const [messages, setMessages] = useState<GuestbookMessage[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  const loadMessages = useCallback(async () => {
    try {
      const res = await fetch("/api/guestbook");
      if (res.ok) {
        const data: GuestbookMessage[] = await res.json();
        setMessages(data);
      }
    } catch {
      // silently retry on next load
    }
  }, []);

  useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, 15000); // auto-refresh every 15s
    return () => clearInterval(interval);
  }, [loadMessages]);

  async function handlePost(e: React.FormEvent) {
    e.preventDefault();
    const trimMsg = message.trim();
    if (!trimMsg) {
      setError("Please write a message first!");
      return;
    }
    setError("");
    setSuccess("");
    setPosting(true);

    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() || "Anonymous", message: trimMsg }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
      } else {
        setSuccess("Thank you for your lovely message! 💕");
        setMessage("");
        await loadMessages();
        setTimeout(() => setSuccess(""), 4000);
      }
    } catch {
      setError("Could not send your message. Please try again.");
    } finally {
      setPosting(false);
    }
  }

  function formatDate(iso: string) {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  }

  return (
    <div>
      {/* Form */}
      <form
        onSubmit={handlePost}
        className="rounded-2xl bg-white/80 backdrop-blur shadow-md border border-[#E8DDD0]/60
                   p-6 sm:p-8 mb-10"
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="gb-name" className="block text-xs tracking-wider uppercase text-[#8B7355] mb-1.5">
              Your Name
            </label>
            <input
              id="gb-name"
              type="text"
              maxLength={40}
              placeholder="e.g. Jane Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-[#E0D5C7] bg-[#FDF8F4] px-4 py-2.5
                         text-[#3D3027] placeholder-[#B8A99A] focus:border-[#C4956A]
                         focus:ring-2 focus:ring-[#C4956A]/20 focus:outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="gb-msg" className="block text-xs tracking-wider uppercase text-[#8B7355] mb-1.5">
              Your Message
            </label>
            <textarea
              id="gb-msg"
              maxLength={300}
              rows={3}
              placeholder="Share your wishes for Andy & Laura…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-lg border border-[#E0D5C7] bg-[#FDF8F4] px-4 py-2.5
                         text-[#3D3027] placeholder-[#B8A99A] focus:border-[#C4956A]
                         focus:ring-2 focus:ring-[#C4956A]/20 focus:outline-none transition resize-none"
            />
            <p className="mt-1 text-right text-[10px] text-[#B8A99A]">
              {message.length}/300
            </p>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">{error}</p>
          )}
          {success && (
            <p className="text-sm text-green-700 bg-green-50 rounded-lg px-4 py-2">{success}</p>
          )}

          <button
            type="submit"
            disabled={posting}
            className="w-full rounded-lg bg-gradient-to-r from-[#C4956A] to-[#D4A574]
                       px-6 py-3 text-sm font-semibold tracking-wider uppercase text-white
                       shadow-md hover:shadow-lg hover:from-[#B38559] hover:to-[#C4956A]
                       disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {posting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Sending…
              </span>
            ) : (
              "✉ Post Message"
            )}
          </button>
        </div>
      </form>

      {/* Messages */}
      <div ref={listRef}>
        {messages.length === 0 ? (
          <p className="text-center text-[#B8A99A] text-sm italic py-10">
            Be the first to sign the guestbook! ✨
          </p>
        ) : (
          <>
            <p className="text-center text-xs tracking-wider uppercase text-[#8B7355] mb-6">
              {messages.length} message{messages.length !== 1 ? "s" : ""} so far
            </p>
            <div className="space-y-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className="rounded-xl p-5 shadow-sm transition-all duration-300 hover:shadow-md"
                  style={{
                    backgroundColor: MOOD_COLOURS[m.mood] || MOOD_COLOURS.NEUTRAL,
                    borderLeft: `4px solid ${MOOD_BORDER[m.mood] || MOOD_BORDER.NEUTRAL}`,
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="font-serif font-semibold text-[#3D3027]">
                          {m.name}
                        </span>
                        <span
                          className="inline-flex items-center gap-1 rounded-full px-2 py-0.5
                                     text-[10px] uppercase tracking-wider font-medium"
                          style={{
                            backgroundColor: `${MOOD_BORDER[m.mood] || MOOD_BORDER.NEUTRAL}66`,
                            color: "#5C4D3C",
                          }}
                        >
                          {MOOD_EMOJI[m.mood] || "😐"} {m.mood}
                        </span>
                      </div>
                      <p className="text-[#3D3027] leading-relaxed text-sm sm:text-base">
                        {m.message}
                      </p>
                      <p className="mt-2 text-[10px] text-[#8B7355]/70">
                        {formatDate(m.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
