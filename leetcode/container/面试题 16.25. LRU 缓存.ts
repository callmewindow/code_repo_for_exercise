// https://leetcode.cn/problems/lru-cache-lcci/submissions/
// 数组保存使用顺序进行记录
class LRUCache {
  private keyMap: Map<number, number>;
  // 记录各密钥顺序
  private memOrder: number[];
  private maxSize: number;

  constructor(capacity: number) {
    this.keyMap = new Map();
    this.memOrder = []; // 最多cap个密钥
    this.maxSize = capacity;
  }

  get(key: number): number {
    let val = this.keyMap.get(key);
    if (!val) return -1; // 不存在则返回-1
    // 否则将key的操作顺序提到最前
    this.memOrder.splice(this.memOrder.indexOf(key), 1); // 删除原本的值
    this.memOrder.push(key); // 将最近使用的放在最后
    return val;
    // return this.keyMap.get(key) || -1; // 没找到则是-1
  }

  put(key: number, value: number): void {
    // 已经存在key则只需set和修改顺序
    if (this.keyMap.has(key)) {
      this.get(key); // 通过get来调整顺序
    } else {
      // 不存在则需要看是否已满
      // 满的时候删除最最早被操作的，例如2在1后put，但get1了，所以1被使用，删除2
      // 如果满了则删除最近未使用，即order 0
      if (this.memOrder[this.maxSize - 1] != undefined) {
        this.keyMap.delete(this.memOrder[0]); // map也要删除
        this.memOrder.splice(0, 1);
      }
      this.memOrder.push(key); // 放在最后表示最近使用
    }
    this.keyMap.set(key, value);
  }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */