// 特殊的一次循环方式，利用了第一次遇到某个字符，和最后一定是0的情况进行处理
function isAnagram(s: string, t: string): boolean {
    let s_l = s.length;
    let t_l = t.length;
    // 长度特判
    if(s_l != t_l) return false;
    // 统计数量，因为字母可以转为数字，因此没必要map
    const word_map = new Array(26).fill(0);
    // 基于字符串的遍历方法，不用转格式
    let a_code = 'a'.codePointAt(0);
    // 使用cnt来记录相差的次数
    // 因为如果二者字符次数均相同则对字符串中的每一个字符的肯定会针对0进行操作
    // 即一共会对0操作字符串长度次
    let cnt = 0;
    for (let i = 0; i < s_l; i++) {
        if(++word_map[s.codePointAt(i) - a_code] > 0){
            cnt++;
        }
        if(--word_map[t.codePointAt(i) - a_code] < 0){
            cnt++;
        }
    }
    return cnt == s_l;
};