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