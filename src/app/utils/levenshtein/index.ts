function levenshtein(a: string, b: string, maxDistance = Infinity) {
  const m = a.length;
  const n = b.length;
  if (Math.abs(m - n) > maxDistance) return maxDistance + 1; // 길이 차이로 필터링

  const dp = Array(n + 1)
    .fill(0)
    .map((_, i) => i);
  for (let i = 1; i <= m; i++) {
    let prev = i - 1;
    dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const temp = dp[j];
      dp[j] = Math.min(
        dp[j] + 1, // 삭제
        dp[j - 1] + 1, // 삽입
        prev + (a[i - 1] === b[j - 1] ? 0 : 1), // 교체
      );
      prev = temp;
    }
    if (Math.min(...dp) > maxDistance) return maxDistance + 1; // Early stop
  }
  return dp[n];
}

function similarity(a: string, b: string) {
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1;
  const distance = levenshtein(a, b, Math.floor(maxLen * 0.3)); // 편집 거리 제한
  return 1 - distance / maxLen;
}

export function groupSimilarTexts(texts: string[], threshold = 0.8) {
  const groups = [];
  const used = new Set();

  for (let i = 0; i < texts.length; i++) {
    if (used.has(i)) continue;

    const group = [texts[i]];
    used.add(i);

    for (let j = i + 1; j < texts.length; j++) {
      if (used.has(j)) continue;
      if (Math.abs(texts[i].length - texts[j].length) > 5) continue; // 길이 필터

      const score = similarity(texts[i], texts[j]);
      if (score >= threshold) {
        group.push(texts[j]);
        used.add(j);
      }
    }

    groups.push(group.reduce((a, b) => (a.length >= b.length ? a : b)));
  }

  return groups;
}
