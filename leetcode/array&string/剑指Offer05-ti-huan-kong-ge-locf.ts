// 多种方法
function replaceSpace(s: string): string {
    let newS = '';
    // 循环遍历法
    // for(let ch of s){
    //     if(ch == ' ') newS += "%20";
    //     else newS += ch;
    // }
    // 正则替换法
    // newS = s.replace(/[\s]/g,"%20");
    // 拆分重合法
    // newS = s.split(' ').join("%20");
    // 作弊转url法，百分号会被转成%25，因此无法应对所有情况
    // console.log(encodeURI("%"))
    // if(s == "%20") return s;
    // newS = encodeURI(s);
    return newS;
};