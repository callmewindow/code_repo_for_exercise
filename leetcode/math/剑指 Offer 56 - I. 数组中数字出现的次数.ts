// https://leetcode.cn/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-lcof/
// 用移位来保存数据状态，但因为移位可以移的长度有限，不能应对所有情况
function singleNumbers(nums: number[]): number[] {
  // 时间复杂度On，则说明只能一次遍历，不能通过排序等方式解决
  // 出现两次的数字可以用异或去除，难点是找到两个只出现一次的数字，只需要处理一遍后再找是1的值
  let mark = 0;
  for (let num of nums) {
    const numPos = 1 << num;
    // 用&来判断是否已出现，0则说明没出现，1就表示出现了
    // 已经出现了则通过运算修改，通过异或1<<num即可解决，因为1^1 = 0,1^0=1,0^0=1，只会影响num位的值
    if ((numPos & mark) != 0) mark ^= numPos;
    else mark |= numPos; // 没出现则通过1左移在对应的位上调整标记，为了不影响其他位置，用或运算
  }
  let res: number[] = [];
  // 检查mark有哪些位置为1，为1则表示只出现了1次
  for (let num of nums) if (((1 << num) & mark) != 0) res.push(num);
  return res;
};

// 基于数不同异或后肯定有0的性质，分组找到两个数
function singleNumbers_1(nums: number[]): number[] {
  // 利用了异或运算的性质：如果两个数转为二进制后有某些位不同，那么该位为1，从而便可将他们两个区分开
  // 如果没有1，则说明他们一定相等
  // 先遍历一遍得到a和b的异或
  let mark = 0;
  for (let num of nums) mark ^= num;
  let flag = 1; // 找哪位是1
  while ((flag & mark) == 0) flag <<= 1;
  let res: number[] = [0, 0];
  for (let num of nums) {
    // 利用flag拆分数组便可将a和b拆分开，进而两个数组再进行一轮异或，得到的就是a和b
    // 这里注意flag已经是移位后的值了，不用再移位
    if ((num & flag) == 0) res[0] ^= num;
    else res[1] ^= num;
  }
  return res;
};