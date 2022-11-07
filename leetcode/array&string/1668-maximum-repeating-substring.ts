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

// 简单题简单做，直接判断重复字符串是否存在于s中
function maxRepeating(sequence: string, word: string): number {
    // 按题意要求，判断重复字符串是否存在于s中即可
    let cnt = 0;
    let repeatWord = word;
    while(sequence.includes(repeatWord)){
        repeatWord += word;
        cnt++;
    }
    return cnt;
    // 极简优化
    // let cnt = 0;
    // while(sequence.includes(word.repeat(++cnt))){}
    // return cnt - 1;
};

// 简单枚举+动态规划
var maxRepeating = function(sequence, word) {
    const n = sequence.length, m = word.length;
    if (n < m) {
        return 0;
    }

    const f = new Array(n).fill(0);
    for (let i = m - 1; i < n; ++i) {
        let valid = true;
        for (let j = 0; j < m; ++j) {
            if (sequence[i - m + j + 1] !== word[j]) {
                valid = false;
                break;
            }
        }
        if (valid) {
            f[i] = (i === m - 1 ? 0 : f[i - m]) + 1;
        }
    }

    return _.max(f);
};

// KMP+动态规划
var maxRepeating = function(sequence, word) {
    const n = sequence.length, m = word.length;
    if (n < m) {
        return 0;
    }

    const fail = new Array(n).fill(-1);
    for (let i = 1; i < m; ++i) {
        let j = fail[i - 1];
        while (j !== -1 && word[j + 1] !== word[i]) {
            j = fail[j];
        }
        if (word[j + 1] === word[i]) {
            fail[i] = j + 1;
        }
    }

    const f = new Array(n).fill(0);
    let j = -1;
    for (let i = 0; i < n; ++i) {
        while (j !== -1 && word[j + 1] !== sequence[i]) {
            j = fail[j];
        }
        if (word[j + 1] === sequence[i]) {
            ++j;
            if (j === m - 1) {
                f[i] = (i >= m ? f[i - m] : 0) + 1;
                j = fail[j];
            }
        }
    }

    return _.max(f)
};