// https://leetcode.cn/problems/diao-zheng-shu-zu-shun-xu-shi-qi-shu-wei-yu-ou-shu-qian-mian-lcof/
// sort自定义直接实现
function exchange(nums: number[]): number[] {
  // 自定义排序算法，先来个作弊的
  return nums.sort(
    (b, f) => {
      // 奇数就在前
      return f % 2 == 1 ? 1 : -1;
    }
  )
};