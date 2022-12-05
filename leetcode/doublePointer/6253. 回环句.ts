// https://leetcode.cn/problems/circular-sentence/
// 多指针一次遍历解决
function isCircularSentence(sentence: string): boolean {
  // 因为空格区分，所以直接遍历即可
  const left = sentence[0]; // 记录开头
  let before: string, after: string;
  for(let i = 1;i<sentence.length-1;i++){
    if(sentence[i] == ' '){
      before = sentence[i-1],after = sentence[i+1];
      if(before != after) return false;
    }
  }
  if(left != sentence[sentence.length-1]) return false;
  return true;
};