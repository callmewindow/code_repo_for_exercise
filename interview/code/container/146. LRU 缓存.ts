// https://leetcode.cn/problems/lru-cache/
// 使用基础的数组push，splice实现增删操作
class LRUCache {
  private keyMap: Map<number, number>;
  // 记录各密钥顺序
  private memOrder: number[];
  private maxSize: number;

  constructor(capacity: number) {
    this.keyMap = new Map();
    this.maxSize = capacity; // 最多cap个密钥
    this.memOrder = [];
  }

  get(key: number): number {
    let val = this.keyMap.get(key);
    if (val === undefined) return -1; // 不存在则返回-1，注意不能直接！，可能为0
    // 否则将key的操作顺序提到最前
    this.memOrder.splice(this.memOrder.indexOf(key), 1); // 删除原本的值
    this.memOrder.push(key); // 将最近使用的放在最后
    return val;
  }

  put(key: number, value: number): void {
    // 已经存在key则只需set和修改顺序
    if (this.keyMap.has(key)) {
      this.get(key); // 通过get来调整顺序即可
    } else {
      // 不存在则需要看是否已满
      // 满的时候删除最最早被操作的，例如2在1后put，但get1了，所以1被使用，删除2
      // 如果满了则删除最近未使用，即order 0
      if (this.memOrder[this.maxSize - 1] != undefined) {
        this.keyMap.delete(this.memOrder[0]); // map也要删除
        this.memOrder.splice(0, 1);
      }
      // 确保有剩余了直接push
      this.memOrder.push(key); // 放在最后表示最近使用
    }
    // 统一更新map的值
    this.keyMap.set(key, value);
  }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

// 利用ts的map记录更新顺序的性质进行解决
class LRUCache_1 {
  // 利用map的性质记录各密钥顺序
  private keyMap: Map<number, number>;
  private maxSize: number;

  constructor(capacity: number) {
    this.keyMap = new Map();
    this.maxSize = capacity; // 最多cap个密钥
  }

  get(key: number): number {
    let val = this.keyMap.get(key);
    if (val === undefined) return -1; // 不存在则返回-1，注意不能直接！，可能为0
    // 否则将key的操作顺序提到最前
    // 重新 set，相当于更新到 map 最后
    this.keyMap.delete(key)
    this.keyMap.set(key, val)
    return val;
  }

  put(key: number, value: number): void {
    // 已经存在key则只需set和修改顺序
    let val = this.keyMap.get(key);
    // 不存在就后续统一处理
    // 如果存在就先删除
    if (val !== undefined) {
      this.keyMap.delete(key);
    }
    // 此时一定不存在，需要看是否已满
    // 如果之前key就在，则此时一定不会满，处理的还是新key加入的情况
    if (this.keyMap.size === this.maxSize) {
      // 利用next获取到第一个key，即最不常用的
      this.keyMap.delete(this.keyMap.keys().next().value);
    }
    // 统一更新map的值
    this.keyMap.set(key, value);
  }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */