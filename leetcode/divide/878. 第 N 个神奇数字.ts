// https://leetcode.cn/problems/nth-magical-number/
// 先来个大数暴力尝试，对可除开等情况做特殊处理
const mod = 1000000007n;
function nthMagicalNumber(n: number, a: number, b: number): number {
  // 如果有一个数是另一个的倍数，则需要保存无限长的inter（不然一定会找不到），但其实只需让小的走即可，所以直接处理返回
  let bigA = BigInt(a), bigB = BigInt(b);
  // 小数的第n个即n*小数，等于情况放在第一个处理
  if (a >= b && a % b == 0) return Number((BigInt(n) * bigB) % mod);
  if (b > a && b % a == 0) return Number((BigInt(n) * bigA) % mod);

  // 注意是a或b整除，因此返回值一定是cnt*a或者cnt*b，具体是哪个则需要分析
  // 最暴力的方法就是双指针，当n没结束，就看是a的cnt+1后更小还是b的cnt+1更小
  // 但是注意，cnt*a可能很大，此时需要取模，因此需要结合a和b的关系来进行优化

  // 先直接大数搞一下
  let num: bigint[] = [0n, 0n]; // 记录a和b分别的值，0是a，1是b
  // let fromA: boolean; // 记录当前的最大值是否来自a还是b，减少乘法运算
  // 保存数组后只需判断0和1即可知道来自a还是b
  // 为了处理公倍数的情况，需要一个数组来记录最近可能出现公倍数的n个数
  // 这个个数就相当于大数除小数再+1，例如7和2，从7开始往后，在7想用21判断时，为了确保能判断14已经被使用了，需要保存：14，16，18，20，四位，即7/2 = 3，3+1
  const inter = a > b ? Math.floor(a / b) + 1 : Math.floor(b / a) + 1;
  // console.log(inter);
  let before: bigint[] = [];
  // 先初始化第一个
  if (bigA > bigB) num[1] = bigB, before.push(num[1]);
  else num[0] = bigA, before.push(num[0]);
  --n;
  while (n > 0) {
    let numA = num[0] + bigA;
    let numB = num[1] + bigB;
    // 处理公倍数的情况，考虑公倍数的特殊性质，一定会在0和1轮流出现，先出现在小的，再出现在大的
    // 如果已经出现过，则需要跳过当前值再来判断
    if (before.includes(numB)) numB += bigB;
    if (before.includes(numA)) numA += bigA;
    // 根据大小看要谁，谁小谁是下一个，因为是按顺序找
    if (numA >= numB) {
      num[1] = numB; // 包含了同时达到公倍数的情况
      // 如果长度到了就不用再延长了，先剔除
      if (before.length == inter) before.shift();
      before.push(num[1]);
    } else {
      num[0] = numA;
      if (before.length == inter) before.shift();
      before.push(num[1]);
    }
    --n;
    // console.log(num)
  }
  return num[0] > num[1] ? Number(num[0] % mod) : Number(num[1] % mod)
};

// 进一步分析倍数出现的规律，实现分治
// 但是现实很骨感，这样无法应对所有的情况，例如5，8，他们就不会按顺序来
const mod_1 = 1000000007n;
function nthMagicalNumber_1(n: number, a: number, b: number): number {
  // 倍数计算和大小有关，先处理为一大一小两个数
  let big: number, small: number;
  if (a >= b) big = a, small = b;
  else big = b, small = a;
  // 先处理倍数的情况，因为可能会超过上限，所以先转成大数来处理
  if (big % small == 0) return Number((BigInt(n) * BigInt(small)) % mod);

  // 如果不是倍数，那这个倍数一定是以某种规律出现，以2、7举例：2，4，6，7，8，10，12，14，16，18，20，21，三个2之后是7的
  // 何时出现大数：假设big/small向下取整为3，则说明big>3*small,4*small>big，也因此会四个一组，前三是small倍数，最后一个是big倍数
  // 公倍数暂时不考虑
  const pack = Math.floor(big / small) + 1; // 一组的数量，除了最后一个，前面的都是small的倍数
  const packNo = Math.ceil(n / pack); // 记录要找的n是第几组的
  const packIndex = n % pack == 0 ? pack : n % pack; // 记录在这一组里是第几个，注意当是最后一个时，余数是0，所以需要手动修改
  // 根据pack-1个small和1个big的规律便可得到解
  if (packIndex == pack) return Number((BigInt(packNo) * BigInt(big)) % mod);
  else return Number((BigInt(packNo * (pack - 1) + packIndex) * BigInt(small)) % mod);
};

// 前面的做法均是“模拟”，模拟方法对于有规律的题而言，太浪费时间，因为有很多多余操作
// 二分法nb，可以更好地利用题目的规律
const MOD = 1e9 + 7;
function nthMagicalNumber_2(n: number, a: number, b: number): number {
  // 考虑到这个数是有规律，且有顺序，有边界，因此可以通过二分法来暴力快速找到
  // 即使二分后不是倍数，也可以通过后续的二分调整成倍数
  // 第一个，左侧，就等于最小值
  let l = a > b ? b : a;
  let r = n * l; // 因为是按顺序递增，所以最大值应该是n*较小值，因为有公倍数的存在，真正结果会比n*最小值小
  const c = lcm(a, b);
  while (l <= r) { // 大于小于没有三个等于好的操作，只有===和!==
    const mid = Math.floor((l + r) / 2);
    // 可以约分n个公倍数，则说明前面多了n个，减去就是当前mid是第几个倍数
    const cnt = Math.floor(mid / a) + Math.floor(mid / b) - Math.floor(mid / c);
    if (cnt >= n) { // 将等于放在这里，所以满足条件退出时执行的是r = mid - 1
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }
  // 退出时r = mid - 1，所以mid = r + 1
  return (r + 1) % MOD;
}

// 最小公倍数
function lcm(a: number, b: number): number {
  return Math.floor(a * b / gcd(a, b));
}

// 最大公约数
function gcd(a: number, b: number): number {
  return b !== 0 ? gcd(b, a % b) : a;
};