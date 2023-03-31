// Function.prototype.call()方法是Function对象原型上的一个方法，它可以调用一个函数并将其绑定到指定的上下文对象。实现一个类似的函数需要完成以下几个步骤：

// 将函数作为目标对象的一个属性；
// 将上下文对象作为目标对象的一个属性；
// 使用目标对象调用函数，并将参数传递给函数；
// 将函数返回的结果返回。

Function.prototype.myCall = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('Function.prototype.myCall - this is not a function');
  }
  if (!context) {
    context = window; // 如果context为undefined或null，使用全局对象
  } else {
    context = Object(context); // 将context转换为对象类型
  }
  // 创建一个唯一的Symbol作为context的属性名，防止属性名冲突
  const key = Symbol();
  context[key] = this; // 将函数作为context的一个属性
  const result = context[key](...args); // 使用context调用函数，并传递参数
  delete context[key]; // 删除context的该属性
  return result; // 返回函数执行结果
};

// Function 接口继承了全局的 Function 接口，然后添加了一个 customCall 方法
interface Function {
  customCall(thisArg: any, ...args: any[]): any;
}

function customCall(thisArg: any, ...args: any[]): any {
  thisArg = thisArg || window;
  thisArg.fn = this;
  const result = thisArg.fn(...args);
  delete thisArg.fn;
  return result;
}

// 示例
function greet(name: string, age: number) {
  console.log(`Hello, my name is ${name} and I'm ${age} years old.`);
}

greet.customCall(null, 'John', 30);
