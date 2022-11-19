// https://leetcode.cn/problems/shu-ju-liu-zhong-de-zhong-wei-shu-lcof/
// 二分写错了，就离谱
class MedianFinder {

  private _data_stream: number[];
  constructor() {
    // 维护一个数组即可
    this._data_stream = [];
  }

  addNum(num: number): void {
    // 最简单解法即增加数后sort进行从小到大排序，保持不变
    // 插入时用二分法找到自己应该在的位置：left<= num <= right，保持不变
    let left = 0, right = this._data_stream.length;
    let mid: number;
    // 二分法快速插入
    while (left <= right) {
      mid = Math.floor(left + right);
      if (num > this._data_stream[mid]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    // console.log(left, mid, right)
    this._data_stream.splice(left, 0, num); // 在对应位置新增值
    return;
  }

  findMedian(): number {
    const dLen = this._data_stream.length;
    const mid = Math.floor(dLen / 2);
    // 这个只需对排序数组基于长度获取中位数的索引，计算即可
    if (dLen % 2 == 1)
      return this._data_stream[mid];
    else
      return (this._data_stream[mid] + this._data_stream[mid - 1]) / 2;
  }
}

/**
* Your MedianFinder object will be instantiated and called as such:
* var obj = new MedianFinder()
* obj.addNum(num)
* var param_2 = obj.findMedian()
*/

// 默认排序，果然很慢
class MedianFinder_1 {

  private _data_stream: number[];
  constructor() {
    // 维护一个数组即可
    this._data_stream = [];
  }

  addNum(num: number): void {
    this._data_stream.push(num);
    this._data_stream.sort((b, f) => b - f);
    return;
  }

  findMedian(): number {
    const dLen = this._data_stream.length;
    const mid = Math.floor(dLen / 2);
    // 这个只需对排序数组基于长度获取中位数的索引，计算即可
    if (dLen % 2 == 1)
      return this._data_stream[mid];
    else
      return (this._data_stream[mid] + this._data_stream[mid - 1]) / 2;
  }
}

// 真正的二分+位运算
class MedianFinder_2 {

  private _data_stream: number[];
  constructor() {
    // 维护一个数组即可
    this._data_stream = [];
  }

  addNum(num: number): void {
    // 最简单解法即增加数后sort进行从小到大排序，保持不变
    // 插入时用二分法找到自己应该在的位置：left<= num <= right，保持不变
    let left = 0, right = this._data_stream.length;
    let mid: number;
    // 二分法快速插入
    while (left <= right) {
      mid = (left + right) >> 1;
      if (num > this._data_stream[mid]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    // console.log(left, mid, right)
    this._data_stream.splice(left, 0, num); // 在对应位置新增值
    return;
  }

  findMedian(): number {
    const dLen = this._data_stream.length;
    const mid = dLen >> 1; // 位运算提高速度
    // 这个只需对排序数组基于长度获取中位数的索引，计算即可
    if (dLen % 2 == 1) return this._data_stream[mid];
    else return (this._data_stream[mid] + this._data_stream[mid - 1]) / 2;
  }
}