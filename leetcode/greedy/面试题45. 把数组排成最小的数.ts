// https://leetcode.cn/problems/ba-shu-zu-pai-cheng-zui-xiao-de-shu-lcof/
// 自定义变形的字典序，比较大小找出作为数字一部分时最小的在前面
// 和字典序类似但不是完全的字典序
function checkOrder(b: number, f: number): number {
  // 先转为字符串
  let bS = String(b), fS = String(f);

  let [short, long] = bS.length > fS.length ? [fS.length, bS.length] : [bS.length, fS.length]; // 长短字符串长度
  let shortS: string = bS.length > fS.length ? 'f' : 'b'; // 判断谁短

  let bCh: string, fCh: string, pre: string = 'n'; // 比较的字符和前一个字符
  let head: string = bS[0] == fS[0] ? bS[0] : 'n'; // 相同时的首位，n为不想等时的临时头部

  let needChange: boolean = false; // 是否需要换顺序
  for (let i = 0; i < long; i++) {
    // 没超出用对应位置判断，超出了用head替换
    bCh = i >= short && shortS == 'b' ? head : bS[i];
    fCh = i >= short && shortS == 'f' ? head : fS[i];
    if (bCh != fCh) { // 不相等时直接比较退出
      if (bCh < fCh) needChange = true; // 后更小，不满足，要换
      break;
    } else { // 相等时需要根据是否超过短的来进行处理
      if (i < short) pre = bCh; // 小于则肯定相等，随便等于一个继续
      else {
        // 否则此时说明是临时借住的head在判断，还需要需要判断pre和长的当前位，才能知道谁大谁小
        const tmp = shortS == 'b' ? fCh : bCh; // 找长的字符串的元素来比较
        if (tmp != pre) {
          // 不想等则要退出
          if (pre < tmp && shortS == 'b') needChange = true; // 如果pre小，则应该f短（pre是f上的），否则就要改变
          if (pre > tmp && shortS == 'f') needChange = true; // 否则如果pre大，则b短是正常，否则要改变
          break;
        }
        // 相等则不用管
      }
    }
  }
  return needChange ? -1 : 1; // 小于零则要换，否则不换
}
function minNumber(nums: number[]): string {
  // 找最小，所以对比不同数字的优先级，然后调整排序即可
  // 优先级：首位小的在前，首位相同第二位小的在前，相同时没有第二位则用首位比较（这样才能比较谁在前更小，例如8247和824，824会视作8248比较，8247,824比824,8248更小）
  // 而如果用首位比较也相同，则需要用短的前一位来比较，依次类推
  return nums.sort(checkOrder).join('');
};

// 优化bf的判断代码，针对长短字符串判断
function checkOrder_1(b: number, f: number): number {
  // 先转为字符串
  let bS = String(b), fS = String(f);

  // 将b和f变成一长一短来保存
  let [short, long] = bS.length > fS.length ? [fS.length, bS.length] : [bS.length, fS.length]; // 长短字符串长度
  let whoShort: string = bS.length > fS.length ? 'f' : 'b'; // 判断谁短
  let shortS: string, longS: string;
  if (whoShort == 'b') shortS = bS, longS = fS;
  else shortS = fS, longS = bS;

  let sCh: string, lCh: string, pre: string = 'n'; // 比较的字符和前一个字符
  let head: string = bS[0] == fS[0] ? bS[0] : 'n'; // 相同时的首位，n为不想等时的临时头部

  let shortIsLeft: boolean = false; // 短的是在前还是后
  for (let i = 0; i < long; i++) {
    // 没超出用对应位置判断，超出了用head替换
    sCh = i >= short ? head : shortS[i];
    lCh = longS[i];
    if (sCh != lCh) { // 不相等时直接比较退出
      if (sCh < lCh) shortIsLeft = true; // 短的在前
      break;
    } else { // 相等时需要根据是否超过短的来进行处理
      if (i < short) pre = sCh; // 小于则肯定相等，等于一个就继续
      else {
        // 否则此时说明是临时借的head在判断，还需要需要判断pre和长的当前位，才能知道谁大谁小
        // 找长的字符串的元素来比较
        if (lCh != pre) {
          // 不想等则要退出
          if (pre < lCh) shortIsLeft = true; // 如果pre小，则说明短的在前
          // 否则就是短的在后面
          break;
        }
        // 相等则不用管
      }
    }
  }
  // 不更换有两种情况：短的在前，f是短的或者短的在后，b是短的
  return (shortIsLeft && whoShort == 'f') || (!shortIsLeft && whoShort == 'b') ? 1 : -1; // 小于零则要换，否则不换
}
function minNumber_1(nums: number[]): string {
  return nums.sort(checkOrder).join('');
};