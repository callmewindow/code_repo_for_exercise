// 使用索引实现本地数组的利用
function findRepeatNumber(nums: number[]): number {
    // 循环将0～n-1的数字放在他们对应的索引上
    let i = 0;
    while(i<nums.length){
        if(nums[i] == i){
            // 位置正确才移动，此时相当于第一次遇到数字i
            i++;
            continue;
        }
        // 如果当前字符又等于自己位置上的字符了，说明第二次遇到，即重复
        if(nums[nums[i]] == nums[i]) return nums[i];
        // 都不相等则把当前字符挪到它所在的索引
        let tmp = nums[nums[i]];
        nums[nums[i]] = nums[i];
        nums[i] = tmp;
    }
    return -1;
};