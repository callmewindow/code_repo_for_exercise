function find(N, L) {
  // 首先找连续数组：n(n+1)/2，两个n之差即可得到一个连续数组
  // 基于L和N预计算
  // 提前计算有可能连续数组和等于N的大于等于L长的最右侧值
  // 最小0到L-1
  let maxRight = L - 1;
  let inter = maxRight * (maxRight + 1) - (maxRight - L) * (maxRight - L + 1);
  while (inter <= 2 * N) {
    maxRight++;
    inter = maxRight * (maxRight + 1) - (maxRight - L) * (maxRight - L + 1);
  }
  // 结束时恰好inter会大于2*N
  // console.log(maxRight);
  let minNums = maxRight + 1; // 超过最大情况
  let minLeft = 0;
  // 如果单纯收缩，可能会错过一些情况，因此需要双层循环
  // 这里是L-1，因为也可以从0开始计算数字综合
  let minus = 0;
  for (let right = maxRight; right >= L - 1; right--) {
    // 最短L长，所以从-L开始
    // 根据题意，超出100也不行，因此注意判断条件
    for (let left = right - L; left >= -1 && left >= (right - 101); left--) {
      // 首先看长度能否在已经找到符合的情况下小于minNums，不能则直接继续
      if (minNums < maxRight + 1 && right - left >= minNums) continue;
      // 乘法可能溢出，除以2也会溢出
      // minus = 0;
      // minus += right % 2 === 0 ? (right/2)*(right + 1) : ((right+1)/2)*right;
      // minus -= left % 2 === 0 ? (left/2)*(left+1) : ((left+1)/2)*left;
      // const minus = right * (right + 1) - left * (left + 1);
      // 通过循环来计数
      minus = 0;
      for (let num = left + 1; num <= right; num++) minus += num;
      // console.log(left, right ,minus, N);
      if (minus === N) {
        console.log(minus, N, right, left);
        // 避免使用除法
        if (right - left < minNums) {
          // 更小则更新
          minNums = right - left;
          minLeft = left;
        }
        // 后续只会变大，break
        break;
      } else {
        // 太大则break，后续只会更大
        if (minus > N) break;
      }
    }
    // 如果此时minNums已经是L了，则后续不会有更小，直接break
    if (minNums === L) break;
  }

  // 根据情况输出
  if (minNums === maxRight + 1) return "No";
  // console.log(minNums, minLeft);
  // fill了才能修改
  const res = Array(minNums).fill(0).map((v, i) => i + minLeft + 1);
  // console.log(res);
  return res.join(" ");
}

// console.log(find(18,2));
// console.log(find(4950,100));
// console.log(find(4956655,10));
// console.log(find(69564669,12));
// console.log(find(1000000000,2));
// console.log(find(30,13));
// console.log(find(20,3));

// 之前的代码面对大数无法处理，因为思路错了，应该用数学思想
function newFind(N, L) {
  // 最后得到的连续数组和一定满足这个特点：长度*平均数 = N
  // 则如果长度为偶数，那么N/len然后取整左右延伸即可
  // 如果长度为奇数，则N/len直接尝试左右延伸即可

  // 只需要看取整之后延伸，何时等于自己
  // 最多100个长度
  while (L <= 100) {
    const ave = Math.floor(N / L);
    // 偶数时ave的脚标为L/2 - 1，总和为(ave+0.5)*len
    // 奇数时ave的脚标为(L+1)/2 - 1，总和即L*ave
    // 注意先判断此时连续数的第一位是否为非负数
    const first = L % 2 === 0 ? ave - (L / 2 - 1) : ave - ((L + 1) / 2 - 1);
    // console.log(first);
    if (first < 0) break; // 已经小于了，后续只会更小
    const sum = L % 2 === 0 ? L * (ave + 0.5) : L * ave;
    // console.log(L, ave, sum);
    // 从小到大延伸，因此找到便可直接返回
    if (sum === N) {
      // 基于ave搭建数组
      const res = new Array(L).fill(0).map((v, i) => {
        // 基于i看当前位置多少
        return L % 2 === 0 ? ave + (i - (L / 2 - 1)) : ave + (i - ((L + 1) / 2 - 1));
      })
      // console.log(res);
      return res.join(' ');
    }
    L++;
  }
  return 'No';
}

console.log(newFind(18,2));
console.log(newFind(30,12));
// console.log(newFind(4950,100));
// console.log(newFind(4956655,10));
// console.log(newFind(69564669,12));
// console.log(newFind(1000000000,2));