// 最朴素的疯狂遍历
function maxRepeating(sequence: string, word: string): number {
    // 直接基于word拆分主串，看能拆分多少，只能判断有多少个子串，无法找最长
    // return sequence.split(word).length - 1;
    let maxCnt = Number.MIN_SAFE_INTEGER;
    let cnt: number;
    let sLen = sequence.length;
    let wLen = word.length;
    for(let i = 0;i<sLen;i++){
        // 有字符匹配时开始计数
        if(sequence[i] == word[0]){
            cnt = 0;
            let breakFlg = false;
            for(let i2 = i;i2<sLen;i2++){
                // 同步转移索引来判断匹配
                for(let j = 0;j<wLen;j++,i2++){
                    if(sequence[i2] != word[j]) breakFlg = true;
                }
                // 顺利完成一轮比较则继续向后，注意调整i2
                i2--;
                if(breakFlg) break;
                else cnt++;
            }
            if(cnt > maxCnt) maxCnt = cnt;
        }
    }
    // 注意处理无最大值的情况
    return maxCnt > 0 ? maxCnt : 0;
};