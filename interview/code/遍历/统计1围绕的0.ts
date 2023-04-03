// 计算矩阵中元素为0的上下左右四个方向是否有1存在，每个方向只要存在1，这个元素0的得分就+1，计算矩阵中所有元素0的得分之和。
// 注意是方向，而不是附近

// 输入：
// 2 4
// 0 1 0 0
// 1 0 1 1
// 输出：
// 9

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
    let [m,n] = (await readline()).split(' ').map(Number);
    const grid = Array(m);
    for(let i = 0;i<m;i++){
      grid[i] = (await readline()).split(' ').map(Number);
    }
    console.log(grid);
    // 统计0的四个方向的1的数量
    function find0With1(): number{
      // 相当于对于一个1，需要将它上下左右的所有0的分数+1，还不能和别人重复
      // 每个位置的元素使用一个1*4数组保存情况，但是容易占据空间太多

      // 调整方案1：不用数组，而是统计4次，即每一次分别记录在某个方向上有1出现的0的数量
      // 最后加起来
      // 其实只需统计某个位置四个方向的情况即可，然后一次二重便利解决

      // 调整方案2：使用两个1*m的数组和两个1*n的数组，分别统计上下左右第一个出现的1的位置
      // 在搭建grid的时候便可进行位置的判断
      // 然后只需遍历一次，遇到0时判断他的位置是否和第一次出现的1匹配，如果还没到则不加分，到了则根据数量加分
      
    }
})();