// 慢速寻找最低move
function reachNumber(target: number): number {
    // 相当于从1到num，中间可加可减，总和等于target
    // 最快到达，即target = n(n+1)/2，一步步走过去
    // 最慢到达，即target = n/2，一步一回头的走
    target = Math.abs(target)
    let moveLow = 0;
    // 特殊思路找n，破坏性，但是更快
    // while (target > 0) {
    //     moveLow++;
    //     target -= moveLow;
    // }
    while ( moveLow * ( moveLow + 1 ) < target * 2) {
        moveLow++;
    }
    // console.log(moveLow);
    let disLeft = target - moveLow*(moveLow+1)/2;
    return disLeft % 2 === 0 ? moveLow : moveLow + 1 + moveLow % 2;
    // return target % 2 === 0 ? moveLow : moveLow + 1 + moveLow % 2;

    // 此时moveLow可到达的最大距离会小于等于target
    // 因此填补剩余距离即可
    // console.log(moveLow, moveLow*(moveLow + 1)/2)
    // let disLeft = (target * 2 - moveLow*(moveLow + 1))/2;
    // return moveLow + disLeft * 2;
};