// https://leetcode.cn/problems/sum-of-subsequence-widths/
// 先来个暴力，排序后找子序列首位
function sumSubseqWidths(nums: number[]): number {
  const mod = 1e9+7;
  // 先对nums排序，确保子序列也是按顺序排序的
  nums.sort((b,f)=>b-f)
  const nLen = nums.length;
  let res = 0;
  // 考虑到nums可能超长，因此使用大数保存
  let allPos = 1n << BigInt(nLen);
  let minN: number, maxN: number;
  // 跳过空数组
  for(let mark = 1n;mark < allPos;mark++){
    // 从前找最小的
    for(let i = 0;i<nLen;i++)
      if(((1n << BigInt(i)) & mark) != 0n){ // 注意是大数运算
        minN = nums[i];
        break;
      }
    // 从后找最大的
    for(let i = nLen - 1;i>=0;i--)
      if(((1n << BigInt(i)) & mark) != 0n){
        maxN = nums[i];
        break;
      }
    res = (res + maxN - minN) % mod
  }
  return res;
};

// 手搓pow计算，先梳理好逻辑
function sumSubseqWidths(nums: number[]): number {
  const mod = 1000000007;
  // 先对nums排序，确保子序列也是按顺序排序的
  nums.sort((b,f)=>b-f)
  const nLen = nums.length;
  // console.log(nLen);
  let res = 0;
  // 从1开始到全1，从最小值到最大值，他们作为最大值出现的次数（不包含一个元素的情况）分别为2的0次幂-1到2的n-1次幂-1
  // 对于最小值，按照2的n次幂
  // 以1，2，3，4，5举例
  // 规律如下（忽略一个元素的情况）：第一组是0，第二组是1，第三组是1，2，1，第四组是，1，2，1，3，1，2，1，第五组是1，2，1，3，1，2，1，4，1，2，1，3，1，2，1
  // 转化规律：最小值出现的次数（这里的i是第几组，也就是脚标+1）：sum(2的i-1次幂/2，即2的i-2次幂)，第二个值出现的次数同理，每个位置都是2的i-3次幂，倒数第二个值出现的次数即2的n-1-(n-1)
  // 根据上述规律可得解，所有可能中最大值-最小值，就是上述所有最大值-最小值
  // 按元素拆分，i脚标元素出现的次数为 2的i次幂-1 - sum(2的i-1次幂)，再乘上当前位置的元素，然后加起来就是真正的子序列宽度和
  // 所以只需要计算出每个位置出现的次数即可

  for(let i = 0;i<nLen;i++){

    // 当前位置作为最大值和最小值出现的次数，忽略单元素
    let maxCntI = 1;
    // 计算最大值时的次数
    // maxCntI = Math.pow(2,i) - 1;
    for(let j = 0;j<i;j++){
      maxCntI *= 2;
      maxCntI %= mod;
    }
    maxCntI -= 1;

    let minCntI = 0;
    // 最小值时的次数
    for(let j = 0;j<nLen;j++){
      // 在j脚标时i可能作为最小值出现
      if(j-1-i >= 0){
        // minCntI += Math.pow(2,j-1-i);
        let tmp = 1;
        for(let k = 0;k<j-1-i;k++){
          tmp *= 2;
          tmp %= mod;
        }
        minCntI += tmp;
      }
    }
    // 加上mod防止出现负数
    res += (maxCntI - minCntI + mod) * nums[i];
    res %= mod;
  }
  return res;
};

// 究极分析规律，将2的n次幂直接保存下来，不再每次从1开始计算，保存计算状态
function sumSubseqWidths(nums: number[]): number {
  const mod = 1000000007;
  // 先对nums排序，确保子序列也是按顺序排序的
  nums.sort((b,f)=>b-f);
  const nLen = nums.length;
  // console.log(nLen);
  let res = 0, maxCntI: number, minCntI: number, tmp: number, pow2: number;
  maxCntI = 1,minCntI = 0;
  for(let i = 0;i<nLen;i++){
    // 计算最大值时的次数
    // pow2 = i;
    // maxCntI = Math.pow(2,pow2) - 1;
    // 因为按顺序遍历，后一个比前一个永远多一个2，所以这里没必要再从1开始算，保留即可
    // 恢复到-1前的状态
    // 第一个元素的maxCntI应该是0，暂时加一个判断
    if(i > 0){
      maxCntI += 1;
      maxCntI *= 2;
    }
    // for(let j = 0;j<pow2;j++){
    //   maxCntI *= 2;
    //   maxCntI %= mod;
    // }
    maxCntI -= 1;
    maxCntI %= mod;

    // 最小值时的次数
    // 在j脚标大于等于i+1时可能作为最小值出现
    minCntI = 0;
    tmp = 1;
    for(let j = i+1;j<nLen;j++){
      // pow2 = j-1-i;
      // minCntI += Math.pow(2,pow2);
      // 这里确保tmp从1一直到2的n-1-1-i次幂，暂时加一个判断
      if(j > i + 1) tmp *= 2;
      tmp %= mod;
      // for(let k = 0;k<pow2;k++){
      //   tmp *= 2;
      //   tmp %= mod;
      // }
      // console.log(tmp)
      minCntI = (minCntI + tmp) % mod;
    }
    // console.log(i, maxCntI, minCntI);
    // 加上mod防止出现负数
    res = (res + (maxCntI - minCntI + mod) * nums[i]) % mod;
  }
  return res;
};

