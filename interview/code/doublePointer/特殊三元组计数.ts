// 给定一个数组，计算有多少个三元组0<=i<j<k<n，且max(nums[i], nums[j], nums[k]) - min(nums[i], nums[j], nums[k]) = 1。
// 第一行输入n表示数组个数，第二行输入n个整数。

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
  const n = Number(await readline());
  // map加函数就是对所有元素调用函数并返回内容
  const nums = (await readline()).split(' ').map(Number);
  console.log(findThree());
  function findThree(): number {
    // 0 <= i < j < k < n 且 max(ai, aj, ak) - min(ai, aj, ak) = 1
    // 则有ai+1=ak，aj=ai或者aj=ak
    // 基于每一个ai，分情况
    // 情况1，aj=ai，此时寻找aj+1；情况2:aj=ai+1，此时寻找aj

    // 关键在于如何快速针对ai找到ai和ai+1
    // 根据描述，肯定会有重复数字，所以map记录脚标数组
    const numMap = new Map()
    nums.forEach((num: number, i: number) => {
      let numI = numMap.get(num);
      if (!numI) {
        numMap.set(num, []);
        numI = numMap.get(num);
      }
      numI.push(i);
    });
    console.log(numMap);
    let res = 0;
    // store dealed ai
    let findAi: number[] = [];
    // 开始从前向后寻找
    for (let i = 0; i < n; i++) {
      // already deal ,continue
      if (findAi.indexOf(nums[i]) != -1) continue;
      let numJ = numMap.get(nums[i]).slice(1); // 获取和ai相等的，一定是第一个，所以slice
      let numK = numMap.get(nums[i] + 1); // 获取ai+1
      // 先处理ai,ai+1,ai+1的情况，这种情况就等于numK的长度-1的连续数和
      let k = 0;
      if (!numK) continue;
      else {
        // console.log("num:", nums[i]);
        // 此时需要找到大于i的k
        while (k < numK.length && numK[k] < i) k++;
        res += (numK.length - k - 1) * (numK.length - k - 1 + 1) / 2; // 只记录大于的情况
        // console.log(res);
      }
      // 然后是ai,ai,ai+1，此时需针对numJ的脚标看numK的情况
      let j = 0;
      // find ki > ji & count
      while (j < numJ.length && k < numK.length) {
        while (k < numK.length && numK[k] < numJ[j]) k++;
        // ki > ji, direct count
        res += numK.length - k;
        j++;
      }
      // console.log(res);
      // store ai
      findAi.push(nums[i]);
    }
    return res;
  }

})();