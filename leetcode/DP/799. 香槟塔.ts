// https://leetcode.cn/problems/champagne-tower/
// 分析题意，了解到底有多少杯，根据留下和溢出的来两侧dp即可，就是看着题长，其实简单
function champagneTower(poured: number, query_row: number, query_glass: number): number {
  // 每个杯子都会在满了之后还接受香槟时给自己左右分别一半
  // 然后下一层的酒会根据上一层两侧的杯子得到，考虑到数组的存储方式，只需基于他们在当前行的顺序即可，即1会给1和2，2会给2和3，诸如此类即可实现

  // 对于dp数组的初始化，考虑到每一行都需要n杯才能倒满，因此行数应满足r*(r+1)/2 >= poured

  // 考虑到n*n数组比较占内存，因此直接声明不行，先声明空的，然后依次将1个酒杯，2个酒杯，，，n个酒杯的数组push进去
  // 也不行，因为最大是1e9，弄一个数组都不行来不及的
  // let glass = Array(row).fill(0)
  //   .map(()=>Array(col).fill(0))

  // 因此需要针对在查询的位置上，根据分析可知，每一个glass都只可能被上一行的两个杯子灌酒，因此只需要声明一个从query开始的数组即可
  // 这一行是glass，上一行就是glass和glass-1，注意要判断边界，然后往上再以此类推，最多需要的一维数组长度为5e8（还是会溢出）
  // let glass: number[][] = [];
  // 直接循环过程便可实现push
  // while(poured>0){
  //   poured -= col;
  //   let glass = Array(col).fill(0);
  //   col++;
  // }

  // 但其实查询的行列都在0～99的范围内，最多就100层，因此只需要处理100行之内的即可，直接初始化一个query_row的正方形即可
  // 行数即数组长度，即col-1（col多了一个++），第几行就有几个酒杯）row==col
  // 先判断有没有满
  const row = query_row + 1; // 真正的行数
  // 这里不能直接基于行数相加来判断能否倒满，因为有部分是会漏下去的，所以直接不用判断，上就完事
  // if (2 * poured >= (row * (row + 1))) return 1;
  // 没满开始dp，题意说明从0开始，因此直接row即可，两个数组分别保存自己装的和多出来的
  let glass = Array(row).fill(0)
    .map(() => Array(row).fill(0)
      .map(() => Array(2).fill(0)));
  // 初始化第一行第一个，如果没满，剩余的会自动是0
  glass[0][0][0] = poured >= 1 ? 1 : poured;
  glass[0][0][1] = poured - glass[0][0][0]; // 这里只有一个方向来，所以可以直接减0
  for (let i = 1; i < row; i++) {
    // 每一行内再看，一行杯子数等于行数+1
    for (let j = 0; j < i + 1; j++) {
      let left = 0;
      // j的酒来自于上一层多的，j-1和j位置
      if (j - 1 >= 0) left += glass[i - 1][j - 1][1] / 2; // 先得到左边的一半
      if (j <= i - 1) left += glass[i - 1][j][1] / 2; // 再得到右边的一半
      // 能装满则留在杯子里的就是原本不满的部分，所以1-原来的，不能装满则都装进去
      const pourIn = left >= 1 ? 1 : left;  // 本来是0，所以不用+0，直接判断即可
      glass[i][j][0] = pourIn;
      glass[i][j][1] = left - pourIn; // 因为合并为了一次计算，所以直接等于即可
    }
    // console.log(glass[i]);
  }
  // query本来就从0开始，是脚标，返回当前装了多少
  return glass[query_row][query_glass][0];
};

// 简化上述代码
function champagneTower_1(poured: number, query_row: number, query_glass: number): number {
  const row = query_row + 1; // 真正的行数
  // 这里不能直接基于行数相加来判断能否倒满，因为有部分是会漏下去的，所以直接不用判断，上就完事
  // if (2 * poured >= (row * (row + 1))) return 1;
  // 两个空间分别保存当前装的和溢出来的
  let glass = Array(row).fill(0)
    .map(() => Array(row).fill(0)
      .map(() => Array(2).fill(0)));
  // 初始化第一行第一个，判断倒进多少和剩多少
  let left = 0;
  left = poured >= 1 ? 1 : poured
  glass[0][0][0] = left, glass[0][0][1] = poured - left;
  for (let i = 1; i < row; i++) {
    // 每一行再看，一行杯子数等于行数+1
    for (let j = 0; j < i + 1; j++) {
      left = 0;
      // j的酒来自于上一层多的，j-1和j位置，判断防止越界
      if (j - 1 >= 0) left += glass[i - 1][j - 1][1] / 2; // 先得到左边的一半
      if (j <= i - 1) left += glass[i - 1][j][1] / 2; // 再得到右边的一半
      const pourIn = left >= 1 ? 1 : left;
      glass[i][j][0] = pourIn, glass[i][j][1] = left - pourIn; // 合并为了一次计算，直接等于即可
    }
    // console.log(glass[i]);
  }
  // query本来就从0开始，是脚标，返回当前装了多少
  return glass[query_row][query_glass][0];
};

// 通过按需创建数组来优化时间空间，减少无用的浪费
function champagneTower_2(poured: number, query_row: number, query_glass: number): number {
  const row = query_row + 1; // 真正的行数
  // 初始化第一行第一个，全部装入
  let before = Array(1).fill(poured);
  for (let i = 1; i < row; i++) {
    // 每一行再看，一行杯子数等于行数+1
    let now = Array(i + 1).fill(0);
    for (let j = 0; j < i + 1; j++) {
      let left = 0;
      // now行j的酒来自before行j-1和j位置，判断防止越界
      if (j - 1 >= 0) left += before[j - 1] > 1 ? before[j - 1] - 1 : 0; // 先得到左边多的
      if (j <= i - 1) left += before[j] > 1 ? before[j] - 1 : 0; // 再得到右边多的
      // 注意除以2才是真正的，不能位运算，因为会截断
      now[j] = left / 2;
    }
    // console.log(now);
    // 这一行成为下一行的上一行
    before = now;
  }
  // 此时before就是query_row这一行，注意判断和1的关系
  return before[query_glass] >= 1 ? 1 : before[query_glass];
};

// 再次优化细节
function champagneTower_3(poured: number, query_row: number, query_glass: number): number {
  const row = query_row + 1; // 真正的行数
  // 初始化第一行第一个，全部装入
  let before = [poured], left: number = 0;
  for (let i = 1; i < row; i++) {
    // 每一行再看，一行杯子数等于行数+1，不初始化，节省时间
    let now = Array(i + 1);
    for (let j = 0; j < i + 1; j++) {
      left = 0; // 重新计算上面溢出的
      // now行j的酒来自before行j-1和j位置，判断防止越界
      if (j - 1 >= 0) left += before[j - 1] > 1 ? before[j - 1] - 1 : 0;
      if (j <= i - 1) left += before[j] > 1 ? before[j] - 1 : 0;
      // 注意除以2才是真正的，不能位运算，因为会截断
      now[j] = left / 2;
    }
    // console.log(now);
    // 这一行成为下一行的上一行
    before = now;
  }
  // 此时before就是query_row这一行，注意判断和1的关系
  return before[query_glass] >= 1 ? 1 : before[query_glass];
};