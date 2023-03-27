// https://leetcode.cn/problems/kth-largest-element-in-an-array/
// 基于快速选择拆分两部分，递归寻找对应的元素
function findKthLargest(nums: number[], k: number): number {
  // 基于快速选择进行处理
  const n = nums.length;
  if(n === 1) return nums[0]; // 只有一个就不需要找了
  const pivot = Math.floor(Math.random()*n); // 选择随机脚标
  // 注意这里是要找最大的
  // 拆分左右，左大于，右小于等于
  const left:number[]= [],right:number[] = [];
  for(let i = 0;i<n;i++){
    if(nums[i] > nums[pivot]) left.push(nums[i]);
    else if(nums[i] < nums[pivot]) right.push(nums[i]);
    else if(i !== pivot) right.push(nums[i]); // 等于的也放右边
  }
  // 看k在哪一部分
  // console.log(nums);
  // console.log(left, right);
  const nL = left.length;
  // console.log(k,nL, k-(nL+1));
  if(k <= nL) return findKthLargest(left,k);
  else if(k > nL + 1) return findKthLargest(right, k-(nL+1)); // 去除左侧的
  else return nums[pivot];
};