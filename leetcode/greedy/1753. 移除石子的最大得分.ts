// https://leetcode.cn/problems/maximum-score-from-removing-stones/
// 贪心优先处理最大的，找规律返回
function maximumScore(a: number, b: number, c: number): number {
  // 为了尽可能多的取石子，每次都应该取一个少的和最多的，当最少的取完了再取第二少
  // 按顺序是min,mid,max，如果min+mid<=max，此时每次都取max，最大即min+mid
  // 如果min+mid>max
  // 此时会一直取max，但因为不够，所以在max取完前会优先找更多石子的，取完max后再加上min和mid中更少的那个就是次数
  // 对于min和mid中更小的，其实直接把取之后的min+mid除以2就是值，因此此时min和mid要么相等要么相差1（因为max大于mid和min，也因此max一定大于mid-min，一定会让mid和min要么相等要么相差1）
  // 最后对情况2列公式求一下结果，最终结果为：min+mid+max/2
  // 直接找出三个值然后返回即可
  let [min, mid, max] = [a, b, c].sort((b, f) => b - f);
  // console.log(min, mid, max);
  // 注意向下取整
  return (min + mid) <= max ? min + mid : Math.floor((min + mid + max) / 2);
};