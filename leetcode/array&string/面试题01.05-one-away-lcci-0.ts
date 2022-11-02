// 单纯依次针对情况判断处理
function oneEditAway(first: string, second: string): boolean {
    // 相当于两轮遍历，找出不相同的地方，然后继续遍历看是否有下一个不相同的地方
    let len1 = first.length;
    let len2 = second.length;
    // 长度相差二一定不可能
    if(Math.abs(len1 - len2) > 1) return false;
    for(let i1 = 0;i1<len1;i1++){
        if(first[i1] != second[i1]){
            // 出现不相同的位置，先判断是哪种情况
            if(len1 > len2){
                // first多了或者second少了，跳过first
                i1++;
                for(let i2 = i1 - 1;i2<len2;i1++,i2++){
                    if(first[i1] != second[i2]){
                        // 还有不同则报错
                        return false;
                    }
                }
            }else{
                if(len2 > len1){
                    // first缺了或second多了，跳过second
                    for(let i2 = i1 + 1;i2<len2;i1++,i2++){
                        if(first[i1] != second[i2]){
                            // 还有不同则报错
                            return false;
                        }
                    }
                }else{
                    // 此时需要有一个替换，直接跳过当前循环剩余即可
                    i1++;
                    for(let i2 = i1;i2<len2;i1++,i2++){
                        if(first[i1] != second[i2]){
                            // 还有不同则报错
                            return false;
                        }
                    }
                }
            }
            // 因为在内容中都做了判断，因此长度最后肯定都完美，不用再额外判断
        }
    }
    return true;
};
// 优化结构
function oneEditAway_optimize(first: string, second: string): boolean {
    let len1 = first.length;
    let len2 = second.length;
    if(Math.abs(len1 - len2) > 1) return false;
    for(let i1 = 0,i2 = 0;i1<len1;i1++){
        if(first[i1] != second[i1]){
            if(len1 > len2){
                i2 = i1;
                i1++;
            }else{
                if(len2 > len1){
                    i2 = i1+1;
                }else{
                    i1++;
                    i2 = i1;
                }
            }
            for(;i2<len2;i1++,i2++){
                if(first[i1] != second[i2]) return false;
            }
        }
    }
    return true;
};