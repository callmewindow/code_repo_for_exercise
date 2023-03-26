// https://leetcode.cn/problems/meeting-rooms/
// 给定一个会议时间安排的数组，每个会议时间都会包括开始和结束的时间 [[s1,e1],[s2,e2],...] (si < ei)，请你判断一个人是否能够参加这里面的全部会议。

function canAttendMeetings(intervals: number[][]): boolean {
  // 通过排序让开始时间短的在前，直接按顺序看是否重叠即可
  const sorted = intervals.sort((b, f) => b[0] - f[0]);
  // 从1开始可以减少对末尾的特判
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i][0] < sorted[i - 1][1]) return false;
  }
  return true;
}
