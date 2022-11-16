// https://leetcode.cn/problems/global-and-local-inversions/
// 快速无脑过题
function isIdealPermutation(nums: number[]): boolean {
  // 全局倒置即前大于后，但是可以不相邻；局部的话就是连续的
  const nL = nums.length;
  // 局部直接遍历
  // let localNum = 0;
  // for(let i = 0;i<nL-1;i++) if(nums[i] > nums[i+1]) localNum++;
  // 全局，局部一定是全局，所以看除了相邻的，是否还有前面比后面大的
  for (let i = 0; i < nL - 2; i++)
    for (let j = i + 2; j < nL; j++) // 跳过临近直接看
      if (nums[i] > nums[j]) return false;
  return true;
};

// 动态处理，应对的方案多
function isIdealPermutation_1(nums: number[]): boolean {
  const nL = nums.length;
  let minN = Array(nL);
  minN[nL - 1] = nums[nL - 1]; // 初始化末尾
  minN[nL - 2] = nums[nL - 2] < minN[nL - 1] ? nums[nL - 2] : minN[nL - 1];
  for (let i = nL - 3; i >= 0; i--) {
    // 跳过临近，当i大于i+2处最小值，则说明存在非局部的全局，不符合
    if (nums[i] > minN[i + 2]) return false;
    minN[i] = nums[i] < minN[i + 1] ? nums[i] : minN[i + 1]; // 更新最小值
  }
  return true;
};