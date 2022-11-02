// 朴素的排序判断机制，比较偏离题意？
function isAnagram(s: string, t: string): boolean {
    // 直接排序生成字符数组
    let s_arr = s.split('').sort();
    let t_arr = t.split('').sort();
    // 如果相同即全部相同
    let s_l = s_arr.length;
    let t_l = t_arr.length;
    // 长度不同则肯定不是
    if(s_l != t_l) return false;
    for(let i = 0;i<s_l;i++){
        if(s_arr[i] != t_arr[i]) return false;
    }
    return true;
};