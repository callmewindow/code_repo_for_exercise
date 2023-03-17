// https://leetcode.cn/problems/pass-the-pillow/
// 判断边界切换方向即可
function passThePillow(n: number, time: number): number {
  // 直接基于time和状态遍历即可
  let type = 0; // 0表示前到后
  let pos = 0; // 从0开始传
  while(time > 0){
    pos = type === 0 ? pos+1: pos - 1;
    if(pos ===n-1) type = 1;
    if(pos === 0) type = 0;
    time--;
  }
  return pos+1; // 返回第几个人
};