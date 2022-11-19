// https://leetcode.cn/problems/find-the-highest-altitude/
// 简单dp
function largestAltitude(gain: number[]): number {
  for (let i = 1; i < gain.length; i++) {
    gain[i] += gain[i - 1];
  }
  let maxHeight = Math.max(...gain);
  return maxHeight > 0 ? maxHeight : 0;
};