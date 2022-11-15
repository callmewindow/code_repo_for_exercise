// https://leetcode.cn/problems/split-array-with-same-average/
// 子数组直接遍历判断平均值，超时
function splitArraySameAverage(nums: number[]): boolean {
  // 将nums拆分为两个子数组，平均值相同，即sum(a)*len(b) = sum(b)*len(a)
  // 又因为是子数组，所以sumb=sumn-suma，len同理
  // 基础方法：统计nums的一半子数组，看两部分的平均值
  const numL = nums.length;
  const numSum = nums.reduce((f, b) => f + b);
  // 因为拆成两部分，因此一半便可遍历完全所有情况
  let nEnd = 1 << (numL - 1);
  // 记录当前子数组的sum和cnt
  let sonSum = 0, sonL = 0;
  for (let mark = 0; mark < nEnd; mark++) {
    sonSum = 0;
    sonL = 0;
    // 生成子数组
    for (let i = 0; i < numL; i++) {
      if (((1 << i) & mark) != 0) {
        sonSum += nums[i];
        sonL += 1;
      }
    }
    // 判断当前子数组和剩余一部分的平均值是否一致，对于第一个空数组用len判断掉
    if (sonL == 0) continue;
    if (sonSum * (numL - sonL) == (numSum - sonSum) * sonL) return true;
    // console.log(sum, cnt);
  }
  // 没有则return false
  return false;
};

// 二分数组+主动抛弃最后一位，勉强通过
function splitArraySameAverage_1(nums: number[]): boolean {
  // 将nums拆分为两个子数组，平均值相同，即sum(a)*len(b) = sum(b)*len(a)
  // 又因为是子数组，所以sumb=sumn-suma，len同理
  // 基础方法：统计nums的一半子数组，看两部分的平均值
  const numL = nums.length;
  const numSum = nums.reduce((f, b) => f + b);
  // 拆成两块分别处理子数组，节省遍历时间
  let m = Math.floor(numL / 2);
  // 记录前半和后半子数组的sum和cnt
  let lMsg: number[][] = [], rMsg: number[][] = [];
  // 这里从1开始可以跳过第一个空数组
  let lCnt = m;
  for (let mark = 1; mark < (1 << lCnt); mark++) {
    // 生成子数组
    lMsg.push([0, 0])
    const len = lMsg.length;
    for (let i = 0; i < lCnt; i++) {
      if (((1 << i) & mark) != 0) {
        lMsg[len - 1][0] += nums[i];
        lMsg[len - 1][1] += 1;
      }
    }
    // 对len等长的情况跳过
    if (lMsg[len - 1][1] == numL) continue;
    // 判断当前子数组和剩余一部分的平均值是否一致，对于第一个空数组用len判断掉
    if (lMsg[len - 1][0] * (numL - lMsg[len - 1][1]) == (numSum - lMsg[len - 1][0]) * lMsg[len - 1][1]) return true;
  }
  // console.log(lMsg);
  let rCnt = numL - m - 1;
  for (let mark = 1; mark < (1 << rCnt); mark++) {
    // 生成子数组
    rMsg.push([0, 0])
    const len = rMsg.length;
    // 从中间到遍历的末尾
    for (let i = m; i < rCnt + m; i++) {
      // 这里用位数记录标记，因此应该是i-m
      if (((1 << (i - m)) & mark) != 0) {
        rMsg[len - 1][0] += nums[i];
        rMsg[len - 1][1] += 1;
      }
    }
    if (rMsg[len - 1][1] == numL) continue;
    if (rMsg[len - 1][0] * (numL - rMsg[len - 1][1]) == (numSum - rMsg[len - 1][0]) * rMsg[len - 1][1]) return true;
  }
  // console.log(rMsg);
  // 如果rMsg为空，则说明lMsg已经判断完了，直接退出
  if (rMsg.length == 0) return false;
  // console.log(m,rCnt)
  // 注意m和rCnt都只是数量，具体的长度还需要进行获取
  for (let i = 0; i < lMsg.length; i++) {
    for (let j = 0; j < rMsg.length; j++) {
      // console.log(i,j);
      // 记录选择部分的值和长度以及剩余的
      const sSum = lMsg[i][0] + rMsg[j][0];
      const sLen = lMsg[i][1] + rMsg[j][1];
      // 前面少取一位，这里可以直接跳过
      // if(sLen == numL) continue;
      if (sSum * (numL - sLen) == (numSum - sSum) * sLen) return true;
    }
  }
  // 没有则return false
  return false;
};

