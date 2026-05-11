function scoreMatch(question, pattern) {
  const q = (question || "").toLowerCase();
  const p = (pattern || "").toLowerCase();

  if (q === p) return 100;
  if (q.includes(p)) return 95;

  const words = p.split(" ").filter(Boolean);
  let matched = 0;

  for (const word of words) {
    if (word.length > 2 && q.includes(word)) matched++;
  }

  return Math.round((matched / Math.max(words.length, 1)) * 100);
}

module.exports = { scoreMatch };
