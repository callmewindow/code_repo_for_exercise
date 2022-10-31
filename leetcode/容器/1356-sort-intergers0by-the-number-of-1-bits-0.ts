// 按题意首先统计1的数量，然后利用sort函数分情况判断
function sumOfOne(num: number): number {
    // 统计转为二进制时的1的数量
    let cnt: number = 0;
    while(num != 0){
        cnt += num%2;
        num = Math.floor(num/2);
    }
    return cnt;
}
function sortByBits(arr: number[]): number[] {
    let sum_num_map = new Map();
    for(let num of arr){
        // 建立1数量的对应集合
        sum_num_map.set(num,sumOfOne(num));
    }
    arr.sort(
        function(f,b){
            // 1数量的比较，数量小的在前
            let com_one = sum_num_map.get(f) - sum_num_map.get(b);
            // 大小的比较，数小的在前
            let com_num = f - b;
            // 1数量不同按1数量排序，否则按大小
            return com_one != 0? com_one : com_num;
        }
    )
    return arr
};