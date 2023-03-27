// https://leetcode.cn/problems/compare-version-numbers/
// 双指针看数字情况，设立默认值即可
function compareVersion(version1: string, version2: string): number {
  // 相当于版本号排序的简化版
  const ver1Str = version1.split('.');
  const ver2Str = version2.split('.');
  // console.log(ver1Str, ver2Str);
  const len1 = ver1Str.length, len2 = ver2Str.length;
  for (let i = 0; i < len1 || i < len2; i++) {
    // 后续版本号为0相当于没有，所以这里判断时如果一个版本号较短，则默认为0
    const ver1Num = i < len1 ? Number(ver1Str[i]) : 0;
    const ver2Num = i < len2 ? Number(ver2Str[i]) : 0;
    // console.log(i, ver1Num, ver2Num);
    if (ver1Num === ver2Num) continue;
    else return ver1Num > ver2Num ? 1 : -1;
  }
  // 来到这里说明长度和版本号都相同，直接0
  return 0;
};