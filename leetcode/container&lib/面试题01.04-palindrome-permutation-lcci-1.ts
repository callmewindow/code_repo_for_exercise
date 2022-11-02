// 使用正则依次剔除字符，和数组思路类似
function canPermutePalindrome(s: string): boolean {
    // 利用正则替换掉重复字符，最后判断奇数字符数量是否大于1
    let oddCnt = 0;
    while(s.length){
        // 用于判断本次剔除了多少个字符
        let oldLen = s.length;
        // replace需要传入字符串，因此使用slice
        let str = s.slice(0,1);
        // 防止和正则规则重复，进行替换，因为不确定s字符组成
        if(str === '\\')str = '\\\\';
        s = s.replace(new RegExp(str,'g'),'');
        if((oldLen - s.length) % 2 == 1) oddCnt++;
    }
    return oddCnt > 1 ? false : true
};