// 正则表达式替换
function replaceSpaces(S: string, length: number): string {
    // 利用正则匹配将空格进行替换
    // \s即空格，第二个控制返回值，当i超过length则说明不应该替换
    return S.replace(/\s/g, (s, i) => (i >= length ? "" : "%20"));
};