// 不找前半的最后一位，虽然可能适用的情况更多，但可能导致前半全部正好等于后半全部的情况等到最后才能解决，所以其实减少的时间也没有更多
function splitArraySameAverage_2(nums: number[]): boolean {
  // 将nums拆分为两个子数组，平均值相同，即sum(a)*len(b) = sum(b)*len(a)
  // 又因为是子数组，所以sumb=sumn-suma，len同理
  // 基础方法：统计nums的一半子数组，看两部分的平均值
  const numL = nums.length;
  const numSum = nums.reduce((f, b) => f + b);
  // 拆成两块分别处理子数组，节省遍历时间
  let m = Math.floor(numL / 2);
  // 记录前半和后半子数组的sum和cnt
  let lMsg: number[][] = [], rMsg: number[][] = [];
  // 这里从1开始可以跳过第一个空数组
  // 不找前半的最后一位，虽然可能适用的情况更多，但可能导致前半全部正好等于后半全部的情况等到最后才能解决，所以其实减少的时间也没有更多
  let lCnt = m - 1;
  for (let mark = 1; mark < (1 << lCnt); mark++) {
    // 生成子数组
    lMsg.push([0, 0])
    const len = lMsg.length;
    for (let i = 0; i < lCnt; i++) {
      if (((1 << i) & mark) != 0) {
        lMsg[len - 1][0] += nums[i];
        lMsg[len - 1][1] += 1;
      }
    }
    // 对len等长的情况跳过
    if (lMsg[len - 1][1] == numL) continue;
    // 判断当前子数组和剩余一部分的平均值是否一致，对于第一个空数组用len判断掉
    if (lMsg[len - 1][0] * (numL - lMsg[len - 1][1]) == (numSum - lMsg[len - 1][0]) * lMsg[len - 1][1]) return true;
  }
  // console.log(lMsg);
  let rCnt = numL - m;
  for (let mark = 1; mark < (1 << rCnt); mark++) {
    // 生成子数组
    rMsg.push([0, 0])
    const len = rMsg.length;
    // 从中间到遍历的末尾
    for (let i = m; i < rCnt + m; i++) {
      // 这里用位数记录标记，因此应该是i-m
      if (((1 << (i - m)) & mark) != 0) {
        rMsg[len - 1][0] += nums[i];
        rMsg[len - 1][1] += 1;
      }
    }
    if (rMsg[len - 1][1] == numL) continue;
    if (rMsg[len - 1][0] * (numL - rMsg[len - 1][1]) == (numSum - rMsg[len - 1][0]) * rMsg[len - 1][1]) return true;
  }
  // console.log(rMsg);
  // 如果rMsg为空，则说明lMsg已经判断完了，直接退出
  if (rMsg.length == 0) return false;
  // console.log(m,rCnt)
  // 注意m和rCnt都只是数量，具体的长度还需要进行获取
  for (let i = 0; i < lMsg.length; i++) {
    for (let j = 0; j < rMsg.length; j++) {
      // console.log(i,j);
      // 记录选择部分的值和长度以及剩余的
      const sSum = lMsg[i][0] + rMsg[j][0];
      const sLen = lMsg[i][1] + rMsg[j][1];
      // 前面少取一位，这里可以直接跳过
      // if(sLen == numL) continue;
      if (sSum * (numL - sLen) == (numSum - sSum) * sLen) return true;
    }
  }
  // 没有则return false
  return false;
};