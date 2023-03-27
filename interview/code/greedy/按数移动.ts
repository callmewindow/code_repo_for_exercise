// 给定一个包含正整数的数组
// 每个数是当前位置可以向后移动的最大数量，最少移动1步
// 要求计算返回到达最后一个节点最少步数时每一步位置的位置

function fastestToEnd(arr: number[]): number[] {
  // 为了尽快到达最后，应该尽可能找最大的步数，来行动
  // 但由于最后要到达最后一个节点，需要倒序
  const n = arr.length;
  // const dp = new Array(n); // 其实也不算dp
  let stepMax: number, posBefore: number;
  const res: number[] = [arr[n - 1]];
  for (let i = n - 1; i >= 0; i--) {
    // 注意遍历结束时直接退出
    if (i == 0) break;
    // 从后向前找，找能跨的最大步数即可
    // 不可能存在能跨更多步而不选的情况，因为如果有则说明需要跨过这个最大步数，很显然只会变小
    stepMax = 1, posBefore = i - 1
    for (let j = i - 2; j >= 0; j--) {
      // 当可以直接到达末尾更新maxStep和pos
      const stepNow = i - j;
      if (arr[j] >= stepNow) {
        if (stepNow > stepMax) {
          stepMax = stepNow;
          posBefore = j;
        }
      }
    }
    // 将最大步数对应的位置情况unshift进res
    res.unshift(arr[posBefore]);
    i = posBefore + 1;// 后续还要减，所以+1
  }
  return res;
}

let testIn = [4, 4, 9, 1, 3, 2, 1, 5]
let testOut = [4, 9, 5]

console.log(fastestToEnd(testIn));