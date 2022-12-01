// https://leetcode.cn/problems/zi-fu-chuan-de-pai-lie-lcof/
// 递归获取s-1的全排列，然后插空放最后一个
function permutation(s: string): string[] {
  // 这里是找出字符串的全排列，并且可能有重复的字符
  // 要找出三个字符的全排列，只需得到两个字符的全排列，然后分别将第三个字符插在第0，1，2个位置即可

  // 插入过程中还要记录当前插入位置的下一个字符，如果相同的话则跳过一个，再去判断下一个
  const len = s.length;
  if (len == 1) return [s];
  let before = permutation(s.slice(0, len - 1)); // 得到前面的全排列
  // 加入最后一个字符
  const last = s[len - 1];
  let res: string[] = [];
  for (let i = 0; i < before.length; i++) {
    let str = before[i];
    let ch: string = ''; // 记录插入位置后面的字符
    for (let j = 0; j <= str.length; j++) {
      if (last == ch) {
        // 注意替换ch到下一个，如果是最后一个了就不用替换
        if (j < str.length) ch = str[j];
        continue;
      }
      // 不相等了则生成字符串判断能否添加
      // 因为可能在不同的before的字符串之间有重复的情况
      const newStr = str.slice(0, j) + last + str.slice(j, len); // 这里j最大为len
      // console.log(res, newStr, res.includes(newStr));
      if (!res.includes(newStr)) res.push(newStr); // 这是极特殊情况的判断
      ch = str[j];
    }
    // // 判断和末尾的关系看是否加在末尾
    // // 注意这里也要判断，直接合并到循环里
    // if(last != ch) res.push(str+last);
  }
  return res;
};

// include原来这么快，不人工跳过重复字符也速度一样
function permutation(s: string): string[] {
  // 这里是找出字符串的全排列，并且可能有重复的字符
  // 要找出三个字符的全排列，只需得到两个字符的全排列，然后分别将第三个字符插在第0，1，2个位置即可

  // 插入过程中还要记录当前插入位置的下一个字符，如果相同的话则跳过一个，再去判断下一个
  const len = s.length;
  if (len == 1) return [s];
  let before = permutation(s.slice(0, len - 1)); // 得到前面的全排列
  // 加入最后一个字符
  const last = s[len - 1];
  let res: string[] = [];
  for (let i = 0; i < before.length; i++) {
    let str = before[i];
    for (let j = 0; j <= str.length; j++) {
      const newStr = str.slice(0, j) + last + str.slice(j, len);
      if (!res.includes(newStr)) res.push(newStr); // 重复情况的判断
    }
  }
  return res;
};