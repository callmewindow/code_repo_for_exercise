// 该函数接受一个数组和一个可选参数 depth，表示要展开的深度。
// 默认情况下，depth 等于 1，即只展开一层。
function flat(arr: any[], depth = 1): any[] {
  const result: any[] = [];
  // forEach内部会自动处理数组的索引，可以在遍历时获取到当前元素的索引值。
  // 而使用for of时需要手动声明一个变量来保存当前索引值。
  // 另外，forEach也有更好的性能表现，尤其是在大型数据集合中。
  arr.forEach((item) => {
    if (Array.isArray(item) && depth > 0) {
      // 函数使用递归的方式遍历数组，对于数组中的每个元素，如果是数组并且还未到达最大深度，则递归调用 flat 方法
      result.push(...flat(item, depth - 1));
    } else {
      // 否则直接将元素添加到结果数组中。最后返回结果数组。
      result.push(item);
    }
  });

  return result;
}
