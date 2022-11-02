// 基础的字典统计数量判断
function canPermutePalindrome(s: string): boolean {
    // 若要回文只需最多只有一个字符出现的次数为奇数
    // 因此map统计次数
    let chMap = new Map();
    for(let ch of s){
        let chNum = chMap.get(ch)
        if(chNum == undefined) chMap.set(ch, 1);
        else chMap.set(ch,chNum + 1);
    }
    let chCnt = chMap.values();
    // 记录是否有奇数字符出现
    let oddCnt = 0;
    for(let cnt of chCnt){
        if(cnt % 2 == 1){
            // 如果有多个奇数则不可能回文
            if(oddCnt == 1) return false;
            else oddCnt = 1;
        }
    }
    return true;
};