// 进一步保存最小值时的计数，On2优化为On
function sumSubseqWidths(nums: number[]): number {
  const mod = 1000000007;
  // 先对nums排序，确保子序列也是按顺序排序的
  nums.sort((b,f)=>b-f);
  const nLen = nums.length;
  // console.log(nLen);
  let res = 0, maxCntI: number, minCntI: number, tmp: number;
  // 计算最大值时的次数
  maxCntI = 1;
  for(let i = 0;i<nLen;i++){
    // 因为按顺序遍历，后一个比前一个永远多一个2，所以这里没必要再从1开始算，保留即可
    // 第一个元素的maxCntI应该是0，暂时加一个判断
    if(i > 0){
      // 恢复到-1前的状态
      maxCntI += 1;
      maxCntI *= 2;
    }
    maxCntI -= 1;
    maxCntI %= mod;
    // console.log(maxCntI)
    res = (res + maxCntI * nums[i]) % mod;
  }

  // 最小值时的次数
  minCntI = 0;
  tmp = 1;
  // 再次找规律，最小值，n-2仅出现1次，n-3出现1+2次，n-4出现1+2+4次，所以，不只2的n次幂可以保存，minCntI也可以保存
  for(let i = nLen - 2;i>=0;i--){
    // n-1只有一次，所以判断一下
    if(i < nLen - 2) tmp *= 2;
    tmp %= mod;
    minCntI = (minCntI + tmp) % mod;
    // console.log(tmp, minCntI);
    // 加上mod防止出现负数
    res = (res + (mod - minCntI) * nums[i]) % mod;
  }
  return res;
};

// 结合最大最小值之间的关系，进一步合并代码，实现可能的最优解
function sumSubseqWidths(nums: number[]): number {
  const mod = 1000000007;
  // 先对nums排序，确保子序列也是按顺序排序的
  nums.sort((b,f)=>b-f);
  const nLen = nums.length;
  // console.log(nLen);
  let res = 0, maxCntI: number, minCntI: number, tmp: number;
  // 计算最大值时的次数
  maxCntI = 1;
  for(let i = 0;i<nLen;i++){
    // 因为按顺序遍历，后一个比前一个永远多一个2，所以这里没必要再从1开始算，保留即可
    // 第一个元素的maxCntI应该是0，暂时加一个判断
    if(i > 0){
      // 恢复到-1前的状态
      maxCntI += 1;
      maxCntI *= 2;
    }
    maxCntI -= 1;
    maxCntI %= mod;
    // console.log(maxCntI)
    res = (res + maxCntI * nums[i]) % mod;

    // 根据规律，n-i-2的minCntI就等于i+1的maxCntI，即n-i-1的minCntI等于i的maxCntI（因为min从后往前变大，max从前往后变大），因此直接合并计算
    // 即2的n-1次幂，就等于2的0次幂+1次幂+。。。+n-2次幂
    minCntI = maxCntI;
    res = (res + (mod - minCntI) * nums[nLen-i-1]) % mod;
    // console.log(i,nums[i],nLen-i-2,nums[nLen-i-1]);
  }
  return res;
};

// 进一步优化上述代码，减少没必要的计算和逻辑
function sumSubseqWidths(nums: number[]): number {
  const mod = 1000000007;
  // 先对nums排序，确保子序列也是按顺序排序的
  nums.sort((b,f)=>b-f);
  const nLen = nums.length;
  // console.log(nLen);
  let res: number = 0, cntI: number = 0;
  // 第一个元素的最大值cntI是0，最后一个元素的最小值cntI也是0，因此都跳过，从1开始
  for(let i = 1;i<nLen;i++){
    // 不再恢复到-1前的状态，直接*2+1实现
    cntI = (cntI * 2 + 1) % mod;
    // console.log(cntI)
    // 即n-i-1的最小值cntI等于i的最大值cntI（因为min从后往前变大，max从前往后变大）
    res = (res + (cntI * nums[i]) % mod + ((mod - cntI) * nums[nLen-i-1]) % mod ) % mod;
  }
  return res;
};

// 再进一步优化代码，位运算加速
function sumSubseqWidths(nums: number[]): number {
  const mod = 1000000007;
  // 先对nums排序，确保子序列也是按顺序排序的
  nums.sort((b,f)=>b-f);
  const nLen = nums.length;
  let res: number = 0, cntI: number = 0;
  // 第一个元素的最大值cntI是0，最后一个元素的最小值cntI也是0，因此都跳过，从1开始
  for(let i = 1;i<nLen;i++){
    // 不再恢复到-1前的状态，直接*2+1实现，优化为位运算，记得加括号，位运算优先级比+高
    cntI = ((cntI << 1) + 1) % mod;
    // n-i-1的最小值cntI等于i的最大值cntI（min从后往前变大，max从前往后变大），加mod防止负数
    res += mod + cntI * (nums[i] - nums[nLen-1-i]) % mod;
  }
  return res % mod;
};