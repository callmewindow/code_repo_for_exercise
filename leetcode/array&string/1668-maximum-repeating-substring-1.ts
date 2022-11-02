// 简单题简单做，直接判断重复字符串是否存在于s中
function maxRepeating_1(sequence: string, word: string): number {
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