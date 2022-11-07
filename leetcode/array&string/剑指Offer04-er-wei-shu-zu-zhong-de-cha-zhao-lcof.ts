// 四分法寻找值，递归
// 一定程度的优化了分块，离谱）
// 在left到right，top到down的范围内，在matrix中找target
function findByI(matrix: number[][], target: number, l, r, t, d ): boolean {
    // console.log(l,r,t,d);
    // console.log(matrix[l][t], matrix[r][d])
    // 如果区域不合理，表示寻找到头了，停止
    if(l > r || t > d) return false;
    // 首先判断是否有可能在这个区间中，找最小和最大比较，比最小小，比最大大，则不可能
    if(matrix[l][t] > target || matrix[r][d] < target) return false;
    // 水平中点和垂直中点
    let mX = Math.floor((l+r)/2);
    let mY = Math.floor((t+d)/2);
    const mVal = matrix[mX][mY];
    // 剩余三个区域的结果
    let b1: boolean, b2: boolean, b3:boolean;
    // 等于则表示找到了
    if(mVal == target){
        return true;
    }else{
        if(mVal > target){
            // 不可能在mVal的右下方，有三个区域都可能
            b1 = findByI(matrix, target, l, mX - 1, t, mY - 1);
            if(b1) return true;
            b2 = findByI(matrix, target, mX, r, t, mY - 1);
            if(b2) return true;
            b3 = findByI(matrix, target, l, mX - 1, mY, d);
            if(b3) return true;
        }else{
            // 不可能在mVal的左上方
            b1 = findByI(matrix, target, mX + 1, r, mY + 1, d);
            if(b1) return true;
            b2 = findByI(matrix, target, mX + 1, r, t, mY);
            if(b2) return true;
            b3 = findByI(matrix, target, l, mX, mY + 1, d);
            if(b3) return true;
        }
    }
    // 有一个区域存在即可
    // return b1 || b2 || b3
    return false;
}
function findNumberIn2DArray(matrix: number[][], target: number): boolean {
    // 如果是[]或[[]]则肯定找不到
    let lenX = matrix.length;
    if(lenX == 0) return false;
    let lenY = matrix[0].length;
    // lenY为0则说明也是空，也找不到
    if(lenY == 0) return false;
    // console.log(lenX,lenY);
    return findByI(matrix, target, 0, lenX - 1, 0, lenY - 1 );
};