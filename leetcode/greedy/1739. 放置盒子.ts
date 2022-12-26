// https://leetcode.cn/problems/building-boxes/
// 找规律优先寻找满的情况，然后继续循环判断剩余
function minimumBoxes(n: number): number {
  // 贪心，为了尽量少的接触地面，应该优先在角落，尽量堆成金字塔的形状
  // 地下3个，上面1个；地下6个，上面可以3个再加1个
  // 首先看n属于哪个范围
  // 1， 1+2 1， 1+2+3 1+2 1，
  let cnt = 0, sum = 0;
  while (sum < n) {
    cnt++;
    for (let i = 1; i <= cnt; i++) sum += i;
  }
  // 此时cnt-1才是最小的放满的情况
  // 计算剩余的盒子
  for (let i = 1; i <= cnt; i++) sum -= i;
  // console.log(n, cnt, sum)
  n -= sum;
  // 超出的盒子根据新增一个底部盒最多放几个来看结果
  let other = 0, add = 0;
  // 对于已经放满的情况，每新增一个都会多n个，因此继续循环
  while (add < n) {
    other++;
    add += other;
  }
  // console.log(cnt, other)
  return cnt * (cnt - 1) / 2 + other;
};

// 优化循环流程，更快找到需要的情况
function minimumBoxes(n: number): number {
  // 贪心，为了尽量少的接触地面，应该优先在角落，尽量堆成金字塔的形状
  let cnt = 1, sum = 1;
  while (sum < n) {
    n -= sum; // 直接减去sum，去除1～n的和
    cnt++;
    sum += cnt;
  }
  // 此时cnt-1是最小的放满的情况，cnt会大于n
  // n本身就是剩余的盒子
  // 超出的盒子继续从1开始减，对于已经放满的情况，每新增一个都会多n个
  let other = 1;
  while (other < n) {
    n -= other; // 减去放第other时可以放的最多的数量
    other++;
  }
  // console.log(cnt, other)
  return cnt * (cnt - 1) / 2 + other;
};