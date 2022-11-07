// 强行反转某一层，比较朴实无华
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

 let valList = [];

 function setMatrix(root: TreeNode | null, depth: number): void {
     if(root == null) return ;
     // 第一次遍历该层需新增
     if(valList.length <= depth){
         valList.push([]);
     }
     // 增加自己然后增加下一层的
     valList[depth].push(root.val);
     setMatrix(root.left, depth + 1);
     setMatrix(root.right, depth + 1);
 }
 
 function levelOrder(root: TreeNode | null): number[][] {
     // 全局需变空，因为是多次调用
     valList = [];
     // 默认从左到右
     setMatrix(root, 0);
     let i = 0;
     while(i < valList.length){
         // 直接反转某一层
         if(i % 2 == 1){
             // i为奇数表示该层时偶数层，需反转
             valList[i] = valList[i].reverse();
         }
         i++;
     }
     return valList;
 };

 // 基于队列和奇偶判断，用索引调整读取顺序
 function levelOrder(root: TreeNode | null): number[][] {
    if(root == null) return [];
    let nodeQueue = [];
    let valList = [];
    nodeQueue.push(root);
    let tmpValList = [];
    while(nodeQueue.length > 0){
        tmpValList = [];
        const nodeLen = nodeQueue.length;
        const valLen = valList.length;
        let i = 0;
        while(i < nodeLen){
            // 为了正常按顺序获取节点，这里用脚标获取
            // 基于valList的长度判断第几层，偶数长表示当前奇数层
            // 奇数层从前往后，偶数层从后往前
            root = valLen % 2 == 0 ? nodeQueue[i] : nodeQueue[nodeLen - 1 - i];
            tmpValList.push(root.val);
            // 为了确保下一层顺序正常，均从前开始增加左右节点
            root = nodeQueue[i];
            if(root.left != null) nodeQueue.push(root.left);
            if(root.right != null) nodeQueue.push(root.right);
            i++;
        }
        valList.push(tmpValList);
        // 清空前nodeLen个已经遍历的上一层节点
        i = 0;
        while(i < nodeLen){
            nodeQueue.shift();
            i++;
        }
    }
    return valList;
};

// 通过插入值的顺序实现反转，读取可以按顺序，插入可以反序
function levelOrder(root: TreeNode | null): number[][] {
    if(root == null) return [];
    let nodeQueue = [];
    let valList = [];
    nodeQueue.push(root);
    // tmp用于记录某一层的节点
    let tmpValList = [];
    while(nodeQueue.length > 0){
        // 只对目前node存在的节点进行遍历，node中的节点均位于一层
        tmpValList = [];
        for(let _ of new Array(nodeQueue.length)){
            // 基于valList长度判断奇偶，root永远取前面，因为后面有新增
            root = nodeQueue.shift();
            // 如果奇数则开头的值按顺序从左到右push即可
            // 如果偶数层则需要将后读取的放在前面，即头部
            if(valList.length % 2 == 0) tmpValList.push(root.val);
            else tmpValList.unshift(root.val);
            // 为确保顺序，已知都按正常顺序即可
            if(root.left != null) nodeQueue.push(root.left);
            if(root.right != null) nodeQueue.push(root.right);
        }
        valList.push(tmpValList);
    }
    return valList;
};