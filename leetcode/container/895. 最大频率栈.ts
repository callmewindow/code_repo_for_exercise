// https://leetcode.cn/problems/maximum-frequency-stack/
// 遍历找最大频率超时
class FreqStack {
  private nums: number[];
  private maxNum: number;
  private map: Map<number, number>; // 记录值的计数和最后一个出现的位置
  // 注意如果纪录最后一个出现的位置，那就意味着全都需要修改，所以废弃
  constructor() {
    this.nums = [];
    this.maxNum = -1;
    this.map = new Map();
    this.map.set(-1,-1);
  }

  push(val: number): void {
    this.nums.push(val);
    let valCnt = this.map.get(val);
    this.map.set(val, valCnt == undefined ? 1 : valCnt + 1);
    // 更新最大值
    const maxN = this.map.get(this.maxNum), valN = this.map.get(val)
    if(maxN < valN || maxN == valN) this.maxNum = val; // 次数大或者相同一定是val，因为相同的pop最后的
  }

  pop(): number {
    // pop频率最高的值
    // 先看是不是最高频率是1
    // console.log(this.maxNum);
    let maxCnt = this.map.get(this.maxNum);
    if(maxCnt == 1){
      // 只有一就pop最后一个，并删除map中对应的
      let res = this.nums.pop();
      this.map.delete(res);
      // console.log(this.nums, this.map);
      // 如果还有值就让max等于此时的最后一个，否则初始化max
      if(this.nums.length > 0) this.maxNum = this.nums[this.nums.length - 1];
      else this.maxNum = -1;
      return res;
    }
    // 如果不是只有一个就返回这个值并删除最后的这个元素
    let res = this.maxNum;
    let resN = this.map.get(this.maxNum)
    let resI  = this.nums.lastIndexOf(res);
    this.nums.splice(resI,1); // 删除
    // 更新max的值
    this.map.set(res, resN - 1);
    // 然后循环找maxNum最大且脚标靠后的值
    let maxN = this.map.get(this.maxNum), maxI = this.nums.lastIndexOf(this.maxNum);
    for(let num of this.map.entries()){
      const numI = this.nums.lastIndexOf(num[0]);
      // num是key和value组成的结构，0是key：num，1是value：cnt和i
      if(num[1] > maxN || (num[1] == maxN && numI > maxI)){
        this.maxNum = num[0];
        maxN = this.map.get(this.maxNum), maxI = this.nums.lastIndexOf(this.maxNum)
      }
    }
    return res;
  }
}

/**
 * Your FreqStack object will be instantiated and called as such:
 * var obj = new FreqStack()
 * obj.push(val)
 * var param_2 = obj.pop()
 */

// 没想到最后是原本的频率当作键的方法对了，可以节省查找时间
// 用数组实现有点臃肿，所以直接map
class FreqStack_1 {
  private freq: Map<number, number>;
  private freqGroup: Map<number, number[]>;
  private maxFreq: number;

  constructor() {
    this.freq = new Map();
    this.freqGroup = new Map();
    this.maxFreq = 0;
  }

  push(val: number): void {
    let valFreq = (this.freq.get(val) || 0) + 1; // 直接获取新的频率
    this.freq.set(val, valFreq);
    if (!this.freqGroup.has(valFreq)) this.freqGroup.set(valFreq, []);
    // 将该值加入freq的最后，因为push是按顺序的，所以直接push，val就一定是freq中脚标最靠后的
    this.freqGroup.get(valFreq).push(val);
    // 这里注意，每次push都会把数放在对应位置，group中都临时的数和脚标，仅用来表示当前频率下各数的push顺序
    this.maxFreq = this.maxFreq < valFreq ? valFreq : this.maxFreq; // 更新最大
  }

  pop(): number {
    // 获取频率最大的元素组
    let freqG = this.freqGroup.get(this.maxFreq);
    const val = freqG[freqG.length - 1]; // 获取最后一个元素
    this.freq.set(val, this.freq.get(val) - 1); // 减少次数
    freqG.pop(); // 这里freqG是引用，所以直接pop就会剔除掉对应的值
    // 如果剔除后没有元素了，则降低频率，因为一个数肯定从1递增到freq，所以减后一定能找到
    if (freqG.length === 0) this.maxFreq--;
    return val;
  }
}