// JavaScript是单线程运行的，没有内置的sleep函数，现在模拟实现sleep延迟执行的效果。
// 使用睡眠函数实现红绿灯代码，红灯2秒，黄灯1秒，绿灯3秒，循环改变颜色。

let timeout = () => console.log('time out');

// 1. setTimeout
// setTimeout
// 兼容性最好，但是使用了回调函数的实现方式，代码的可读性和维护性不是很好。
let sleep = function (timeout: Function, time: number) {
  setTimeout(() => {
    timeout();
  }, time);
}

function changeColor(color: string) {
  console.log('traffic-light ', color);
}
function mainTimeout() {
  changeColor('red');
  setTimeout(() => {
    changeColor('yellow');
    setTimeout(() => {
      changeColor('green');
      setTimeout(mainTimeout, 2000);
    }, 1000);
  }, 2000);
}

// Promise
// 优雅的构建sleep实现方法，避免了使用函数回调的使用方式。
let sleep2 = (time: number) => new Promise((resolve) => {
  setTimeout(resolve, time)
})

const traffic_light = (color: string, duration: number) => {
  return new Promise<void>((resolve, reject) => {
    console.log('traffic-light ', color);
    setTimeout(() => {
      // resolve了才能让Promise返回正常，在then进行下一步
      resolve()
    }, duration)
  })
}
const mainPromise = () => {
  Promise.resolve()
    .then(() => {
      return traffic_light('red', 3000)
    })
    .then(() => {
      return traffic_light('yellow', 1000)
    })
    .then(() => {
      return traffic_light('green', 2000)
    })
    .then(() => {
      mainPromise();
    })
}

async function wait(time: number) {
  await sleep2(time);
  timeout();
}

// async await
// async await实际上是generator和promise的语法糖
// 在提供同步编程方式实现异步调用的基础上，同时满足对sleep函数语义化的支持

// 可以避免Promise的一连串.then.then.then，也不再需要递归，使用while(true)就可以实现循环
function sleepAwait(duration: number) {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  })
}
async function changeColorAwait(color: string, duration: number) {
  console.log('traffic-light ', color);
  await sleepAwait(duration);
}
async function mainAwait() {
  while (true) {
    // 非常类似sleep函数
    await changeColorAwait('red', 2000);
    await changeColorAwait('yellow', 1000);
    await changeColorAwait('green', 3000);
  }
}

// 基于本地时间Date实现睡眠
function sleepDate(delay: number) {
  // + 相当于获取now的时间戳
  let start = +new Date()
  while (+new Date() - start < delay) { }
}

// 除了直接new Date()，得到的都是1970年1月1日到目前的时间戳，即毫秒数
console.log(+new Date())
console.log(new Date())
console.log(Date.now())
console.log(new Date().getTime())
console.log(new Date().getTimezoneOffset()) // 返回和格林尼治时间的分钟差，比GMT快是负数，要减
// 基于时间戳和时区偏移得到目前时间
console.log(new Date(new Date().getTime() - 60 * 1000 * new Date().getTimezoneOffset()))