// 在n个元素的数组中选择k个元素，每个元素要么乘以2，要么除以2并向下取整，使得操作完后数组的极差尽可能小，并且输出极差。极差为最大值减去最小值。
// 第一行输入整数n和k。第二行输入n个整数表示数组。

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
    let line = await readline();
    
})();