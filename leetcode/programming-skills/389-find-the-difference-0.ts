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