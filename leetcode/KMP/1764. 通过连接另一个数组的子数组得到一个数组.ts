// https://leetcode.cn/problems/form-array-by-concatenating-subarrays-of-another-array/
// 按顺序朴素匹配
function canChoose(groups: number[][], nums: number[]): boolean {
  // 因为是按顺序出现，所以可以先直接暴力双循环找匹配的
  let row = 0; // 记录当前匹配第几行
  for (let i = 0; i < nums.length && row < groups.length; i++) {
    // 第一个字符符合则检查所有的
    if (nums[i] == groups[row][0]) {
      // console.log(nums[i],groups[row][0]);
      const bpI = i; // 备份i
      let match = true;
      const group = groups[row], gLen = group.length;
      if (i + gLen > nums.length) return false; // 超出长度肯定不符合
      for (let j = 0; j < gLen; i++, j++) {
        if (nums[i] != group[j]) {
          match = false;
          break;
        }
      }
      // 匹配的话i需要--，因为默认还会++，确保i在下一个循环中从正确位置开始
      if (match) i--, row++;
      else i = bpI;
    }
  }
  return row == groups.length; // 看有没有判断完
};

// kmp解法
function canChoose(groups: number[][], nums: number[]): boolean {
  let k = 0;
  for (let i = 0; i < groups.length; i++) {
    k = find(nums, k, groups[i]);
    if (k == -1) {
      return false;
    }
    k += groups[i].length;
  }
  return true;
}

function find(nums: number[], k: number, g: number[]): number {
  let m = g.length, n = nums.length;
  if (k + g.length > nums.length) {
    return -1;
  }
  const pi = new Array(m).fill(0);
  for (let i = 1, j = 0; i < m; i++) {
    while (j > 0 && g[i] !== g[j]) {
      j = pi[j - 1];
    }
    if (g[i] === g[j]) {
      j++;
    }
    pi[i] = j;
  }
  for (let i = k, j = 0; i < n; i++) {
    while (j > 0 && nums[i] !== g[j]) {
      j = pi[j - 1];
    }
    if (nums[i] === g[j]) {
      j++;
    }
    if (j === m) {
      return i - m + 1;
    }
  }
  return -1;
};