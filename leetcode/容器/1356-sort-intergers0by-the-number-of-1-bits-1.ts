// 调整为位运算，优化代码
function sumOfOne(num: number): number {
    // 统计转为二进制时的1的数量
    let cnt: number = 0;
    while(num){
        // 和自己-1做和可一次剔除一个1
        num &= num - 1;
        cnt++;
    }
    return cnt;
}
function sortByBits(arr: number[]): number[] {
    let sum_num_map = new Map();
    // 建立1数量的对应集合
    for(let num of arr) sum_num_map.set(num,sumOfOne(num));
    arr.sort(
        function(f,b){
            // 1数量的比较，数量小的在前
            let com_one = sum_num_map.get(f) - sum_num_map.get(b);
            // 1数量不同按1数量排序，否则按大小
            return com_one != 0 ? com_one: f - b;
        }
    )
    return arr
};