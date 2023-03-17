// https://leetcode.cn/problems/split-the-array-to-make-coprime-products/
// 提前计算左右，但是会因为过大而溢出
function findValidSplit(nums: number[]): number {
  // let left = 1, right = 1;
  // 直接无脑计算前后乘积肯定会溢出，所以不能这样，应该考虑最大公约数的意义
  // 对于前后两部分，只有前面的每一个数和后面的每一个数的最大公约数都是1，便说明是一个有效的拆分
  // 如何比较前后的最大公约数=》计算出前后的最小公倍数即可，即a*b/gcd(a,b)
  // 不断更新前后的最小公倍数然后判断
  const n = nums.length;
  // 用数组记录0～i位置的最大公倍数和i到n-1位置的，i从0到n-1
  let gbsLeft = new Array(n-1);
  let gbsRight = new Array(n-1);
  gbsLeft[0] = nums[0];
  gbsRight[n-2] = nums[n-1];
  // console.log(gcd())
  for(let i = 1;i<n-1;i++){
    // console.log(i,gbsLeft[i-1], nums[i],gcd(gbsLeft[i-1],nums[i]));
    gbsLeft[i] = (gbsLeft[i-1]*nums[i])/gcd(gbsLeft[i-1],nums[i]);
    // 这里num的坐标需要注意
    // console.log(n-1-i, gbsRight[n-1-i],nums[n-1-i], gcd(gbsRight[n-1-i],nums[n-1-i]))
    gbsRight[n-1-1-i] = (gbsRight[n-1-i]*nums[n-1-i])/gcd(gbsRight[n-1-i],nums[n-1-i]);
  }
  for(let i = 0;i<n-1;i++){
    // 遇到第一个可以拆分的就返回
    // console.log(gbsLeft[i], gbsRight[i]);
    if(gcd(gbsLeft[i], gbsRight[i]) === 1) return i;
  }
  return -1; // 没有就返回-1
};
function gcd(a: number,b: number): number {
  while(b !== 0){
    let tmp = a;
    a = b;
    b = tmp%b;
  }
  return a;
}