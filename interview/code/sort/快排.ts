function quickSort(list: number[]): number[] {
  if (list.length <= 1) {
    // 数组长度为1或0时，无需排序，直接返回数组
    return list;
  }

  const midIndex = Math.floor(list.length / 2);
  const base = list[midIndex];
  const left: number[] = [];
  const right: number[] = [];

  for (let i = 0; i < list.length; i++) {
    if (i === midIndex) {
      continue;
    }
    const item = list[i];
    if (item > base) {
      right.push(item);
    } else {
      left.push(item);
    }
  }
  // 交换后可以确保左侧都小于base，右侧都大于base
  return [...quickSort(left), base, ...quickSort(right)];
}

// 如果递归调用的深度太深，会导致栈溢出的问题。而非递归实现的快速排序，使用迭代实现递归的功能

/**
 * 快速排序的非递归实现
 * @param arr 待排序数组
 */
function quickSortNotLoop(arr: number[]): number[] {
  // 用栈模拟递归调用过程，初始时栈为空
  const stack: number[][] = [];
  // 将整个数组的前后位置压入栈中
  stack.push([0, arr.length - 1]);

  // 当栈不为空时，继续循环
  while (stack.length) {
    // 从栈中取出一个区间，这个区间是待排序的部分数组
    const [left, right] = stack.pop()!;

    // 如果这个区间是合法的，也就是left<right
    if (left < right) {
      // 取出左右端点的值和中间值的值，以中间值为基准点
      const pivot = arr[Math.floor((left + right) / 2)];
      let i = left, j = right;
      // 开始划分过程，直到i和j相遇
      while (i <= j) {
        // 左侧查找大于等于基准值的元素，找到后停止循环
        while (arr[i] < pivot) {
          i++;
        }
        // 右侧查找小于等于基准值的元素，找到后停止循环
        while (arr[j] > pivot) {
          j--;
        }
        // 如果i和j还没有相遇，交换它们所对应的元素
        // 相当于每次循环交换一个值
        if (i <= j) {
          // 交换后可以确保左侧都小于pivot，右侧都大于pivot，因为是循环的
          [arr[i], arr[j]] = [arr[j], arr[i]];
          // 继续向下查找
          i++;
          j--;
        }
      }
      // 将区间左右两部分分别压入栈中，从而模拟递归调用过程
      stack.push([left, j]);
      stack.push([i, right]);
    }
  }

  // 返回排序后的数组
  return arr;
}
