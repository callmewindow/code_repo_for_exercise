// https://leetcode.cn/problems/soup-servings/
// 普通递归，800就超时了，离谱
function getServeRes(a: number, b: number): number[][] {
  // 四种情况，按顺序1～4：a先0，b先0，ab同时0，ab都还剩，因为不确定需要分配几次才能确保ab都空，所以不能直接初始化所有
  // dp除了记录情况，还需要记录此时nA和nB的量，因此应该是cnt*4*3
  // 记录选择四种方案后的状态，0为情况，1，2位ab的汤
  let pos = Array(4).fill(0)
    .map(() => [0, a, b]);
  // 情况1,因为nB不可能为0，也不会减少，所以只要a分完就是情况1，不是情况4不用管后面的
  if (a <= 100) pos[0][0] = 1;
  else pos[0][0] = 4, pos[0][1] -= 100;
  // 情况2
  if (a <= 75 && b > 25) pos[1][0] = 1;
  else if (a > 75 && b <= 25) pos[1][0] = 2;
  else if (a <= 75 && b <= 25) pos[1][0] = 3;
  else pos[1][0] = 4, pos[1][1] -= 75, pos[1][2] -= 25;
  // 情况3
  if (a <= 50 && b > 50) pos[2][0] = 1;
  else if (a > 50 && b <= 50) pos[2][0] = 2;
  else if (a <= 50 && b <= 50) pos[2][0] = 3;
  else pos[2][0] = 4, pos[2][1] -= 50, pos[2][2] -= 50;
  // 情况4
  if (a <= 25 && b > 75) pos[3][0] = 1;
  else if (a > 25 && b <= 75) pos[3][0] = 2;
  else if (a <= 25 && b <= 75) pos[3][0] = 3;
  else pos[3][0] = 4, pos[3][1] -= 25, pos[3][2] -= 75;
  return pos;
}
function getServeRate(a: number, b: number): number {
  // 需要的概率
  let rate = 0;
  // 获取当前分配的情况分布
  const res = getServeRes(a, b);
  for (let i = 0; i < 4; i++) {
    // 对四种情况的结果分析
    const posI = res[i][0];
    if (posI == 1) rate += 0.25;
    else if (posI == 2) rate += 0; // 其实不需要2，只是反正都要判断4，不如判断2
    else if (posI == 3) rate += 0.125; // 情况3需要0.5
    else rate += 0.25 * getServeRate(res[i][1], res[i][2]); // // 4要继续分配，因此概率需要*1/4
  }
  return rate;
};
function soupServings(n: number): number {
  // 看似麻烦，其实按情况拆分即可
  // 当ab都还剩余时，还需要再次分配，此时概率又会变化
  if (n == 0) return 0.5;
  let a = n, b = n;
  return getServeRate(a, b);
};

// 新增情况判断，进行优化，发现了原因，每多100，函数运行会多4倍
function getServeRes_1(a: number, b: number): number[][] {
  // 四种情况，按顺序1～4：a先0，b先0，ab同时0，ab都还剩，因为不确定需要分配几次才能确保ab都空，所以不能直接初始化所有
  // dp除了记录情况，还需要记录此时nA和nB的量，因此应该是cnt*4*3
  // 记录选择四种方案后的状态，0为情况，1，2位ab的汤
  let pos = Array(4).fill(0)
    .map(() => [0, a, b]);
  // 情况1,因为nB不可能为0，也不会减少，所以只要a分完就是情况1，不是情况4不用管后面的
  if (a <= 100) pos[0][0] = 1;
  else pos[0][0] = 4, pos[0][1] -= 100;
  // 情况2
  if (a <= 75 && b > 25) pos[1][0] = 1;
  else if (a > 75 && b <= 25) pos[1][0] = 2;
  else if (a <= 75 && b <= 25) pos[1][0] = 3;
  else pos[1][0] = 4, pos[1][1] -= 75, pos[1][2] -= 25;
  // 情况3
  if (a <= 50 && b > 50) pos[2][0] = 1;
  else if (a > 50 && b <= 50) pos[2][0] = 2;
  else if (a <= 50 && b <= 50) pos[2][0] = 3;
  else pos[2][0] = 4, pos[2][1] -= 50, pos[2][2] -= 50;
  // 情况4
  if (a <= 25 && b > 75) pos[3][0] = 1;
  else if (a > 25 && b <= 75) pos[3][0] = 2;
  else if (a <= 25 && b <= 75) pos[3][0] = 3;
  else pos[3][0] = 4, pos[3][1] -= 25, pos[3][2] -= 75;
  return pos;
}
const eps = 1e-10;
function getServeRate_1(a: number, b: number, rate: number): number {
  // 本次概率的情况，注意不能直接位运算，会截断
  let newRate = rate / 4;
  // console.log(newRate)
  // 需要的概率
  let res = 0;
  // 获取当前分配的情况分布
  let pos: number[][] = [];
  // 可能分配完的情况，才采取调用函数分析
  if (a <= 100 || b <= 75) {
    pos = getServeRes(a, b);
    for (let i = 0; i < 4; i++) {
      // 对四种情况的结果分析
      const posI = pos[i][0];
      if (posI == 1) res += 1;
      else if (posI == 2) res += 0; // 其实不需要2，只是反正都要判断4，不如判断2
      else if (posI == 3) res += 0.5; // 情况3需要0.5
      // 如果再分配小数位超过10位，则不再计算，因为每次再分都会乘0.25，超过10位已经不会影响小数点后五位了
      else if (newRate > eps) res += getServeRate_1(pos[i][1], pos[i][2], newRate); // // 4要继续分配，因此概率需要*1/4
    }
  } else {
    // 如果大于，则肯定是情况4，直接rate+四个
    if (newRate > eps) {
      res += getServeRate_1(a - 100, b, newRate);
      res += getServeRate_1(a - 75, b - 25, newRate);
      res += getServeRate_1(a - 50, b - 50, newRate);
      res += getServeRate_1(a - 25, b - 75, newRate);
    }
  }
  console.log(res);
  return res * 0.25;
};
function soupServings_1(n: number): number {
  // 看似麻烦，其实按情况拆分即可
  // 当ab都还剩余时，还需要再次分配，此时概率又会变化
  if (n == 0) return 0.5;
  let a = n, b = n;
  return getServeRate_1(a, b, 1);
};

