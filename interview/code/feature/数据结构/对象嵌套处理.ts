// {'a.b.c': '1', 'a.d': '2'} 转化为 { a: { b: { c: '1' }, d: '2' } }

function transformObject(obj: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(obj).forEach((key) => {
    const keys = key.split('.');
    let temp = result;
    keys.forEach((k, index) => {
      if (index === keys.length - 1) {
        // 到底部赋值
        temp[k] = obj[key];
      } else {
        // 有现成的直接使用
        temp[k] = temp[k] || {};
        temp = temp[k];
      }
    });
  });
  return result;
}

const original = { 'a.b.c': '1', 'a.d': '2' };
const transformed = transformObject(original);

console.log(transformed);
// output: { a: { b: { c: '1' }, d: '2' } }
