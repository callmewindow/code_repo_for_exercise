// 三轮遍历实现判断枚举
function ambiguousCoordinates(s: string): string[] {
    // 在若干的数字中插入0～2个小数点以及1个逗号+空格，判断它的情况
    let stringArr = new Array();
    // 先逗号从1到len-2依次放置，拆分s为0～m-1和m～l-2
    // [left,right)
    let left = 1,right = s.length - 1;
    for(let m = left + 1;m<right;m++){
        let s1 = s.slice(left,m);
        let s2 = s.slice(m,right);
        // 找寻s1和s2增加小数点的可能
        let s1Point = addPoint(s1);
        let s2Point = addPoint(s2);
        // console.log(s1Point,s2Point);
        // 不满足条件则continue
        if(s1Point.length == 0|| s2Point.length == 0) continue;
        // 轮回遍历到输出的字符串数组中
        for(let i1 = 0;i1<s1Point.length;i1++){
            for(let i2 = 0;i2<s2Point.length;i2++){
                stringArr.push('('+s1Point[i1]+", "+s2Point[i2]+')');
            }
        }
    }
    return stringArr;
};

function addPoint(s: string): string[] {
    // [right,right)
    let left = 0,right = s.length;
    let sArrPoint = new Array();
    // 特殊情况处理
    // 开头不是0或长度为1，不加点也符合
    if(s[0] != '0' || s.length == 1) sArrPoint.push(s);
    // 末尾是0，不能有小数点，直接退出
    if(s[right - 1] == '0') return sArrPoint;
    // 开头为0且长度大于1（且末尾不是0），有且只能有一个小数点在第二个位置
    if(right >= 1 && s[0] == '0'){
        sArrPoint.push(+s[0]+'.'+s.slice(1,right));
        return sArrPoint;
    }
    // 此时均符合要求，遍历从1到len-2增加点即可
    for(let m = left + 1;m<right;m++){
        sArrPoint.push(s.slice(left,m)+'.'+s.slice(m,right));
    }
    return sArrPoint;
}

// 调整结构，利用有关函数实现优美的解答
function ambiguousCoordinates(s: string): string[] {
    // 去除左右括号，直接处理数字
    const numStr = s.slice(1, s.length - 1);
    const res = [];
    for (let m = 1; m < numStr.length; m++) { // 1～len-1插入逗号
        // 拆分为一左一右，用AB区分
        const numA = numStr.slice(0, m);
        // 不用带参数直接到结尾
        const numB = numStr.slice(m);
        // 分别可能的字符串组成
        const numAPos = [];
        const numBPos = [];
        
        // 不加小数点的情况
        if (isPossible(numA)) numAPos.push(numA);
        // 小数点从前向后加的情况
        for (let i = 1; i < numA.length; i++) {
            // 利用``将变量和字符直接拼接
            const num = `${numA.slice(0, i)}.${numA.slice(i)}`;
            // 可行则push
            if (isPossible(num)) numAPos.push(num);
        }

        if (isPossible(numB)) numBPos.push(numB);
        for (let i = 1; i < numB.length; i++) {
            const num = `${numB.slice(0, i)}.${numB.slice(i)}`;
            if (isPossible(num)) numBPos.push(num);
        }

        // 只有一行不用加花括号
        for (let iA = 0; iA < numAPos.length; iA++)
            for (let iB = 0; iB < numBPos.length; iB++)
                res.push(`(${numAPos[iA]}, ${numBPos[iB]})`);
    }

    return res;
};

function isPossible(num: string) {
    // 根据题目要求，即此时应该符合情况，即能正常转为num
    // 此时转回string应该不变
    return Number(num).toString() === num;
}