// 比较劣质的动态规划？，不断扩充数组来实现状态的保存
function soupServings_2(n: number): number {
  if (n == 0) return 0.5;
  // 动态规划从头来
  // 将0～100变为0～4，同时只要n变化没有超过25，本质都是一样的，所以n也调整，向上取整
  const cnt = Math.ceil(n / 25);
  // 考虑到量可能很大，每次分配最多分配100，也就是-4，所以每次都需要四行四列保存状态
  let pos = Array(5).fill(0).map(() => Array(5).fill(0)); // 脚标表示a和b的量，值表示此时的概率，所以多了一位
  // 动态规划：保存之前的值，来二次利用
  // 初始化，此时可能重新分配，需要注意
  for (let a = 0; a <= 4; ++a) {
    for (let b = 0; b <= 4; ++b) {
      // 情况1
      if (a <= 4 && b > 0) pos[a][b] += 1;
      else if (a <= 4 && b <= 0) pos[a][b] += 0.5;
      else if (a > 4 && b > 0) pos[a][b] += 0.25 * pos[a - 4][b - 0];
      // 情况2
      if (a <= 3 && b > 1) pos[a][b] += 1;
      else if (a <= 3 && b <= 1) pos[a][b] += 0.5;
      else if (a > 3 && b > 1) pos[a][b] += 0.25 * pos[a - 3][b - 1];
      // 情况3
      if (a <= 2 && b > 2) pos[a][b] += 1;
      else if (a <= 2 && b <= 2) pos[a][b] += 0.5;
      else if (a > 2 && b > 2) pos[a][b] += 0.25 * pos[a - 2][b - 2];
      // 情况4
      if (a <= 1 && b > 3) pos[a][b] += 1;
      else if (a <= 1 && b <= 3) pos[a][b] += 0.5;
      else if (a > 1 && b > 3) pos[a][b] += 0.25 * pos[a - 1][b - 3];
    }
  }
  // 基于1～4的情况，可以计算出5～8的情况，以此类推
  // 计算需要几次处理，以及当前cnt是最后一组中的第几个
  let loopCnt = (cnt - 1) >> 2;
  const index = cnt - (loopCnt << 2);
  // console.log(loopCnt, index);

  let arrLen = pos.length; // 用来扩展数组
  while (loopCnt > 0) {
    arrLen += 4;
    // 根据目前长度来扩增pos
    for (let i = 0; i <= arrLen - 1 - 4; i++) pos[i].push(...[0, 0, 0, 0]);
    for (let i = 0; i < 4; i++) pos.push(Array(arrLen).fill(0));
    // 注意从1开始，因为水平和竖直仍然有需要动态的内容
    for (let a = 1; a <= arrLen - 1; ++a) {
      for (let b = 1; b <= arrLen - 1; ++b) {
        // 重叠部分不用修改，跳过
        if (a <= arrLen - 1 - 4 && b <= arrLen - 1 - 4) continue;
        // 注意，这里也是需要判断倒完情况的，因为动态的时候还需要边界的部分来进行计算，不然会过小
        if (a <= 4 && b > 0) pos[a][b] += 1;
        else if (a > 4 && b > 0) pos[a][b] += 0.25 * pos[a - 4][b - 0];
        if (a <= 3 && b > 1) pos[a][b] += 1;
        else if (a > 3 && b > 1) pos[a][b] += 0.25 * pos[a - 3][b - 1];
        if (a <= 2 && b > 2) pos[a][b] += 1;
        else if (a > 2 && b > 2) pos[a][b] += 0.25 * pos[a - 2][b - 2];
        if (a <= 1 && b > 3) pos[a][b] += 1;
        else if (a > 1 && b > 3) pos[a][b] += 0.25 * pos[a - 1][b - 3];
      }
    }
    // console.log(pos);
    // 取右下角为新的pos，不能取，每部分都有用，因为要处理边界
    // pos = pos.slice(4).map((row) => row.slice(4));
    --loopCnt;
    // 如果还没循环结束，最大的概率就达到了0.99999，则不用再继续了，因为后面也只会是0.99999，达到有效数字了，不退出，内存也不够）
    // 如果循环将要结束，则应该正常退出，因为index不一定是这组最后的一个
    if (loopCnt > 0 && pos[arrLen - 1][arrLen - 1] > 0.99999 * 4) return 0.99999;
  }
  // 结束时pos的最后一块的index即需要的值，又pos已经多了一行，所以应该len-1-4+index即可（len-1才是脚标，len-1-4即最后一组）
  return pos[arrLen - 1 - 4 + index][arrLen - 1 - 4 + index] * 0.25;
};

