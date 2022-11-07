// 使用全局变量记录各层情况进行解决
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
     setMatrix(root, 0);
     return valList;
 };

 // 基于每层节点数量实现分层
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
            root = nodeQueue.shift();
            tmpValList.push(root.val);
            // 此处跳过null和判断是否null的含义是一样的
            if(root.left != null) nodeQueue.push(root.left);
            if(root.right != null) nodeQueue.push(root.right);
        }
        valList.push(tmpValList);
    }
    return valList;
};