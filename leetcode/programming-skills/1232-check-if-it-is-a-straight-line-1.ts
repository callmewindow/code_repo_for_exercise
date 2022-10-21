function checkStraightLine(coordinates: number[][]): boolean {
    // 取第一个坐标为基准点，不修改的尽量const
    const x_0 = coordinates[0][0], y_0 = coordinates[0][1];
    // 取第二个坐标来作为基础对比
    const x_1 = coordinates[1][0], y_1 = coordinates[1][1];
    const c_l = coordinates.length
    for (let i = 2; i < c_l; i++) {
        // 第二种同时声明两个变量的方法
        const [x_i, y_i] = [coordinates[i][0], coordinates[i][1]];
        // 将斜率判断调整为平方差判断，应对0和infinity，原理还是斜率判断
        let check_k = (y_1 - y_0) * (x_i - x_0) - (y_i - y_0) * (x_1 - x_0);
        if( check_k !== 0){
            return false;
        }
    }
    return true;
};