// 优化动态规划代码，直接全部结合起来
const maxP = 0.9999 * 4; // 用来判断的最大值退出标记
function soupServings_3(n: number): number {
  if (n == 0) return 0.5;
  // 动态规划从头来
  // 将0～100变为0～4，同时只要n变化没有超过25，本质都是一样的，所以n也调整，向上取整
  const cnt = Math.ceil(n / 25);
  // 考虑到量可能很大，每次分配最多分配100，也就是-4，所以每次都需要四行四列保存状态
  let pos: number[][] = [[2]] // 脚标表示a和b的量，值表示此时的概率，所以多了一位用2来表示（最后会乘0.25）
  // 动态规划：保存之前的值，来二次利用，基于1～4的情况，可以计算出5～8的情况，以此类推
  // 计算需要几次处理，以及当前cnt是最后一组中的第几个
  let loopCnt = 1 + ((cnt - 1) >> 2);
  const index = cnt - ((loopCnt - 1) << 2);
  // console.log(loopCnt, index);

  let arrLen = pos.length; // 用来扩展数组
  while (loopCnt > 0) {
    arrLen += 4;
    // 根据目前长度来扩增pos
    for (let i = 0; i <= arrLen - 1 - 4; i++) pos[i].push(...[0, 0, 0, 0]);
    for (let i = 0; i < 4; i++) pos.push(Array(arrLen).fill(0));
    // 注意从1开始，水平和竖直一直有需要动态的内容
    for (let a = 1; a <= arrLen - 1; ++a) {
      for (let b = 1; b <= arrLen - 1; ++b) {
        // 重叠部分不用修改，跳过
        if (a <= arrLen - 1 - 4 && b <= arrLen - 1 - 4) continue;
        // 注意，这里也是需要判断倒完情况的，因为动态的时候还需要边界的部分来进行计算，不然会过小
        // 分法1
        if (a <= 4 && b > 0) pos[a][b] += 1; // 情况1
        else if (a > 4 && b > 0) pos[a][b] += 0.25 * pos[a - 4][b - 0]; // 情况4
        else if (a <= 4 && b <= 0) pos[a][b] += 0.5; // 情况2，情况2出现的少，只有前四个有，所以放在最后一个判断
        // 分法2
        if (a <= 3 && b > 1) pos[a][b] += 1;
        else if (a > 3 && b > 1) pos[a][b] += 0.25 * pos[a - 3][b - 1];
        else if (a <= 3 && b <= 1) pos[a][b] += 0.5;
        // 分法3
        if (a <= 2 && b > 2) pos[a][b] += 1;
        else if (a > 2 && b > 2) pos[a][b] += 0.25 * pos[a - 2][b - 2];
        else if (a <= 2 && b <= 2) pos[a][b] += 0.5;
        // 分法4
        if (a <= 1 && b > 3) pos[a][b] += 1;
        else if (a > 1 && b > 3) pos[a][b] += 0.25 * pos[a - 1][b - 3];
        else if (a <= 1 && b <= 3) pos[a][b] += 0.5;
      }
    }
    // console.log(pos);
    // 取右下角为新的pos，不能取，每部分都有用，因为要处理边界
    // pos = pos.slice(4).map((row) => row.slice(4));
    --loopCnt;
    // 如果还没循环结束，最大的概率就达到了0.99999，则不用再继续了，因为后面也只会是0.99999，达到有效数字了，不退出，内存也不够）
    // 如果循环将要结束，则应该正常退出，因为index不一定是这组最后的一个
    if (loopCnt > 0 && pos[arrLen - 1][arrLen - 1] > maxP) return 0.99999;
  }
  // 结束时pos的最后一块的index即需要的值，又pos已经多了一行，所以应该len-1-4+index即可（len-1才是脚标，len-1-4即最后一组）
  return pos[arrLen - 1 - 4 + index][arrLen - 1 - 4 + index] * 0.25;
};