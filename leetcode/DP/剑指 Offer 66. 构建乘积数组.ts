// https://leetcode.cn/problems/gou-jian-cheng-ji-shu-zu-lcof/
// 保留前缀后缀乘积，两次遍历
function constructArr(a: number[]): number[] {
  const len = a.length;
  if (len <= 0) return [];
  // 不能用除法，我直接pow(num,-1)（
  // 直接bp即可，每一位不包含自己，所以两侧进行
  let b: number[] = Array(len);
  b[0] = 1; // 初始化第一个元素
  // 先都乘上前面的，因为b不包含i，所以要乘上a
  for (let i = 1; i < len; ++i) b[i] = a[i - 1] * b[i - 1];
  // 此时b[i]是i之前所有元素，不包含自己和后面的乘积
  // 乘后面的乘积，倒数第二位开始
  for (let i = len - 2; i >= 0; --i) {
    // 为了乘后面的乘积，要对a进行合并，确保a[i]是自己和后面乘积之和
    a[i] *= a[i + 1];
    b[i] *= a[i + 1]; // 乘上i之后所有元素的乘积
  }
  return b;
};

// 优化后缀和时的乘积保存
function constructArr_1(a: number[]): number[] {
  const len = a.length;
  if (len <= 0) return [];
  // 不能用除法，我直接pow(num,-1)（
  // 直接bp即可，每一位不包含自己，所以两侧进行
  let b: number[] = Array(len);
  b[0] = 1; // 初始化第一个元素
  // 先都乘上前面的，因为b不包含i，所以要乘上a
  for (let i = 1; i < len; ++i) b[i] = a[i - 1] * b[i - 1];
  // 此时b[i]是i之前所有元素，不包含自己和后面的乘积
  // 用aMul记录从后到前的乘积
  let aMul = a[len-1];
  for (let i = len - 2; i >= 0; --i) {
    b[i] *= aMul; // 乘上i之后所有元素的乘积
    // 为了乘后面的乘积，要对a进行合并，确保a[i]是自己和后面乘积之和
    aMul *= a[i];
  }
  return b;
};