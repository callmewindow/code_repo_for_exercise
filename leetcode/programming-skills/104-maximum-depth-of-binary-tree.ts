// 深度优先遍历，直接处理即可
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

 function maxDepth(root: TreeNode | null): number {
    // 处理遍历结束的情况
    if(root == null) return 0;
    let depth_l = maxDepth(root.left);
    let depth_r = maxDepth(root.right);
    // 返回自身加两侧的最长值即可
    if(depth_l > depth_r){
        return 1 + depth_l;
    }else{
        return 1 + depth_r;
    }
};