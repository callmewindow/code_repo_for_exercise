// https://leetcode.cn/problems/t9-lcci/
// 基础的搭建map查找方法
const map: Map<string, string[]> = new Map(
  [
    ['2', ['a', 'b', 'c']],
    ['3', ['d', 'e', 'f']],
    ['4', ['g', 'h', 'i']],
    ['5', ['j', 'k', 'l']],
    ['6', ['m', 'n', 'o']],
    ['7', ['p', 'q', 'r', 's']],
    ['8', ['t', 'u', 'v']],
    ['9', ['w', 'x', 'y', 'z']],
  ]
)
function getValidT9Words(num: string, words: string[]): string[] {
  const n = num.length;
  let res: string[] = [];
  for (let word of words) {
    let check = true;
    for (let i = 0; i < n; i++) {
      if (!map.get(num[i]).includes(word[i])) {
        check = false;
        break;
      }
    }
    if (check) res.push(word);
  }
  return res;
};

// 通过和a之间的距离搭建2～9的数组，进而o(1)查找
const key = [2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 9, 9, 9, 9]
function getValidT9Words_1(num: string, words: string[]): string[] {
  return words.filter(w => Array.prototype.every.call(w, (c, i) => num[i] === String(key[c.charCodeAt(0) - "a".charCodeAt(0)])))
};

// every也可转为数组后使用every方法，但是需要占更多的内存空间和转化的时间
function getValidT9Words_2(num: string, words: string[]): string[] {
  return words.filter(w => w.split('').every((c, i) => num[i] === String(key[c.charCodeAt(0) - "a".charCodeAt(0)])))
};