// https://leetcode.cn/problems/zhan-de-ya-ru-dan-chu-xu-lie-lcof/
// 直接模拟，splice删除表示pop，脚标前进模拟push，根据情况分析即可
function validateStackSequences(pushed: number[], popped: number[]): boolean {
  // 有没有可能是弹出顺序只需看是否满足后进先出的顺序即可
  // 如果pop中的数之间的顺序和push一致，有且只有push后pop然后再push再pop这种情况；如果顺序不一致，即倒序，则说明是连续pop

  // 尝试一次遍历用map记录push中各数字的位置，进而判断，但是太花时间
  // let numMap = new Map();

  // 直接用遍历来硬模拟
  const len = pushed.length;
  let iI = 0, oI = 0; // 记录push/in和pop/out的数字脚标
  // 先让iI和oI位置一致
  while (pushed[iI] != popped[oI] && iI < pushed.length) iI++;
  while (pushed.length > 0) {
    pushed.splice(iI, 1); // 根据pop的顺序删除push的
    oI++; // 处理下一个
    if (oI >= len) continue;
    // 根据pop的下一个判断是继续pop还是push后pop
    // 如果继续pop则只能等于前一个，进行判断
    if (iI > 0 && popped[oI] == pushed[iI - 1]) iI--;
    else {
      // 否则是先push若干再pop，因此一直向后找值或溢出
      while (pushed[iI] != popped[oI] && iI < pushed.length) iI++;
      if (iI == pushed.length) return false; // 没找到说明不符合，直接退出
      // 找到了则继续
    }
  }
  return true;
};