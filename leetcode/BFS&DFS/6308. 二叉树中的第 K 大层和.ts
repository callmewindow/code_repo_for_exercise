// https://leetcode.cn/problems/kth-largest-sum-in-a-binary-tree/
// 记录每一层然后排序寻找
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

function kthLargestLevelSum(root: TreeNode | null, k: number): number {
  // 至少两个节点，所以不会空
  
  // bfs记录每层情况，全部排序返回
  let sum = new Array(); // 记录所有层情况
  
  let queue = new Array(); // 记录当前层节点情况
  queue.push(root);
  while(queue.length > 0){
    let tmp = new Array(); // 记录下一层节点情况
    let sumTmp = 0; // 记录当前层和
    for(let node of queue){
      sumTmp += node.val;
      if(node.left !== null) tmp.push(node.left);
      if(node.right !== null) tmp.push(node.right);
    }
    sum.push(sumTmp);
    queue = tmp.concat();
  }
  if(k > sum.length) return -1; // 少于k层
  sum.sort((b,f)=>f-b); // 从大到小排列
  return sum[k-1];
};