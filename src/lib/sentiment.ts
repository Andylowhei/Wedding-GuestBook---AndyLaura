/**
 * Offline sentiment / mood detection.
 * Mirrors the keyword-based fallback from the AWS Lambda guide,
 * so the guestbook colours messages even without Amazon Comprehend.
 */

const POSITIVE = new Set([
  "love", "amazing", "great", "awesome", "wonderful", "excellent", "fantastic",
  "good", "happy", "best", "brilliant", "nice", "enjoy", "enjoyed", "perfect",
  "thanks", "thank", "cool", "fun", "helpful", "clear", "easy", "impressive",
  "superb", "like", "liked", "recommend", "wow", "beautiful", "gorgeous",
  "stunning", "lovely", "blessed", "joy", "joyful", "congratulations",
  "congrats", "celebrate", "celebration", "cheers", "hooray", "yay",
  "excited", "exciting", "thrilled", "delighted", "graceful", "elegant",
  "charming", "sweet", "sweetest", "heartfelt", "warm", "warmth",
  "magical", "bliss", "blissful", "forever", "cherish", "treasure",
  "inspired", "inspiring", "incredible", "magnificent", "marvelous",
  "splendid", "radiant", "glowing", "divine", "heavenly", "adorable",
  "darling", "precious", "beloved", "soulmate", "happiness", "grateful",
  "thankful", "wonderful", "wishing", "wish", "blessings",
]);

const NEGATIVE = new Set([
  "hate", "bad", "terrible", "awful", "confusing", "confused", "frustrating",
  "frustrated", "boring", "worst", "poor", "difficult", "hard", "broken",
  "slow", "inaccurate", "annoying", "disappointing", "disappointed",
  "problem", "issue", "buggy", "crash", "fail", "failed", "wrong",
  "sad", "unhappy", "miserable", "angry", "upset", "regret", "sorry",
  "unfortunately", "tragic", "horrible", "dreadful",
]);

const CONTRAST = new Set([
  "but", "however", "though", "although", "yet",
]);

export type Mood = "POSITIVE" | "NEGATIVE" | "NEUTRAL" | "MIXED";

export function detectMood(text: string): Mood {
  const words = text.toLowerCase().match(/[a-z']+/g) ?? [];

  let pos = 0;
  let neg = 0;
  let contrast = false;

  for (const w of words) {
    if (POSITIVE.has(w)) pos++;
    if (NEGATIVE.has(w)) neg++;
    if (CONTRAST.has(w)) contrast = true;
  }

  if (pos > 0 && neg > 0) return "MIXED";
  if (contrast && (pos > 0 || neg > 0)) return "MIXED";
  if (pos > neg) return "POSITIVE";
  if (neg > pos) return "NEGATIVE";
  return "NEUTRAL";
}
