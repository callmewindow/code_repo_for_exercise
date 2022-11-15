const eps = 1e-8; // 声明精度
// 数组结构示例
let res = [
  {
    score: 114,
    penalty: 1111111,
    user: {
      id: 514
    }
  }
];
// 将res基于sort内输入的函数进行排序，ab原本的顺序是a在后，b在前，例如b=res[0]时，a=res[1]
// 函数返回大于等于零的值，例如1表示顺序不变，小于零的值，例如-1表示需要调整顺序，即将b放在a前面
res = res.sort(function (a, b) {
  if (Math.abs(a.score - b.score) < eps && a.penalty > b.penalty)
    return 1;
  if (Math.abs(a.score - b.score) < eps && a.penalty == b.penalty && a.user.id > b.user.id)
    return 1;
  if (a.score < b.score)
    return 1;
  return -1;
});

