// https://leetcode.cn/problems/design-memory-allocator/
// 基础模拟，数组记录情况，map记录id对应的空间
class Allocator {
  private mem: number[];
  private memMap: Map<number, Array<number>>; // 记录块对应的内存位置
  private memPos: number; // 记录可以被分配的最靠前的脚标
  private maxSize: number;

  constructor(n: number) {
    // 使用一个数组记录
    this.maxSize = n;
    this.mem = Array(n).fill(0);
    this.memMap = new Map();
    this.memPos = 0;
  }

  allocate(size: number, mID: number): number {
    // 首先看有没有空余的，只需看memPos的位置和连续空闲的长度
    // 但要注意，有可能有多个连续空闲的空间，因此需要多次寻找，找到第一个符合的再退出
    let freeCnt: number = 0; // 记录连续空闲的内存数量，注意后面要判断，需要初始化
    let allocPos: number; // 记录可被分配的连续内存开始的位置
    let tmpPos = this.memPos;
    while (tmpPos < this.maxSize) {
      if (this.mem[tmpPos] == 0) { // 遇到0的时候开始循环找连续
        allocPos = tmpPos;
        freeCnt = 0;
        while (
          tmpPos < this.maxSize &&
          this.mem[tmpPos] == 0 &&
          freeCnt < size // 防止访问太多无用内存
        ) {
          tmpPos++;
          freeCnt++;
        }
        if (freeCnt == size) break; // 找到数量则返回
      } else tmpPos++; // 否则继续找
    }
    // console.log(mID, size, this.memPos, freeCnt, allocPos, tmpPos);
    if (freeCnt < size) return -1; // 最后还不满足则返回-1
    // 否则开始分配
    if (!this.memMap.has(mID)) this.memMap.set(mID, []);
    let idPos = this.memMap.get(mID); // 记录mID的脚标
    const startPos = allocPos; // 记录当前可分配的起点
    const endPos = startPos + size;
    for (let i = startPos; i < endPos; i++) {
      this.mem[i] = mID; // 非0表示被使用
      idPos.push(i);
    }
    // 当开始脚标等于this.memPos时更新脚标和返回开始脚标
    if (startPos == this.memPos) this.memPos = endPos;
    // console.log(this.mem);
    return startPos;
  }

  free(mID: number): number {
    if (!this.memMap.has(mID)) return 0; // 不存在则返回0
    // 否则就记录mID对应的内存数量，并依次剔除mem中的标记，调整memPos
    let idPos = this.memMap.get(mID);
    // 需要记录当前id内存位置最小的位置
    let minPos = 1111;
    const posN = idPos.length;
    for (let i = 0; i < posN; i++) {
      this.mem[idPos[i]] = 0; // 恢复0
      if (idPos[i] < minPos) minPos = idPos[i];
    }
    // 如果最小位置小于当前可分配内存位置，则更新
    if (minPos < this.memPos) this.memPos = minPos;
    this.memMap.delete(mID); // 注意删除对应的记录
    // console.log(this.mem);
    return posN;
  }
}

/**
 * Your Allocator object will be instantiated and called as such:
 * var obj = new Allocator(n)
 * var param_1 = obj.allocate(size,mID)
 * var param_2 = obj.free(mID)
 */

// 优化上述代码结构
class Allocator_1 {
  private mem: number[];
  private memMap: Map<number, Array<number>>; // 记录块对应的内存位置
  private memPos: number; // 记录可以被分配的最靠前的脚标
  private maxSize: number;

  constructor(n: number) {
    // 使用一个数组记录
    this.maxSize = n;
    this.mem = Array(n).fill(0);
    this.memMap = new Map();
    this.memPos = 0;
  }

  allocate(size: number, mID: number): number {
    // 要注意，有可能有多个连续空闲的空间，因此需要多次寻找，找到符合的即退出
    let freeCnt: number = 0; // 记录连续空闲的内存数量，初始化用于判断
    let allocPos: number; // 记录可被分配的内存开始的位置
    let tmpPos = this.memPos;
    while (tmpPos < this.maxSize) {
      if (this.mem[tmpPos] == 0) { // 遇到0时开始循环找连续
        allocPos = tmpPos, freeCnt = 0;
        while (
          tmpPos < this.maxSize &&
          this.mem[tmpPos] == 0 &&
          freeCnt < size // 数量够即退出，防止无用访问
        ) tmpPos++, freeCnt++;
        if (freeCnt == size) break; // 找到数量则返回
      } else tmpPos++; // 否则继续找
    }
    if (freeCnt < size) return -1; // 最后还不满足则返回-1

    // 否则开始分配
    if (!this.memMap.has(mID)) this.memMap.set(mID, []);
    let idPos = this.memMap.get(mID); // 记录mID的脚标数组

    const startPos = allocPos; // 记录分配内存的起点
    const endPos = startPos + size; // 对应的终点
    for (let i = startPos; i < endPos; i++) {
      this.mem[i] = mID; // 非0表示被使用，等于id更好调试
      idPos.push(i);
    }

    // 当开始脚标等于this.memPos时更新脚标，否则memPos继续是最前面的位置
    if (startPos == this.memPos) this.memPos = endPos;
    return startPos;
  }

  free(mID: number): number {
    if (!this.memMap.has(mID)) return 0; // 不存在则返回0

    // 否则就记录mID对应的内存数量，并依次剔除mem中的标记，调整memPos
    let idPos = this.memMap.get(mID);
    const posN = idPos.length;
    // 记录当前id内存位置最小的位置，用于后续更新
    let minPos = 1111;
    for (let i = 0; i < posN; i++) {
      this.mem[idPos[i]] = 0; // 恢复0
      if (idPos[i] < minPos) minPos = idPos[i]; // 更新最小值
    }

    // 如果最小位置小于当前可分配内存位置，则更新
    if (minPos < this.memPos) this.memPos = minPos;
    this.memMap.delete(mID); // 删除对应的记录

    return posN;
  }
}