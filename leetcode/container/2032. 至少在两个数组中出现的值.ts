// https://leetcode.cn/problems/two-out-of-three/
// 直接三set记录三数组情况，基于1在2和3中寻找，并在找到后取出有关数字，防止重复判断
function twoOutOfThree(nums1: number[], nums2: number[], nums3: number[]): number[] {
  // 记录在两个或三个数组中出现的所有值，并去重返回
  // 最基础的方法就是遇到一个就去三个数组里面找，如果有就记录到set里，然后把set转成list
  // 需要优化判断是否出现多个数组
  // 方案1:三个数组排序，然后基于数值快速判断一个范围，但是需要判断很多情况
  // 方案2:三个数组转为set，分别用set判断是否has
  let set1 = new Set(nums1),set2 = new Set(nums2),set3 = new Set(nums3);
  let resSet: Set<number> = new Set();
  // 依次处理前两个set
  for(let num of set1){
    // resSet一定不会出现，因为后面add的num只会出现一次
    // if(resSet.has(num)) continue;
    if(set2.has(num) || set3.has(num)){
      resSet.add(num);
      set2.delete(num), set3.delete(num); // set1不需要删除，后续不需要
    }
  }
  // 此时set1已经处理完，所以不需要判断，3也不需要删除，因为剩余的不可能出现多次
  for(let num of set2)
    if(set3.has(num)) resSet.add(num);
  
  // console.log(resSet)
  return Array.from(resSet); // 如果set没有指定内容是number，无法返回，因为是unknown
};