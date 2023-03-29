// https://leetcode.cn/problems/container-with-most-water/
// 保留最大的边，尝试获取容量
function maxArea(height: number[]): number {
  // 双指针，移动指针寻找可能的最大值
  let i = 0, j = height.length - 1;
  let maxStore = -1;
  while (i < j) { // 不可能越界，因为一次只动一步
    const storeNow = Math.min(height[i], height[j]) * (j - i);
    if (storeNow > maxStore) maxStore = storeNow;
    // 移动长边时，容器的宽一定变短，高不可能变长，所以一定变短，不能移动长边
    // 移动短边，宽一定变短，高可能变长，所以当一长一短一定移动短边

    // 如果长度相同
    // 无论一边移动后变长变短，容器都一定会缩小，所以不需要考虑，因为移动后仍然可以继续判断长短，所有可能的最大容量都会取到
    if (height[i] > height[j]) j--;
    else i++;
  }
  return maxStore;
};