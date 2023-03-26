/**
 * 返回字符串的全排列数组
 * @param str 待排列的字符串
 * @returns 全排列数组
 */
function permutation(str: string): string[] {
  // 如果字符串长度小于等于1，直接返回
  if (str.length <= 1) {
    return [str];
  }

  // 用于保存全排列的数组
  const result: string[] = [];

  // 遍历字符串中的每个字符
  for (let i = 0; i < str.length; i++) {
    // 获取当前遍历到的字符
    const firstChar = str[i];
    // 获取除了当前字符以外的其他字符组成的字符串
    const otherChars = str.substring(0, i) + str.substring(i + 1);
    // 递归调用，获取其他字符的全排列数组
    const otherPermutations = permutation(otherChars);

    // 遍历其他字符的全排列数组，与当前字符组成新的全排列
    for (let j = 0; j < otherPermutations.length; j++) {
      // 组成新的全排列
      const permutation = firstChar + otherPermutations[j];
      // 将新的全排列添加到结果数组中
      result.push(permutation);
    }
  }

  // 返回全排列数组
  return result;
}
