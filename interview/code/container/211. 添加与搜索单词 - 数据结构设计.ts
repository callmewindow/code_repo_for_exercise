// https://leetcode.cn/problems/design-add-and-search-words-data-structure/
// 搭建字典树，针对.遍历孩子
// 字典树节点
class TrieNode {
  // 字典树开头是不包含自己的值的，都是从孩子中获取
  private children: any[];
  private isEnd: boolean;
  constructor() {
    // 默认0占位
    this.children = new Array(26).fill(0);
    this.isEnd = false;
  }

  insert(word: string) {
    let node = this;
    for (let i = 0; i < word.length; i++) {
      const index = word.charCodeAt(i) - 'a'.charCodeAt(0);
      if (node.children[index] === 0) {
        // 没有则新建，用index表示当前的字符是否存在
        node.children[index] = new TrieNode();
      }
      // console.log(node.children);
      // 迭代处理
      node = node.children[index];
    }
    // 对最后一个isEnd进行记录，表示从根部到当前组成单词
    node.isEnd = true;
  }

  getChildren() {
    return this.children;
  }

  isEndNow() {
    return this.isEnd;
  }
}

class WordDictionary {
  // 一个字典树即可满足
  private dict: TrieNode;
  constructor() {
    this.dict = new TrieNode();
    // 等待插入
  }

  addWord(word: string): void {
    // 插入直接调用
    this.dict.insert(word);
  }

  search(word: string): boolean {
    // 因为这里不是判断前缀，而是匹配即可，所以需要dfs
    // index更便捷
    function dfs(index: number, node: TrieNode): boolean {
      // 一个孩子一个孩子找，注意也需要到末尾才行
      if (index === word.length) return node.isEndNow();
      // 如果.需要遍历每一个child
      // console.log(node);
      const child = node.getChildren();
      if (word[index] === '.') {
        for (let i = 0; i < 26; i++) {
          // 不是0才判断
          if (child[i] !== 0) {
            const res = dfs(index + 1, child[i]);
            if (res) return true;
          }
        }
        return false;
      } else {
        const chNum = word.charCodeAt(index) - 'a'.charCodeAt(0);
        if (child[chNum] !== 0) return dfs(index + 1, child[chNum]);
        else return false;
      }
    }
    // 从0开始找
    return dfs(0, this.dict);
  }
}

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */