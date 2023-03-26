// https://leetcode.cn/problems/meeting-rooms-ii/
// 给你一个会议时间安排的数组 intervals ，每个会议时间都会包括开始和结束的时间 intervals[i] = [starti, endi] ，返回 所需会议室的最小数量 。


// 示例 1：
// 输入：intervals = [[0,30],[5,10],[15,20]]
// 输出：2

// 示例 2：
// 输入：intervals = [[7,10],[2,4]]
// 输出：1

// 解法1，排序后找同一时间的最大会议数
function minMeetingRooms(intervals: number[][]): number {
  let times: number[][] = [];
  // 将开始和结束进行汇总
  for(let inter of intervals){
    times.push([inter[0],1]);
    times.push([inter[1],-1]);
  }
  // 对会议进行排序
  times.sort((b,f)=>{
    // 如果时间相同，则将结束时间放在前面（同一时刻结束后再开始，减少会议室使用）
    // 否则时间小的在前面
    return b[0] === f[0] ? b[1] - f[1] : b[0] - f[0];
  })
  let res = 0, cur = 0;
  for(let time of times){
    // 看当前需要多少个会议室
    // 对于一个会议，他的开始和结束时间一定是一前一后
    // 这里统计的就是同时有多少个会议在进行，即需要多少个会议
    cur += time[1];
    res = Math.max(res, cur);
  }
  return res;
}