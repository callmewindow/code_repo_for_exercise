// https://leetcode.cn/problems/contains-duplicate/
// 最基础的map统计次数，暴力
function containsDuplicate(nums: number[]): boolean {
  // map统计数量，因为有负数，因此不用数组
  let num_map = new Map()
  for (let num of nums) {
    if (num_map.get(num)) return true;
    num_map.set(num, true);
  }
  return false;
};

// 集合set统计是否存在更加适合
function containsDuplicate_set(nums: number[]): boolean {
  // set统计是否出现
  let num_set = new Set()
  for (let num of nums) {
    if (num_set.has(num)) return true;
    num_set.add(num);
  }
  return false;
};