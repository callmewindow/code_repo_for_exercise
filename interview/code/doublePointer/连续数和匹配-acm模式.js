const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
    let line = await readline();
    const tokens = line.split(" ");
    // 注意转数字
    const N = Number(tokens[0]),
        L = Number(tokens[1]);
    console.log(newFind(N, L));
    // console.log(newFind(18,2));
})();

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
