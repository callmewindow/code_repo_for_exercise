// 二分法寻找缺失的点
function missingNumber(nums: number[]): number {
    // 最简单的方法即挨个遍历判断是否等于i，不等于的就是缺失的
    // 比较机智的方法就是利用二分，因为如果n/2之前缺失，中点的值会变大，反之会不变，不会变小
    let l = 0,r = nums.length - 1;
    while(l <= r){
        const m = Math.floor((l+r)/2);
        // 等于表示后面缺
        if(nums[m] == m) l = m + 1;
        else r = m - 1;
    }
    // 最后找到的是一个nums[l]>m的，此时l为对应的值
    // console.log(l,m,r);
    // console.log(nums[l],nums[m],nums[r]);
    // 因此缺失的值就是m本来的值
    return l;
};

// 优化的位运算
function missingNumber(nums: number[]): number {
    // 位运算的两次异或可以将对应的值变为0消失
    // 可通过补齐来实现缺失的数字只有一个，来被异或找出来
    let xor = 0;
    const n = nums.length + 1;
    for (let i = 0; i < n - 1; i++) {
        // 同时异或数字和补齐的
        xor ^= nums[i];
        xor ^= i;
    }
    // 补上一个n - 1
    xor ^= n - 1;
    return xor;
};