// https://leetcode.cn/problems/maximum-height-by-stacking-cuboids/
// 排序后分情况记录最长上升子序列
function check(boxA: number[], boxB: number[], posA: number, posB: number): boolean {
  // console.log(boxA, boxB, posA, posB);
  // 如果高度不符合直接不满足
  if (boxA[posA] < boxB[posB]) return false;
  // 高度符合去判断另外两边
  let l = Array(2), w = Array(2);
  if (posA == 0) l[0] = 1, w[0] = 2;
  else if (posA == 1) l[0] = 0, w[0] = 2;
  else if (posA == 2) l[0] = 0, w[0] = 1;
  if (posB == 0) l[1] = 1, w[1] = 2;
  else if (posB == 1) l[1] = 0, w[1] = 2;
  else if (posB == 2) l[1] = 0, w[1] = 1;
  // 两种情况：都不旋转和只旋转1
  return (boxA[l[0]] >= boxB[l[1]] && boxA[w[0]] >= boxB[w[1]]) || (boxA[l[0]] >= boxB[w[1]] && boxA[w[0]] >= boxB[l[1]]);
}
function maxHeight(cuboids: number[][]): number {
  // 因为可以重新排列所以无法单纯的找最长上升子序列
  // 不能无脑让大的在下面，因为可能最长的一个边比别的都高
  // 其实每个长方体只需要处理三种情况：三个分别作为高，另外两条边无论如何旋转都是下面的面，所以问题不大

  // 如果将每个长方体都旋转再分别处理找最大值，是3的100次幂，肯定超时

  // 让最小边最小的在上面，因为最小边会限制他
  // cuboids.sort((b, f) => Math.min(...b) - Math.min(...f));
  // 让所有之和小的在上面，这种边最可能被放在别人上面，因为可以旋转
  cuboids.sort((b, f) => b.reduce((f, b) => f + b) - f.reduce((f, b) => f + b));
  // console.log(cuboids);
  const n = cuboids.length;
  let dp = Array(n).fill(0).map(() => Array(3)); // 三种情况，对应0，1，2当高
  dp[0] = cuboids[0];
  for (let i = 1; i < n; i++) {
    // 从前找可能能放的
    dp[i] = cuboids[i];
    let tmp = Array(3).fill(0);
    for (let j = i - 1; j >= 0; j--) {
      // console.log(cuboids[i], cuboids[j]);
      // 找长宽高小于等于自己的
      for (let k = 0; k < 3; k++) {
        for (let l = 0; l < 3; l++) {
          // 分别判断前一个的三种情况，对应三个dp
          if (dp[j][l] > tmp[k] && check(cuboids[i], cuboids[j], k, l)) {
            tmp[k] = dp[j][l];
          }
        }
      }
    }
    dp[i] = dp[i].map((v, i) => v + tmp[i]); // 更新dp
    // console.log(tmp);
  }
  return Math.max(...dp.map((t) => Math.max(...t)));
};