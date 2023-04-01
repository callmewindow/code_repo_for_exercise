// https://leetcode.cn/problems/reverse-words-in-a-string/
// 利用api暴力处理实现
function reverseWords(s: string): string{
  const wordList :string[] = s.trim().split(' '); // 去左右空格，拆分获取单词列表
  // 去除内部空字符串得到单词数组，反转后加空格返回
  return wordList.filter((str)=>str !== '').reverse().join(' ');

}

// 去除空格后自行反转，更快
function reverseWords_1(s: string): string{
  const wordList :string[] = s.trim().split(' '); // 去左右空格，拆分获取单词列表
  // 去除内部空字符串得到单词数组，反转后加空格返回
  // return wordList.filter((str)=>str !== '').reverse().join(' ');
  // api有一些空间浪费
  let res = '';
  for(let word of wordList){
    if(word === '') continue;
    res = word + ' ' + res;
  }
  return res.slice(0,-1); // 去除最后的空格
}