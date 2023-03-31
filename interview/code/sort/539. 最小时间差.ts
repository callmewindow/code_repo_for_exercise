// https://leetcode.cn/problems/minimum-time-difference/
// 转化时间排序，并对跨天情况特判
function findMinDifference(timePoints: string[]): number {
  // 排序时间，按照前和后，先转成分钟数
  const timeNumPoints: number[] = timePoints.map((v) => {
    const vTime = v.split(':');
    const vHour = Number(vTime[0]), vMin = Number(vTime[1]);
    return vHour * 60 + vMin;
  }).sort((b, f) => b - f);
  // 由于时间是可以跨越的，所以单独针对最大和最小时间进行跨天判断，这里跳过
  // // 如果有0的，增加一个24*60的，默认不会出现24:00，不用担心重复
  // if (timeNumPoints[0] === 0) timeNumPoints.push(24 * 60);
  // 然后计算得到不同时间的插值即可
  let minMin = 24 * 60;
  // console.log(timeNumPoints);
  timeNumPoints.reduce((f, b) => {
    // console.log(f, b);
    // console.log(minMin);
    minMin = Math.min(b - f, minMin);
    return b; // 不修改b的值
  })
  const n = timeNumPoints.length;
  // 最后再假设0的位置是第二天，和末尾的时间进行比较
  minMin = Math.min(timeNumPoints[0] + 24*60 - timeNumPoints[n-1], minMin);
  return minMin;
};