// https://leetcode.cn/problems/ba-shu-zi-fan-yi-cheng-zi-fu-chuan-lcof
// 分别记录和不合并的情况做处理
function checkMerge(ch1: string, ch2: string): boolean {
  return ch1 == '1' || (ch1 == '2' && Number(ch2) <= 5) // 可以直接比较字符
}
function translateNum(num: number): number {
  // 可能有多种情况的有：1x，2x，可以拆分为1和x，进而再递归
  // 需要倒序处理
  // 这里先转成字符串数组，其实可以不转直接弄，应该更快
  let numA = num.toString().split('');
  let nLen = numA.length;
  if (nLen == 1) return 1;
  if (nLen == 2) {
    // 判断能否和后一个数合并
    if (checkMerge(numA[nLen - 2], numA[nLen - 1])) return 2;
    return 1;
  }

  // 两个状态，一个是自己当作一个数处理，一个是自己和后面的一个数绑定起来进行可能性的计算
  let transNum = Array(nLen).fill(0)
    .map(() => Array(2).fill(0));
  // 初始化边界值
  // 最右一个数肯定只有一种情况
  transNum[nLen - 1] = [1, 0];
  // 倒数第二个数需要根据情况判断
  transNum[nLen - 2] = checkMerge(numA[nLen - 2], numA[nLen - 1]) ? [1, 1] : [1, 0];
  // console.log(transNum)

  // 倒数第三个数开始
  for (let i = nLen - 3; i >= 0; i--) {
    // 如果自己一个数，等于后一位两种情况之和
    transNum[i][0] = transNum[i + 1][0] + transNum[i + 1][1]
    // 如果和后面的能合起来一个数，则等于需要后一个数的后一个数两种情况之和
    if (checkMerge(numA[i], numA[i + 1]))
      transNum[i][1] = transNum[i + 2][0] + transNum[i + 2][1];
    // console.log(transNum)
  }

  // 两种情况是不同的，直接合并即可
  return transNum[0][0] + transNum[0][1];
};