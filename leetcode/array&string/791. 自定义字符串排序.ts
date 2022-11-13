// https://leetcode.cn/problems/custom-sort-string/
// sort函数的利用，map保存顺序实现排序
function customSortString(order: string, s: string): string {
  // 基于现有排序排序，没有的则不需要处理
  // 可基于map实现order的数字化，进而利用sort函数进行处理
  let oMap = new Map()
  for (let i = 0; i < order.length; i++)
    oMap.set(order[i], i)
  let sArr = s.split('');
  sArr = sArr.sort(
    (b, f) => {
      let bI = oMap.get(b), fI = oMap.get(f);
      if (bI != undefined && fI != undefined) return bI - fI;
      // 不存在的默认排在前面，小于0时会转b和f的顺序，大于等于0则顺序不变
      return fI == undefined ? 1 : -1;
    }
  )
  return sArr.join('');
};