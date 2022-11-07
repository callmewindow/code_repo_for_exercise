// 双数组保存方式，发现了变量名规范的冲突
class ParkingSystem {
    // 记录停入车的最大数量
    private park_max: Array<number>;
    // 记录停入车的当前数量
    private park_list: Array<number>;

    constructor(big: number, medium: number, small: number) {
        this.park_list = new Array(3).fill(0);
        this.park_max = new Array(3);
        this.park_max[0] = big;
        this.park_max[1] = medium;
        this.park_max[2] = small;
    }

    addCar(carType: number): boolean {
        // 发现事情变得不对起来，md这ts的变量规范是小驼峰
        let car_i = carType - 1;
        // 原谅我这个离谱的混合命名，入门结束后全面调整，本代码提醒一下
        if(this.park_list[car_i] < this.park_max[car_i]){
            this.park_list[car_i]++;
            return true;
        }else{
            return false;
        }
    }
}

/**
 * Your ParkingSystem object will be instantiated and called as such:
 * var obj = new ParkingSystem(big, medium, small)
 * var param_1 = obj.addCar(carType)
 */