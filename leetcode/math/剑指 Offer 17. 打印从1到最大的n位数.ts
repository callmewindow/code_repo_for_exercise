// https://leetcode.cn/problems/da-yin-cong-1dao-zui-da-de-nwei-shu-lcof/
// 找规律按顺序对前一个n的情况进行处理
function printNumbers(n: number): number[] {
  let res = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // 因为后续计算需要0的数据，所以需要多一位
  let cnt = 1, mul10 = 1;
  while (++cnt <= n) {
    mul10 *= 10;
    // res始终保存着1～cnt-1位数的所有数
    // 11,12,13 21,22,23 31 41 91,95,99
    let oldN = res.concat();
    for (let i = 1; i <= 9; i++) {
      res = res.concat(oldN.map((v) => i * mul10 + v)); // 将10的n次幂按顺序加上
    }
    // console.log(res);
  }
  return res.slice(1); // 抛弃第一个0
};