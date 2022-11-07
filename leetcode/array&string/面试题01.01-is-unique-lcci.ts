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
function isUnique(astr: string): boolean {
    // 转化为数组进而判断字符与临近的关系
    let strArray = astr.split('').sort();
    let strLen = strArray.length - 1;
    for(let i = 0;i<strLen;i++){
        if(strArray[i] == strArray[i+1]) return false;
    }
    return true;
};

// 位运算利用数字判断字符是否出现
function isUnique(astr: string): boolean {
    // 通过字符和a的关系，利用一个数来存储字符是否出现过
    let strAppear = 0;
    // 记录移位的长度
    let moveDis = 0;
    let aCode = 'a'.charCodeAt(0);
    for(let ch of astr){
        moveDis = ch.charCodeAt(0) - aCode;
        // 判断该位置是否已经出现过字符
        // 因为不确定是第几位，因此不一定等于1，直接判断是否为0，为0才是没出现过
        if((strAppear & (1 << moveDis)) != 0){
            return false;
        }else{
            // 或可以使对应位置0变1
            strAppear |= (1 << moveDis);
        }
    }
    return true;
};