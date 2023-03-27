// https://leetcode.cn/problems/permutations-ii/
// 记录访问情况和重复情况进行处理
function permuteUnique(nums: number[]): number[][] {
  const n = nums.length;
  const res: number[][] = [];
  // 记录当前数是否已被使用
  const vis = new Array(n).fill(false);
  // 内部函数可以不用传递res
  const backtrack = (idx: number, perm: number[]) => {
    // perm记录当前排列情况
    // 看是否已经到了最后一个
    if (idx === n) {
      // console.log(perm);
      // console.log(perm.slice());
      // 注意这里传的是引用，需要深拷贝一下
      res.push(perm.concat());
      return;
    }
    for (let i = 0; i < n; ++i) {
      // 如果当前元素已被使用（也可以起到跳过已经被选择的元素的作用）
      // 或前后数字相同并且目前不是在遍历前一个元素时，才继续
      // 对于1，1，2，3；第一次，i = 0时递归，此时第二个1因为要排列，所以要使用
      // 第二次：i=1时，此时1和0相同，0没有被访问，说明相同字符已经被处理过了，跳过
      if (vis[i] || (i > 0 && nums[i] === nums[i - 1] && !vis[i - 1])) {
        continue;
      }
      perm.push(nums[i]);
      vis[i] = true;
      backtrack(idx + 1, perm);
      vis[i] = false;
      perm.pop();
    }
  }
  // 排序让重复的靠近
  nums.sort((b, f) => b - f);
  // 从第0个数开始
  backtrack(0, []);
  return res;
};