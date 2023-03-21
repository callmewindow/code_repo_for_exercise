type Result = [string | number, any][];

/**
 * 对数组或对象进行深度遍历
 * @param obj - 数组或对象
 * @returns 遍历结果
 */
function deepTraversal(obj: any): Result {
  const result: Result = [];

  // 递归函数
  function traverse(obj: any, prefix: string | number = '') {
    if (Array.isArray(obj)) {
      // 如果是数组，则遍历数组的每一个元素
      obj.forEach((val, index) => {
        // 数组基于脚标获取值，所以基于模板字符串语法进行拼接
        traverse(val, `${prefix}[${index}]`);
      });
    } else if (typeof obj === 'object' && obj !== null) {
      // 如果是对象，则遍历对象的每一个属性
      Object.entries(obj).forEach(([key, val]) => {
        // 数组属性基于点操作符访问
        traverse(val, `${prefix}.${key}`);
      });
    } else {
      // 如果是基本类型，则将其添加到遍历结果中
      result.push([prefix, obj]);
    }
  }

  traverse(obj);
  return result;
}
