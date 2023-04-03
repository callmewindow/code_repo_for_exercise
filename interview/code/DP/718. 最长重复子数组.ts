// https://leetcode.cn/problems/maximum-length-of-repeated-subarray/
// 连续才相加
function findLength(nums1: number[], nums2: number[]): number {
  const n1 = nums1.length, n2 = nums2.length;
  // 多一味处理初始情况，即i-1和j-1
    const dp = Array(n1+1).fill(0).map(()=>Array(n2+1).fill(0));
    let maxLen = -1;
    for(let i = 1;i<=n1;i++){
        const num1 = nums1[i-1];
        for(let j = 1;j<=n2;j++){
            const num2 = nums2[j-1];
            // 因为子数组需要连续，需要判断关系，只有相等才延伸
            if(num1 == num2){
              dp[i][j] = dp[i-1][j-1] + 1;
              maxLen = maxLen < dp[i][j] ? dp[i][j] : maxLen;
            }
        }
    }
    return maxLen == -1 ? 0 : maxLen;
};