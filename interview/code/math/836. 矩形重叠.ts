// https://leetcode.cn/problems/rectangle-overlap/
// 分情况判断
function isRectangleOverlap(rec1: number[], rec2: number[]): boolean {
  // 只是重复不可，需要一部分在对方之内
  // 只需判断rec2每个角和rec1四个角关系即可

  // 注意这里判断的是重叠，不一定rec2在1其中才是重叠
  // 1在2也是
  // 即时没有角重合，也可能因为交叉而重叠
  // 例如虽然2的y坐标均被1包含，但2的横坐标超过了1，此时也是重叠
  // 先判断特殊的无角包含重叠
  return checkCross(rec1, rec2) || checkCross(rec2, rec1) ||
    checkIn(rec1, [rec2[0], rec2[1]]) ||
    checkIn(rec1, [rec2[0], rec2[3]]) ||
    checkIn(rec1, [rec2[2], rec2[1]]) ||
    checkIn(rec1, [rec2[2], rec2[3]]) ||
    checkIn(rec2, [rec1[0], rec1[1]]) ||
    checkIn(rec2, [rec1[0], rec1[3]]) ||
    checkIn(rec2, [rec1[2], rec1[1]]) ||
    checkIn(rec2, [rec1[2], rec1[3]]);
};

function checkIn(r: number[], p: number[]): boolean {
  // 判断pos是否在rect中
  return p[0] > r[0] && p[0] < r[2] && p[1] > r[1] && p[1] < r[3];
}

function checkCross(r1: number[], r2: number[]): boolean {
  // 注意此时应该考虑到重合情况，因为是多侧边的判断
  return (r1[0] <= r2[0] && r1[2] >= r2[2] && r1[1] >= r2[1] && r1[3] <= r2[3]) ||
    r1[1] <= r2[1] && r1[3] >= r2[3] && r1[0] >= r2[0] && r1[2] <= r2[2];
}

// 判断是否不重叠，反推
function isRectangleOverlap_1(rec1: number[], rec2: number[]): boolean {
  // 去除线段的情况，因为线段不会有重叠面积
  if (rec1[0] == rec1[2] || rec1[1] == rec1[3] || rec2[0] == rec2[2] || rec2[1] == rec2[3]) {
    return false;
  }
  // 根据1在2的上下左右的情况，得到不重叠的判断，取反即是重叠
  return !(rec1[2] <= rec2[0] ||   // left
    rec1[3] <= rec2[1] ||   // bottom
    rec1[0] >= rec2[2] ||   // right
    rec1[1] >= rec2[3]);    // top
};

// 还有投影方法，直接看x轴和y轴是否有重叠的线段
function isRectangleOverlap_2(rec1: number[], rec2: number[]): boolean {
  return (Math.min(rec1[2], rec2[2]) > Math.max(rec1[0], rec2[0]) &&
  Math.min(rec1[3], rec2[3]) > Math.max(rec1[1], rec2[1]));
}