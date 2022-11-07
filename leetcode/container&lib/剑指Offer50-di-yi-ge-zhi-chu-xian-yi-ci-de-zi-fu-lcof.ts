// map最原始两次遍历解决问题，非常慢
function firstUniqChar(s: string): string {
    // 比较朴素的方法：map记录出现的次数，然后遍历，这样需要两次遍历，但肯定可以解决
    // 排序判断：先排序然后判断当前元素和前后元素的关系，当都不相同就是他，比两次遍历少一些，但无法满足找第一个的条件
    // 一次遍历但不太行的方法：用位运算异或，将字符转为acsii码，然后和0异或，但是只能应对出现偶数次的情况，同样无法满足找第一个的情况
    // 暂时用map解决
    let chMap = new Map();
    // let sArr = s.split('').sort();
    let sL = s.length;
    for(let i = 0;i<sL;i++){
        if(!chMap.has(s[i])) chMap.set(s[i],0);
        else chMap.set(s[i],chMap.get(s[i]) + 1);
    }
    let mapKey = chMap.keys();
    // console.log(mapKey);
    for(let key of mapKey){
        if(chMap.get(key) == 0){
            return key;
        }
    }
    return ' ';
};

// map+queue优化
function firstUniqChar(s: string): string {
    // 用map结合队列解决
    // 尽量不使用高级数据结构，但这里没说字符类型，因此不太好用数组替代，还是map
    let chMap = new Map();
    // 数组当队列用
    let chQ = [];
    let sL = s.length;
    // 这里遍历可以用Array.from(s).entries()，可以同时获取角标和元素，更加便捷
    for(let i = 0;i<sL;i++){
        if(!chMap.has(s[i])){
            chMap.set(s[i],1);
            // 第一次出现放在chQ中
            chQ.push(s[i]);
        }else{
            // 这里直接设为-1即可，因为只要出现两次就没用了
            chMap.set(s[i],-1);
            // 只有在这里才可能出现重复字符，因此在这里处理queue即可
            // 直接判断头部，-1则说明头部字符不是仅出现一次的字符
            while(chQ.length > 0 && chMap.get(chQ[0]) == -1){
                chQ.shift()
            }
        }
    }
    // 队列先进先出，所以第一个一定就是第一个仅出现一次的字符，如果存在则直接输出
    return chQ.length >= 1? chQ[0] : ' ';
};