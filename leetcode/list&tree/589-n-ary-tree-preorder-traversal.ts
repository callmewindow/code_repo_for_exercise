/**
 * Definition for node.
 * class Node {
 *     val: number
 *     children: Node[]
 *     constructor(val?: number) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.children = []
 *     }
 * }
 */

function findChildByfront(root: Node | null): number[] {
    let root_node_num: number[] = [];
    if(!root){
    // root存在才做后面的操作，可能为空
        return root_node_num
    }
    root_node_num.push(root.val);
    for(let child of root.children){
        // 拼接孩子的数字数组
        root_node_num = root_node_num.concat(findChildByfront(child))
    }
    return root_node_num
}

function preorder(root: Node | null): number[] {
    // 节点已经搭建完毕，因此直接读取即可
    // 利用节点数字数组来存储
    let node_num: number[] = [];
    node_num = findChildByfront(root)
    return node_num
};