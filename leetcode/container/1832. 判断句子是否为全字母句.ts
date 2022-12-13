// https://leetcode.cn/problems/check-if-the-sentence-is-pangram/
// set记录是否出现
function checkIfPangram(sentence: string): boolean {
  let words = new Set(); // 记录a到z
  for (let i = 0; i < sentence.length; i++) {
    if (!words.has(sentence[i])) words.add(sentence[i]);
    if (words.size == 26) return true; // 到达26则不再继续
  }
  return false;
};

// 直接基于字符生成集合来判断
function checkIfPangram(sentence: string): boolean {
  return new Set(sentence).size===26;
  // return new Set(sentence.split("")).size===26;
};

// 26个字母，因此可以二进制来解决，用位数来记录是否出现
// 位运算用二进制保存字母是否出现过
function checkIfPangram(sentence: string): boolean {
  let state = 0;
  for (let i = 0; i < sentence.length; i++) {
    const c = sentence[i];
    state |= 1 << (c.charCodeAt(0) - 'a'.charCodeAt(0)); // 或可以保证0时是1，1时还是1
  }
  return state == (1 << 26) - 1; // 1<<26即1000（26个0），再减一再二进制表达上就等于111（26个1）
};