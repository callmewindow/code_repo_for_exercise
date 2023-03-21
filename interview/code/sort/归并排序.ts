function mergeSort(array: number[]): number[] {
  const len = array.length;

  // 当每个子序列中仅有1个元素时返回
  if (len <= 1) {
    return array;
  }

  // 将给定的列表分为两半
  const mid = Math.floor(len / 2);
  const left = mergeSort(array.slice(0, mid));
  const right = mergeSort(array.slice(mid));

  return merge(left, right);

  function merge(left: number[], right: number[]): number[] {
    let [l, r] = [0, 0];
    const result: number[] = [];

    // 从 left 和 right 区域中各个取出第一个元素，比较它们的大小
    while (l < left.length && r < right.length) {
      // 将较小的元素添加到result中，然后从较小元素所在的区域内取出下一个元素，继续进行比较；
      if (left[l] < right[r]) {
        result.push(left[l]);
        l++;
      } else {
        result.push(right[r]);
        r++;
      }
    }

    // 将剩余未比较的元素依次添加到result中
    return result.concat(left.slice(l), right.slice(r));
  }
}
