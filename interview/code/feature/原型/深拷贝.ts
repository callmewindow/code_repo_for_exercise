function deepClone<T>(obj: T, hash = new WeakMap()): T {
  // weakmap可以防止内存泄漏，即当对象被删除，对应的内存占用也会丢失

  if (obj === null) return obj; // 提前处理特殊空值
  // 日期和正则比较特殊，需要提前处理
  if (obj instanceof Date) return new Date(obj) as any;
  if (obj instanceof RegExp) return new RegExp(obj) as any;
  // 不是对象的值不会涉及到深拷贝问题，可以直接返回，例如undefined，number，symbol，function
  if (typeof obj !== "object") return obj;
  
  // 是对象的话就要进行深拷贝

  // 如果map中已经包含了当前对象，则直接利用已经处理过的结果返回，不进行重复运算
  if (hash.get(obj)) return hash.get(obj) as T;

  // 否则开始正式深拷贝，先调用构造器创建
  let cloneObj = new (obj.constructor as { new (): T })();
  // 找到的是所属类原型上的 constructor，而原型上的 constructor 指向的是当前类本身
  hash.set(obj, cloneObj);
  // 对对象的有关属性进行深拷贝
  for (let key in obj) {
    // 判断属性是否是对象自身的属性而非继承属性
    // 执行call之后会将hasOwn的调用中this指向当前的这个obj，限制在当前的obj中进行key是否是属性的判断
    // 可以避免继承属性对判断的影响
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // 递归拷贝
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  return cloneObj;
}
