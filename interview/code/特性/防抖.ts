// n秒后再执行实际的事件，如果n秒内重复触发，则重新计时
// 防止由于用户频繁执行操作，导致多次请求的处理，统一接受某一段时间的操作，并只实际执行一次能力
// 防抖在连续的事件，只需触发一次回调的场景有：
// 搜索框搜索输入。只需用户最后一次输入完，再发送请求
// 手机号、邮箱验证输入检测
// 窗口大小resize。只需窗口调整完成后，计算窗口大小。防止重复渲染。
function debounce(fn: Function, delay: number) {
  let timer: number | null = null;
  // 有缺陷，即第一次请求不能立刻执行
  return function(...args: any[]) {
    // 当函数被调用时，如果timer不为null，就清除上一次的定时器，重新设置定时器
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      // 只有当定时器时间结束后，才会真正执行要防抖的函数
      fn.apply(this, args);
      // 如果不使用apply直接调用，可能会导致函数内部的this指向改变，指向全局对象
      // 当我们需要在一个事件监听函数中使用防抖函数，就需要用apply来确保this指向监听器绑定的元素
    }, delay);
  };
}

// 当一个函数不作为对象的方法被调用，而是在全局作用域下被调用时，this将指向全局对象
// 在防抖和节流函数中，我们通常需要在函数内部访问当前的 this 对象，来访问当前执行上下文中的数据或方法。
// 为了确保这个 this 指向不会在调用过程中被改变，我们需要使用 apply 或者 call 函数来明确指定执行上下文。

// 这里apply的this指向的便是函数执行时的上下文环境，即函数执行时所处的对象，可以确保函数内部的this指向正确

// 立刻执行的防抖函数
type DebouncedFn<T extends any[]> = (...args: T) => void;

function debounceI<T extends any[]>(
  fn: DebouncedFn<T>,
  delay: number,
  immediate = false
): DebouncedFn<T> {
  let timerId: ReturnType<typeof setTimeout> | undefined;

  return function(this: any, ...args: T) {
    const context = this;

    const later = () => {
      timerId = undefined;

      if (!immediate) {
        fn.apply(context, args);
      }
    };

    const callNow = immediate && !timerId;

    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(later, delay);

    if (callNow) {
      fn.apply(context, args);
    }
  };
}
