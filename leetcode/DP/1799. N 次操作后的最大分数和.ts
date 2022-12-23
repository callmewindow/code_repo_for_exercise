// https://leetcode.cn/problems/maximize-score-after-n-operations/
// 直接全排列结合dp找所有可能，数量少所以直接刚！
function maxScore(nums: number[]): number {
  // 计算出n对数的最大公约数，然后从小到大排列，分别从1乘到n，即最大值
  // 关键是怎么找出这个最优的公约数分配（直接dp一个个对比）
  const m = nums.length;
  const dp = new Array(1 << m).fill(0);
  // 记录各对之间的公约数，用于判断
  const gcdTmp = new Array(m).fill(0).map(() => new Array(m).fill(0));
  for (let i = 0; i < m; ++i)
    for (let j = i + 1; j < m; ++j)
      gcdTmp[i][j] = gcd(nums[i], nums[j]);

  // 记录所有可能的情况
  let all = 1 << m;
  for (let s = 1; s < all; ++s) {
    // s表示取哪些数字来计算他们的最大分数
    let t = bitCount(s); // 看s转为二进制后有几个1（选择几个数）
    // 如果选择奇数个数肯定不符合，直接continue
    if ((t & 1) !== 0) continue;
    // 如果偶数个，则基于s选择的数开始找最大分数，此时t/2即表示第几次操作

    for (let i = 0; i < m; ++i) {
      // if (((s >> i) & 1) !== 0) {
      if (((1 << i) & s) !== 0) { // 移动1看s是否为1更好理解
        // 找到第一个准备抛弃的数i
        for (let j = i + 1; j < m; ++j) {
          // if (((s >> j) & 1) !== 0) {
          if (((1 << j) & s) !== 0) {
            // 找到第二个准备抛弃的数j
            let moveIJ = dp[(s ^ (1 << i)) ^ (1 << j)]; // s用抑或去除i和j，得到不包含i和j的最大值
            let gcdIJ = Math.floor(t / 2) * gcdTmp[i][j]; // 记录ij去除得到的分数，floor确保是整数（防止ts抽风）
            dp[s] = Math.max(dp[s], moveIJ + gcdIJ); // 看去除哪个i和j时，s选择的情况分数更高
          }
        }
      }
    }
  }
  return dp[all - 1];
}

function gcd(num1: number, num2: number): number {
  while (num2 !== 0) {
    const temp = num1;
    num1 = num2;
    num2 = temp % num2;
  }
  return num1;
};

function bitCount(n: number): number {
  // toString 2可以转为2进制字符串，基于0拆分可以得到1的数组，再结合便是全1字符串
  return n.toString(2).split('0').join('').length;
}