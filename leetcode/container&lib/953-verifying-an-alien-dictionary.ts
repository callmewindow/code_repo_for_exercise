// 搭建新顺序字典，依次判断字符串间的顺序
function checkOrder(s1: string, s2: string, w_o: Map<string,number>): boolean {
    // 两个字符串的长度
    let l1 = s1.length;
    let l2 = s2.length;
    // 记录当前判断的字符排序
    // 因为要存储get的返回值，可能是undifined，因此不能直接number
    let ch_o_1: any, ch_o_2: any;
    // 记录当前索引
    let i: number;
    // 只有当前面相同才会向后走
    for(i = 0;i<l1&&i<l2;i++){
        // 获取两个字符的顺序
        ch_o_1 = w_o.get(s1[i]);
        ch_o_2 = w_o.get(s2[i]);
        // 小于则符合规定
        if(ch_o_1 < ch_o_2) break;
        // 大于则不符合
        if(ch_o_1 > ch_o_2) return false;
        // 如果相等则继续
    }
    // 如果已判断完s2，说明此前全部相等，如果s1长则不符合
    // 没判断完s2就说明是因为符合规定break的
    if(i >= l2 && l1 > l2) return false;
    return true;
}
function isAlienSorted(words: string[], order: string): boolean {
    // 搭建新的字母排序
    let w_order = new Map()
    // 记录顺序
    let o = 0;
    for(let ch of order) w_order.set(ch,o++);
    // 依次检查words是否符合排序
    let w_l = words.length;
    for(let i = 0;i<w_l-1;i++){
        if(!checkOrder(words[i],words[i+1],w_order)){
            return false;
        }
    }
    return true
};