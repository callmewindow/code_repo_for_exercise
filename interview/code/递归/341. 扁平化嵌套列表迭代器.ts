// https://leetcode.cn/problems/flatten-nested-list-iterator/
// 迭代提前扁平化数组
/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * class NestedInteger {
 *     If value is provided, then it holds a single integer
 *     Otherwise it holds an empty nested list
 *     constructor(value?: number) {
 *         ...
 *     };
 *
 *     Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     isInteger(): boolean {
 *         ...
 *     };
 *
 *     Return the single integer that this NestedInteger holds, if it holds a single integer
 *     Return null if this NestedInteger holds a nested list
 *     getInteger(): number | null {
 *         ...
 *     };
 *
 *     Set this NestedInteger to hold a single integer equal to value.
 *     setInteger(value: number) {
 *         ...
 *     };
 *
 *     Set this NestedInteger to hold a nested list and adds a nested integer elem to it.
 *     add(elem: NestedInteger) {
 *         ...
 *     };
 *
 *     Return the nested list that this NestedInteger holds,
 *     or an empty list if this NestedInteger holds a single integer
 *     getList(): NestedInteger[] {
 *         ...
 *     };
 * };
 */

class NestedIterator {
  private flatNums: number[];
  private pos: number; // 当前位置
    constructor(nestedList: NestedInteger[]) {
      // 构造之后直接将将数组扁平化处理
      this.flatNums = this.flat(nestedList);
      // console.log(this.flatNums);
      this.pos = 0;
    }

    // 扁平化方法
    flat(nums: NestedInteger[]): number[] {
      // 对该数组遍历处理即可
      const res: number[] = [];
      for(let item of nums){
        // 判断类型
        if(item.isInteger()){
          // 整数直接push
          res.push(item.getInteger());
        }else{
          // 否则push扁平化之后的数组
          res.push(...this.flat(item.getList()));
        }
      }
      return res;
    }

    hasNext(): boolean {
      return this.pos < this.flatNums.length;
    }

	  next(): number {
      return this.flatNums[this.pos++];
    }
}

/**
 * Your ParkingSystem object will be instantiated and called as such:
 * var obj = new NestedIterator(nestedList)
 * var a: number[] = []
 * while (obj.hasNext()) a.push(obj.next());
 */