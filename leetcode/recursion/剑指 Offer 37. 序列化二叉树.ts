// https://leetcode.cn/problems/xu-lie-hua-er-cha-shu-lcof/
// 用数量标记节点数，以在反序列化时拆分左右
/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
  // 序列化后关键是可以基于序列化的字符串恢复
  // 即这里输出的字符串可以被用来建立一个二叉树
  // 注意可能有重复数值和超过9的数字，因此值之间需要用符号分隔

  // 用前序遍历生成字符串
  if (!root) return '1:null,'; // null表示空
  let rootS = root.val + ',';
  // 如果左右都是空则直接带数量返回根节点
  if (!root.left && !root.right) return '1:' + rootS;
  let left = serialize(root.left);
  let right = serialize(root.right);
  let lCnt = 0, rCnt = 0;
  for (let i = 0; i < left.length; i++) if (left[i] == ',') lCnt++; // 记录逗号，即节点的数量，用于后续恢复
  for (let i = 0; i < right.length; i++) if (right[i] == ',') rCnt++; // 记录逗号，即节点的数量，用于后续恢复
  // 拼接左右部分和逗号数量，用冒号和逗号区分
  // console.log(String(1 + lCnt + rCnt) + ':' + rootS + left + right);
  return String(1 + lCnt + rCnt) + ':' + rootS + left + right;
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  // 基于i对data进行拆分
  let i = 0;
  let cntS = ''; // 记录data节点数，处理只有一个节点的情况
  while (data[i] != ':') cntS += data[i], i++;
  let cnt = Number(cntS);

  // 记录根节点数值
  i++; // 此时i位于冒号，+1才到数值位
  let valStr = '';
  while (data[i] != ',') valStr += data[i], i++; // 记录根节点数值
  if (valStr == 'null') return null;
  // 不是null则建立树节点
  let res = new TreeNode(Number(valStr));
  // 如果只有一个根节点，直接返回
  if (cnt == 1) return res;

  // 此时i位于根节点数值的逗号处，加1来到下一位开始找子树
  i++;
  const left = i; // 记录左子树起点
  let lCntS = ''; // 记录左子树节点数量
  while (data[i] != ':') lCntS += data[i], i++;
  let lCnt = Number(lCntS);

  // 复用cnt找到左子树最后的逗号来拆分
  cnt = 0;
  // 此时i位于冒号处，+1开始寻找
  while (cnt < lCnt) {
    i++;
    if (data[i] == ',') cnt++;
  }

  // 此时i位于最后一个逗号处，+1即左子树的终点，右子树的起点
  i++;
  const mid = i, right = data.length;
  // 生成左右子树
  res.left = deserialize(data.slice(left, mid));
  res.right = deserialize(data.slice(mid, right));
  return res;
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */