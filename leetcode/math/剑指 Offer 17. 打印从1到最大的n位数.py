# https://leetcode.cn/problems/da-yin-cong-1dao-zui-da-de-nwei-shu-lcof/
# 找规律按顺序对前一个n的情况进行处理
from typing import *
class Solution:
    def printNumbers(self, n: int) -> List[int]:
        cnt, mul10, res = 0, 1, [0]
        while (cnt < n):
            oldR = res.copy()
            for i in range(1, 10):
                for num in oldR:
                    res.append(i * mul10 + num)
            cnt += 1
            mul10 *= 10
        return res[1:]