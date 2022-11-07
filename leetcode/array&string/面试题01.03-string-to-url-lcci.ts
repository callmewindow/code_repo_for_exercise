// 原始的遍历处理
function replaceSpaces(S: string, length: number): string {
    // 相当于s长度已知，因此可能存在干扰的空格在最后
    // 需要注意遍历的范围
    let newS: string = "";
    for(let i = 0;i<length;i++){
        if(S[i] == " ") newS += "%20";
        else newS += S[i];
    }
    return newS;
};

// 正则表达式替换
function replaceSpaces(S: string, length: number): string {
    // 利用正则匹配将空格进行替换
    // \s即空格，第二个控制返回值，当i超过length则说明不应该替换
    return S.replace(/\s/g, (s, i) => (i >= length ? "" : "%20"));
};