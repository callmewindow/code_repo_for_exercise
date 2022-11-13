// https://leetcode.cn/problems/number-of-subarrays-with-lcm-equal-to-k/
// 滑动窗口朴素解决，优化函数的调用实现极限通过
function gcd(a: number, b: number): number{
  if(a == 0 || b == 0) return a == 0 ? b : a;
  // 移位比除法速度更快，可加快速度
  if(a%2 == 0 && b%2 == 0) return 2*gcd(a>>1,b>>1);
  else if(a%2 == 0) return gcd(a>>1,b);
  else if(b%2 == 0) return gcd(a,b>>1);
  else return a < b ? gcd(b-a, a) : gcd(a-b, b);
  // 这里如果调用abs和min函数也可能会导致栈溢出或超时，毕竟多调用了函数
  // return gcd(Math.abs(a-b), Math.min(a,b));
}
function leastComMul(nums: number[], k: number): number {
  // 正常方法：长度为1，当且仅当num == k，长度为2，计算两个元素的最小公倍数然后和k比较
  // 长度超过2，先计算前两个，然后增加第三个元素，按顺序进行
  const numL = nums.length;
  if(numL == 0) return -1;
  if(numL == 1) return nums[0];
  let lcm = nums[0];
  for(let i = 1;i<numL;i++){
    // 大于k则不可能k是最小公倍数
    if(lcm > k || nums[i] > k) return -1;
    lcm = (lcm * nums[i])/gcd(lcm, nums[i]);
  }
  return lcm;
}
function subarrayLCM(nums: number[], k: number): number {
  // 以number为最小公倍数，即number为可以被子数组所有元素整除的最小数
  // 因为是连续子数组，所以判断能否整除应该在遍历过程中进行
  const numL = nums.length;
  let cntA = 0; // 符合的子数组数量
  let winL = 1; // 窗口长度
  let lcm: number;
  while(winL <= numL){
    for(let i = 0;i<=numL-winL;i++){
      // 计算连续cnt个数组的最小公倍数，slice是基于脚标拆分的，需要使用i+winL
      // const lcm = leastComMul(nums.slice(i,i+winL), k);
      // 直接基于脚标循环，防止栈溢出和时间溢出
      lcm = nums[i];
      for(let j = 1;j<winL;j++){
        // lcm或当前元素大于k则不可能k是最小公倍数
        if(lcm > k || nums[i+j] > k){
          // 注意修改lcm，防止被num[i]影响
          lcm = -1;
          break;
        } else lcm = (lcm * nums[i+j])/gcd(lcm, nums[i+j]);
      }
      cntA += lcm == k ? 1 : 0;
    }
    winL++;
  }
  return cntA;
};

// 错误的代码，判断所有子数组中最小公倍数为k的情况数
function subarrayLCM_1(nums: number[], k: number): number {
  // 以number为最小公倍数，即number为可以被子数组所有元素整除的最小数
  // 首先遍历一遍，去除无法将k整除的元素
  if(nums.length == 1 && nums[0] == k) return 1;
  let newNums = [];
  for(let num of nums){
    if(k % num == 0) newNums.push(num);
  }
  // 为了满足k是最小公倍数，需对新数组的若干子数组进行判断
  
  // 生成所有子数组来判断，用01来判断是否取到
  const numL = newNums.length;
  if(newNums.length == 0) return 0;
  let nEnd = 1<<numL;
  let cnt = 0;
  let numTmp: number[];
  for(let mark = 0;mark<nEnd;mark++){
    let nullSet = true;
    numTmp = [];
    // 生成子数组
    for(let i = 0;i<numL;i++){
      if(((1<<i) & mark) != 0){
        nullSet = false
        numTmp.push(newNums[i]);;
      }
    }
    // 判断是否符合，重复子数组也计数
    let comMul = leastComMul(numTmp,k);
    cnt += comMul == k ? 1 : 0;
  }

  return cnt;
};