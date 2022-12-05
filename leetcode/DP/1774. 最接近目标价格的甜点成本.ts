// https://leetcode.cn/problems/closest-dessert-cost/
// 错误的dp，没有计划好判断条件
function closestCost(baseCosts: number[], toppingCosts: number[], target: number): number {
  // 本来以为是贪心，但是因为是基料和配料两种，所以还是要dp
  const n = baseCosts.length, m = toppingCosts.length;
  // 将配料扩充为dp数组
  let topAdd = Array.from({ length: m }, () => [0, 0, 0]); // 按顺序是添加了0，1，2个配料时和target的差距
  // 选择差距绝对值最小的，如果多个最小则选择正数的
  for (let i = 0; i < n; i++) {
    // 每一个基料单独计算
    const base = target - baseCosts[i];
    // 初始化第一部分
    topAdd[0] = [base, base - toppingCosts[0], base - toppingCosts[0] * 2];
    for (let j = 1; j < m; j++) {
      const top = toppingCosts[j];
      for (let k = 0; k <= 2; k++) {
        let closest = topAdd[j - 1][0] - top * k;
        for (let l = 1; l <= 2; l++) {
          const inter = topAdd[j - 1][l] - top * k;
          console.log(inter)
          if (Math.abs(closest) > Math.abs(inter)) closest = inter;
          else if (Math.abs(closest) == Math.abs(inter) && inter > 0) closest = inter;
        }
        if (closest == 0) return target;
        topAdd[j][k] = closest;
      }
    }
    console.log(topAdd[m - 1]);
    // 用baseCosts保存最接近成本的花费
    // 如果之前没有等于tar的就把最后一个的情况进行判断
    let closest = topAdd[m - 1][0];
    for (let l = 1; l <= 2; l++) {
      const inter = topAdd[m - 1][l];
      if (Math.abs(closest) > Math.abs(inter)) closest = inter;
      else if (Math.abs(closest) == Math.abs(inter) && inter > 0) closest = inter;
    }
    baseCosts[i] = target - closest;
  }

  // console.log(baseCosts)
  let closest = target - baseCosts[0];
  for (let l = 1; l < n; l++) {
    const inter = target - baseCosts[l];
    if (Math.abs(closest) > Math.abs(inter)) closest = inter;
    else if (Math.abs(closest) == Math.abs(inter) && inter > 0) closest = inter;
  }
  return target - closest;
};

// 用目标作为脚标建立数组
function closestCost_2(baseCosts: number[], toppingCosts: number[], target: number): number {
  // const x = _.min(baseCosts);
  const x = Math.min(...baseCosts);
  if (x >= target) return x; // 如果最小的已经大于target的了，那么就是他了
  const can = new Array(target + 1).fill(0);
  let res = 2 * target - x;
  for (const b of baseCosts) { // b不会被修改，所以可以const
    // 小于则说明在小于target时有一个配比可以恰好达到b
    if (b <= target) can[b] = true;
    else res = Math.min(res, b); // res来记录超过tar的最小值
  }
  // 开始尝试加料
  for (const t of toppingCosts) {
    for (let count = 0; count < 2; ++count) {
      // 从target向下看符合的
      for (let i = target; i > 0; --i) {
        // can是true则说明有可以达到i的搭配，优先找最小的
        if (can[i] && i + t > target) res = Math.min(res, i + t);
        // 尝试删减一次配料看有没有搭配
        if (i - t > 0) can[i] = can[i] | can[i - t];
      }
    }
  }
  // 跳出函数，依次看差值为i时有没有对应的值
  for (let i = 0; i <= res - target; ++i)
    if (can[target - i]) return target - i;
  return res;
}