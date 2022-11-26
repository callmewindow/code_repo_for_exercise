// https://leetcode.cn/problems/he-wei-sde-lian-xu-zheng-shu-xu-lie-lcof/
// 找规律，满足条件的直接按脚标填充即可实现
function findContinuousSequence(target: number): number[][] {
  // 最多正数数量即从1开始加，最大为从1加到n
  let i = 1;
  while (target * 2 > i * (i + 1)) ++i;
  // 此时target是恰好小于等于1加到i的，也就是最多拆分为i份
  let res: number[][] = [];
  // 先判断最大数量
  // if(target*2 == i*(i+1)) res.push(Array(i).fill(0).map((_,i)=>i+1));
  // 不能拆成1份，如果可以拆分为i份，则说明target/i会等于数组的中位数
  while (i > 1) {
    const left = target % i;
    // console.log(target, i, left);
    // 因为是中位数，所以要么整数且i为奇数，要么余0.5且i为偶数
    if (!((left == 0 && i % 2 == 1) || (left / i == 0.5 && i % 2 == 0))) {
      --i;
      continue;
    }
    // 这样判断会把符合的都漏了
    // if(left != 0 ||(left == 0 && i%2 ==0)){--i;continue;}
    // if (((left/i) != 0.5)||((left/i) == 0.5 && i%2 != 0)){--i;continue;}
    const midI = i / 2, mid = target / i;
    // console.log(midI, mid);
    // 根据midI和mid延伸
    res.push(Array(i).fill(0).map((_, index) => {
      return mid - (midI - index);
    }));
    // mid
    --i;
  }
  return res;
};

// 调整为手动搭建数组的形式，貌似内存还是很大
function findContinuousSequence_1(target: number): number[][] {
  let i = 1;
  while (target * 2 > i * (i + 1)) ++i;
  // 此时target是恰好小于等于1加到i的，也就是最多拆分为i份
  let res: number[][] = [];
  // 不能拆成1份，如果可以拆分为i份，则说明target/i会等于数组的中位数
  while (i > 1) {
    const left = target % i;
    // 因为是中位数，所以要么整数且i为奇数，要么余0.5且i为偶数
    if (!((left == 0 && i % 2 == 1) || (left / i == 0.5 && i % 2 == 0))) {
      --i;
      continue;
    }
    const midI = i / 2, mid = target / i;
    // 根据midI和mid延伸
    let tmp: number[] = [];
    for (let j = 0; j < i; j++) tmp.push(mid - (midI - j));
    res.push(tmp);
    --i;
  }
  return res;
};