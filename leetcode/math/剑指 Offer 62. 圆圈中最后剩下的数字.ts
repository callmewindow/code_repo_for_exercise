// https://leetcode.cn/problems/yuan-quan-zhong-zui-hou-sheng-xia-de-shu-zi-lcof/
// 搭建数组，根据删除位置取余找到要删除的索引
function lastRemaining(n: number, m: number): number {
  // 删除的位置，默认从0开始找
  let delI: number = 0;
  let arr = Array(n).fill(0).map((_, i) => i);
  while (arr.length > 1) {
    const len = arr.length;
    // 本次要删除的索引，因此取余后表示的是第几个，需要-1才找到的是脚标
    // console.log(delI);
    delI = (delI + (m - 1) % len) % len;
    // console.log(arr[delI]);
    arr.splice(delI, 1);
    // 因为删除了一个，如果delI不是删除的末尾，delI保持不变就是下一个
    // 如果是末尾，则需要调整为0
    delI %= len - 1;
  }
  return arr[0];
};

// 尝试用set解决，发现题目需要对脚标处理，无法实现
function lastRemaining_1(n: number, m: number): number {
  // 如果m大于n，则应该调整m到小于等于n，节省绕一圈的时间
  // 因为n%n=0，所以要处理一下，先减再恢复，
  // m = (m-1)%n + 1; // 得到的便是1～n
  // 但是不能这样，因为m在后面面对的不一定是n，所以m不能动
  // 删除的数，默认从0开始找
  let delI: number = 0;
  let set = new Set(Array(n).fill(0).map((_, i) => i + 1)); // 保存0到n-1
  // console.log(set,set.values(),set.keys()); // set的key和value都是自己
  let i = 5;
  while (i > 1) {
    const len = set.size;
    // 本次要删除的数，取余后表示的是第几个，需要-1才是对应的数，因为需要0～n-1
    // console.log(delI,len);
    delI = (delI + (m - 1) % len) % len;
    // console.log(delI);
    set.delete(delI)
    // 因为删除了一个，如果delI不是删除的末尾，delI保持不变就是下一个
    // 如果是末尾，则需要调整为0
    delI %= len - 1;
    i = i - 1;
  }
  return set[0];
};

// 