// https://leetcode.cn/problems/number-of-subarrays-with-bounded-maximum/
// 利用超范围值将数组拆开，然后再依次判断
function numSubarrayBoundedMax(nums: number[], left: number, right: number): number {
  // 因为限制最大值，所以先将自身超过的最大值范围的标记
  // 找到下一个标记时再开始处理，从头开始记录最大值，遇到标记时刷新
  let cnt: number = 0;
  const len = nums.length;
  // 记录最大值和上一个超出范围值的位置,默认是开头
  let maxTmp: number = nums[0], iTmp: number = 0;
  for (let i = 0; i < len; i++) {
    // 这里记录标记前的最大值，注意即使是末尾，也可以当作max判断
    if (nums[i] <= right && nums[i] > maxTmp) maxTmp = nums[i];
    if ((nums[i] > right) || (i == len - 1)) {
      // 如果该区间最大值不满足条件，则不符合直接退出，此时区间有left和right间的最大值
      if (maxTmp < left) {
        maxTmp = i == len - 1 ? -1 : nums[i + 1]; // 这里注意也要修改iTmp
        iTmp = i + 1;
        continue;
      }
      // 判断末尾时是因为哪个条件进来的,符合条件则记录i的值，增加一个i
      if ((i == len - 1) && (nums[i] <= right)) i++;
      // 遇到标记处理标记间的情况，最后一个标记是len
      const sonLen = i - iTmp; // 两个标记之前的数组长度，iTmp记录前一个不是标记的
      // console.log(i, iTmp);
      // 这里再对连续数组做处理
      for (let j = iTmp; j < i; j++) {
        // 从0到长度
        for (let k = 1; k <= sonLen; k++) {
          // 如果剩余不满足一组，就退出，注意slice不包含j+k，所以要大于i
          if (j + k > i) break;
          // 对j到j+k之间的数检查是否有满足条件的
          // console.log(nums.slice(j, j + k)); // cons记得删除
          if (nums.slice(j, j + k).some((n) => n >= left)) cnt++; // 这种去遍历一遍的方式太过复杂，其实只需要记录符合的作为一个端点，一直向前直到不符合即可
        }
      }
      maxTmp = i >= len - 1 ? -1 : nums[i + 1]; // maxTmp等于下一个值，防止误判
      iTmp = i + 1;// 尝试记录下一个不是标记的点
    }
  }
  return cnt;
};

// 同时对符合和超出范围的数索引进行记录，进而节省判断和循环时间
function numSubarrayBoundedMax_1(nums: number[], left: number, right: number): number {
  // 像这种连续数组的题目，都可以从找到连续数组的左右端点为思路
  // 自己的解法中，虽然记录了不符合的节点，但是没有记录符合的节点，因此会比较浪费时间
  // 当时虽然想到了思路，但是感觉很麻烦，而且也没法快速实现，需要增加经验
  let res = 0;
  // 记录超出范围的数的位置和符合范围的数的位置
  let iMore = -1, iFit = -1;
  for (let i = 0; i < nums.length; i++) {
    // 符合范围时进行更新fit
    if (nums[i] >= left && nums[i] <= right) {
      iFit = i;
    } else {
      // 用else可以防止多次判断
      if (nums[i] > right) {
        // 超出范围时表示i无法当作右端点
        iMore = i;
        iFit = -1;
      }
    }
    // 不是-1表示当前位置可以当作连续子数组的右端点，因为连续，所以前面有几个数，就会有几个符合的连续子数组
    if (iFit !== -1) {
      // iMore是上一个出现的位置，此时fit和more之间都是fit或者小于left的
      res += iFit - iMore; // 并且默认-1也可以保证0-(-1)=1，正常计数
    }
  }
  return res;
};