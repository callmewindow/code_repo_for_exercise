function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
    // 用map来存储数和更大数的匹配，可以节省效率
    let num_map = new Map();
    let nums1_bigger: number[] = new Array(nums1.length)
    let nums2_help: number[] = [];
    let l_h: number;
    for(let i_2 = nums2.length-1;i_2>=0;i_2--){
        // 倒序遍历
        while(nums2_help.length > 0 && nums2[i_2] >= nums2_help[nums2_help.length -1]){
            nums2_help.pop();
        }
        let l_h = nums2_help.length
        // 简单的if和else其实可以再优化为三元式
        num_map.set(nums2[i_2], l_h == 0 ? -1 : nums2_help[l_h - 1])
        nums2_help.push(nums2[i_2])
    }
    // 这种有规律的基于某个值的赋值也可以利用map优化
    nums1.every((n_1,i_1,nums1)=>{
        nums1_bigger[i_1] = num_map.get(n_1)
        return true;
    })
    return nums1_bigger
};