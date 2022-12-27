// https://leetcode.cn/problems/minimum-elements-to-add-to-form-a-given-sum/
// 直接计算差值贪心找最少的limit即可
function minElements(nums: number[], limit: number, goal: number): number {
  // 首先计算现在的情况然后贪心
  let sum = nums.reduce((f, b) => f + b);
  let inter = Math.abs(sum - goal); // 都看作正数来处理
  // inter大于limit就加上一个limit，小于则加上他自身即可
  let res = Math.floor(inter / limit);
  res += inter % limit == 0 ? 0 : 1;
  // 其实就是看inter能被多少个limit整除，直接加上limit-1可以快速得到结果
  // 例如4/5需要+1，此时4+4/5 = 1.x，向下取整即1
  // 例如5/5需要也是1，此时4+4/5 = 1.x，还是1
  // 对于6/5，需要+2，此时6+4/5 = 2，自动是2
  // 当需要得到a对于b的倍数时，基于b-1可很快得到，b-1/b来辅助判断a和b的关系
  // let res = Math.abs(Math.floor((inter + limit - 1) / limit));
  return res; // 最后的小于等于limit
};

