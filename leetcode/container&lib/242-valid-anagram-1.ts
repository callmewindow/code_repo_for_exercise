// 采用统计次数的方式，两次遍历实现
function isAnagram(s: string, t: string): boolean {
    let s_l = s.length;
    let t_l = t.length;
    // 长度特判
    if(s_l != t_l) return false;
    // 统计数量，因为字母可以转为数字，因此没必要map
    const word_map = new Array(26).fill(0);
    // 基于字符串的遍历方法，不用转格式
    let a_code = 'a'.codePointAt(0);
    for (let i = 0; i < s_l; i++) {
        word_map[s.codePointAt(i) - a_code]++;
    }
    for (let i = 0; i < t_l; i++) {
        // 判断减后是否小于0
        if (--word_map[t.codePointAt(i) - a_code] < 0) {
            return false;
        }
    }
    return true;
};