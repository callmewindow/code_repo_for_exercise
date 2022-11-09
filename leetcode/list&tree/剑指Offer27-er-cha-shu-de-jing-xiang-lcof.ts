// https://leetcode.cn/problems/er-cha-shu-de-jing-xiang-lcof
// 非常朴素的递归解决树问题，pass！
function mirrorTree(root: TreeNode | null): TreeNode | null {
    // 简单的递归，mirror即左右交换
    let newRoot = new TreeNode();
    if(root == null) return null;
    newRoot.val = root.val;
    newRoot.left = mirrorTree(root.right);
    newRoot.right = mirrorTree(root.left);
    return newRoot;
};