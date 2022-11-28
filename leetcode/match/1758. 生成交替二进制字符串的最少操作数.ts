// https://leetcode.cn/problems/minimum-changes-to-make-alternating-binary-string/
// 通过对比和0101与1010字符串差异实现计数
function minOperations(s: string): number {
  // 继续字符串匹配，难点是找出最少交换次数
  // 其实无论长度多长，交替字符串只有两种，以1开始交替和以0开始交替，就算生成，生成后的也是这两种

  // 因此只需用一个数来在0和1之间更替，然后同时基于1开始和0开始和当前字符串的不同字符之差，返回最小值即可
  let tmp = 0;
  let res0 = 0, res1 = 0; // 分别记录以0开始和以1开始
  for (let ch of s) {
    const num = Number(ch);
    if (num != tmp) res0++; // 判断是否符合0101..
    if (num != (tmp ^ 1)) res1++; // 判断是否符合1010
    tmp ^= 1; // 异或实现01交替
  }
  // 返回最小修改值
  return res0 > res1 ? res1 : res0;
};

// 优化代码，一次判断实现统计
function minOperations_1(s: string): number {
  let tmp = 0;
  let res0 = 0, res1 = 0; // 分别记录以0开始和以1开始
  for (let ch of s) {
    // 因为ch只能等于0或1，因此一次只可能加一个res，直接判断一次
    if (Number(ch) != tmp) res0++; // 不等于tmp表示不符合0101..
    else res1++; // 等于tmp说明不符合1010..
    tmp ^= 1; // 异或实现01交替
  }
  // 返回最小修改值
  return res0 > res1 ? res1 : res0;
};

// 位运算实现判断
function minOperations_2(s: string): number {
  let tmp = 0, res0 = 0, res1 = 0;
  for(let ch of s){
    // 因为ch只能等于0或1，因此一次只可能加一个res，又根据加的规律可知，res0+不等，res1加等，因此直接位运算处理
    const num = Number(ch)^tmp; // ch和tmp不相等会返回1，否则0
    res0 += num, res1 += num^1;
    tmp ^= 1; // 异或实现01交替
  }
  return res0 > res1 ? res1 : res0;
};