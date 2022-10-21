function checkStraightLine(coordinates: number[][]): boolean {
    // 斜率，以第一个点为基准点
    let k: number = (coordinates[1][1] - coordinates[0][1]) / (coordinates[1][0] - coordinates[0][0]);
    // 特殊情况，0和Infinity
    if( Math.abs(k) == 0 ) k = 0
    if( k == Infinity || k == -Infinity) k = Infinity
    // 第三个点开始判断
    for(let i = 2;i < coordinates.length;i++){
        let k_tmp = (coordinates[i][1] - coordinates[0][1]) / (coordinates[i][0] - coordinates[0][0])
        if( Math.abs(k_tmp) == 0 ) k_tmp = 0
        if( k_tmp == Infinity || k_tmp == -Infinity) k_tmp = Infinity
        if( k_tmp != k ) return false
    }
    return true
};