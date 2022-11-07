// 二分法寻找旋转数组最小值
function minArray(numbers: number[]): number {
    let left = 0,right = numbers.length - 1;
    let m;
    while(left <= right){
        m = Math.floor((left+right)/2);
        // 大于的时候表示m到right是旋转过来的，需要向左
        // 但是没判断m左边，不确定m是否是需要的，因此不能跳过m，直接m-1
        if(numbers[right] > numbers[m]){
            right = m;
        }else{
            // 小于的时候表示m属于未旋转的部分，所以可以跳过直接选右
            if(numbers[right] < numbers[m]){
                left = m + 1;
            }else{
                // 相等的情况无法判断在左还是右，所以慢慢从右开始缩减范围
                right -= 1;
            }
        }
    }
    // 由循环条件可知，推出循环时left>right，因此选left
    // console.log(left,m,right);
    // console.log(numbers[left],numbers[m],numbers[right],'\n');
    return numbers[left];
};