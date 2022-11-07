// 排序判断即可解决
function findTheDifference(s: string, t: string): string {
    // 先都排序
    let s_a = s.split('').sort();
    let t_a = t.split('').sort();
    // 遍历t_a即可找出不同
    let l_t = t_a.length;
    for(let i = 0;i<l_t;i++){
        if(t_a[i] != s_a[i]){
            return t_a[i];
        }
    }
    return '';
};

// 相当于遍历两个字符串，异或更为简洁而且逻辑更清晰
function findTheDifference(s: string, t: string): string {
    // 合并字符串然后直接异或，即可找出只有一个字符的字符
    let s_t = s+t;
    // 异或什么都是对方，自己异或自己会变成0
    let bug = 0;
    for(let c_i of s_t){
        // 注意异或编码
        bug ^= c_i.charCodeAt(0);
    }
    // 转码为对应字符
    return String.fromCharCode(bug);
};