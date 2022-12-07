// https://leetcode.cn/problems/equal-sum-arrays-with-minimum-number-of-operations/
// 太难了
function minOperations(nums1: number[], nums2: number[]) {
  const n = nums1.length, m = nums2.length;
  // 去除不可能情况
  if (6 * n < m || 6 * m < n) return -1;

  const cnt1 = new Array(7).fill(0);
  const cnt2 = new Array(7).fill(0);
  let diff = 0;
  // 统计nums1和nums2的1～6情况，并记录差值
  for (const n1 of nums1) {
    ++cnt1[n1];
    diff += n1;
  }
  for (const n2 of nums2) {
    ++cnt2[n2];
    diff -= n2;
  }
  if (diff === 0) return 0;
  // 将大小值进行转化为同一种问题
  if (diff > 0) return help(cnt2, cnt1, diff);
  else return help(cnt1, cnt2, -diff);
}

function help(h1: number[], h2: number[], diff: number) {
  // h => hashMap
  // 1的总体数值大于2
  const h = new Array(7).fill(0);
  for (let i = 1; i < 7; ++i) {
    h[6 - i] += h1[i];
    h[i - 1] += h2[i];
  }
  let res = 0;
  for (let i = 5; i > 0 && diff > 0; --i) {
    let t = Math.min(Math.floor((diff + i - 1) / i), h[i]);
    res += t;
    diff -= t * i;
  }
  return res;
};