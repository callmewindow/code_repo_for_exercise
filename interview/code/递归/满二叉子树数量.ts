// 给定一颗二叉树，试求这课二叉树有多少个节点满足以该节点为根的子树是满二叉树？满二叉树指每一层都达到节点最大值。
// 第一行输入n表示节点数量，接下来n行第一个代表左儿子，第二个代表右儿子。

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
    const n = Number(await readline());

    // 因为节点的表示是1～n，所以多一位便于处理
    const tree = Array(n + 1).fill(0).map(() => Array(2));
    
    for (let i = 1; i <= n; i++) {
        const [l, r] = (await readline()).split(' ').map(Number);
        tree[i][0] = l;
        tree[i][1] = r;
    }
    let res = 0;

    function height(i: number): number {
        if (i == -1) return 0; // null节点是0
        // 看左右谁的高度高，加上自己
        return 1 + Math.max(height(tree[i][0]), height(tree[i][1]));
    }

    function isFull(i: number): boolean {
        if (i == -1) return true; // null表示叶子结点了，退出

        // 注意这个题目有坑，因为如果只是判断是不是叶子结点来判断是否是满二叉树，可能出现一个只有两层，一个有四层的情况
        // 因为在判断左右子树存在且满的同时，还需要判断他们的高度是否相同
                
        // 看左右是否full，以及看高度是否相同
        if ((isFull(tree[i][0]) && isFull(tree[i][1])) && height(tree[i][0]) == height(tree[i][1])) {
            res++; // 这里在判断子树是不是满二叉树时已经进行了res的处理
            return true;
        } else {
            return false;
        }
    }
    // 建立树完毕
    console.log(tree);
    // 检测根节点即可输出
    isFull(1);
    console.log(res);
})();
