// https://leetcode.cn/problems/expressive-words/
// 用map保存字符状态，没想到可能有重复字符
function expressiveWords(s: string, words: string[]): number {
  // 按顺序统计s中各个字符出现的数量，然后看words里对应字符数量能否在加到三或者以上满足
  let chMap = new Map();
  for (let i = 0; i < s.length; i++) {
    let cnt = chMap.get(s[i]); // 记录查找结果
    if (cnt == undefined) chMap.set(s[i], 1); // 没有就新增
    else chMap.set(s[i], cnt + 1);
  }
  const chArr = Array.from(chMap.keys()); // from可基于迭代器创建数组
  // console.log(chArr, chMap);
  let res = 0;
  // 然后依次判断即可，记录当前字符和出现数量
  for (let i = 0; i < words.length; i++) {
    // 减少对word的引用，保存words[i]
    const word = words[i];
    let chNow: string = word[0], chCnt: number = 0;
    let chPos: number = -1; // 记录当前是第几个字符
    let fit = true;
    for (let j = 0; j < word.length; j++) {
      // 处理末尾的情况：1、j-1和前面一样，2、j-1自己一个字母，无论哪种，直接判断即可
      // 当下一个是末尾，或者不等于自己时开始对比chMap
      if (j == word.length - 1 || word[j + 1] != chNow) { // 先判断j防止报错
        ++chCnt; // 当前字符多了一个，所以++
        ++chPos; // 完成了一个字符的读取，所以++
        const cntNeed = chMap.get(chArr[chPos]); // 需要的计数
        // 不是对应位置的字符，或数量大于需要的，或扩展后会超过需要的
        if (chNow != chArr[chPos] || chCnt > cntNeed || (cntNeed < 3 && chCnt != cntNeed)) {
          fit = false;
          break;
        }
        // 否则视作通过，最后替换
        if (j != word.length - 1) chNow = word[j + 1], chCnt = 0; // 因为后面还会判断j+1，会+cnt，所以0
      } else chCnt++;
    }
    // 当符合且处理了s中的所有字符才算成功
    if (fit && chPos == chArr.length - 1) ++res;
  }
  return res;
};

// 将字符记录方式调整为两个数组，分别保存字符和计数，应对重复情况
function expressiveWords_1(s: string, words: string[]): number {
  // 按顺序统计s中各个字符出现的数量，用数组防止某字符多次出现
  let sArr: string[] = [], sCnt: number[] = [];
  for (let i = 0; i < s.length; i++) {
    const chPos = sArr.length;
    if (chPos == 0 || s[i] != sArr[chPos - 1]) sArr.push(s[i]), sCnt.push(1); // 出现不同字符则加入
    else sCnt[chPos - 1] += 1; // 否则计数+1
  }
  // console.log(sArr, sCnt);
  let res = 0;
  // 然后依次判断即可，记录当前字符和出现数量
  for (let i = 0; i < words.length; i++) {
    const word = words[i]; // // 减少对word的引用，提前保存words[i]
    let chNow: string = word[0], chCnt: number = 0; // 当前的字符和字符计数
    let chPos: number = -1; // 记录当前是第几个字符
    let fit = true; // 记录是否有不匹配字符

    for (let j = 0; j < word.length; j++) {
      // 当下一个是末尾，或者不等于自己时开始对比chMap
      if (j == word.length - 1 || word[j + 1] != chNow) { // 先判断j防止报错
        ++chCnt; // 当前字符多了一个，所以++
        ++chPos; // 完成了一个字符的读取，所以++
        const cntNeed = sCnt[chPos]; // 需要的计数
        // 不是对应位置的字符，或数量大于需要的，或扩展后会超过需要的
        if (chNow != sArr[chPos] || chCnt > cntNeed || (cntNeed < 3 && chCnt != cntNeed)) {
          fit = false;
          break;
        }
        // 否则视作通过，替换下一个
        if (j != word.length - 1) chNow = word[j + 1], chCnt = 0; // 因为后面还会判断j+1，cnt会+，这里是0
      } else chCnt++;
    }
    // 当符合且处理了s中的所有的字符才算成功
    if (fit && chPos == sArr.length - 1) ++res;
  }
  return res;
};

// 正则表达式方法无敌解决
function expressiveWords_2(s: string, words: string[]): number {
  // 基于s搭建可以在扩展后成为自己的字符串
  const re = new RegExp(
    "^" +
    (s.match(/([a-z])\1*/g) ?? []) // ?? 表达式得研究下，这里match基于连续出现的字符拆分成了相应的字符串
      .map((son) => (son.length >= 3 ? son[0] + `{1,${son.length}}` : son)) // 当子字符串字符连续次数大于3则范围是1～自己，否则只能自己
      .join("") + "$" // join转为字符串再拼接
  );

  return words.filter((w) => re.test(w)).length; // test可返回是否符合正则表达式
}