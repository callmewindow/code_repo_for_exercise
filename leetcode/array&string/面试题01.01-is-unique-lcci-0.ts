// 基础集合实现版
function isUnique(astr: string): boolean {
    // 利用集合存储字符
    let chSet = new Set();
    for(let ch of astr){
        if(chSet.has(ch)) return false;
        chSet.add(ch);
    }
    return true;
};
// 数组实现版
function isUnique_arr(astr: string): boolean {
    // 转化为数组进而判断字符与临近的关系
    let strArray = astr.split('').sort();
    let strLen = strArray.length - 1;
    for(let i = 0;i<strLen;i++){
        if(strArray[i] == strArray[i+1]) return false;
    }
    return true;
};