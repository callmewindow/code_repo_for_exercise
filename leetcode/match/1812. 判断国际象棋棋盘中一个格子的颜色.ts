// https://leetcode.cn/problems/determine-color-of-a-chessboard-square/
// 找规律用坐标奇偶判断黑白
function squareIsWhite(coordinates: string): boolean {
  // 纵横脚标从0开始计数，奇偶数相同则为黑，不同则为白
  const ascii1 = '1'.charCodeAt(0);
  const asciiA = 'a'.charCodeAt(0);
  // 判断奇偶数和1做&即可，为1是奇数，为0是偶数
  return !(
    ((coordinates.charCodeAt(0) - asciiA) & 1) ==
    ((coordinates.charCodeAt(1) - ascii1) & 1)
  )
};

// 将奇偶的判断也调整为位运算
function squareIsWhite_1(coordinates: string): boolean {
  // 纵横脚标从0开始计数，奇偶数相同则为黑，不同则为白
  const ascii1 = '1'.charCodeAt(0);
  const asciiA = 'a'.charCodeAt(0);
  // 判断奇偶数和1做&即可，为1是奇数，为0是偶数
  return Boolean(((coordinates.charCodeAt(0) - asciiA) & 1) ^ ((coordinates.charCodeAt(1) - ascii1) & 1));
};