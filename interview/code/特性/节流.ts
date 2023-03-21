// n秒内功能只执行一次，当n秒内重复触发某一功能，只有一次生效，节省前后端的流量
// 节流在间隔一段时间执行一次回调的场景有：
// 滚动加载，加载更多或滚到底部监听
// 搜索框，搜索联想功能
function throttle(fn: Function, delay: number) {
  // 定义一个定时器变量timer和一个上次执行的时间lastTime，初值为null和0
  let timer: number | null = null;
  let lastTime = 0;
  return function(...args: any[]) {
    const now = new Date().getTime();
    // 相当于增加了对两次调用时间差的判断
    if (now - lastTime < delay) {
      if (timer) {
        clearTimeout(timer);
      }
      // 如果当前时间距离上次执行时间还未达到时间间隔，则重置定时器并等待下一次执行
      timer = setTimeout(() => {
        lastTime = now;
        fn.apply(this, args);
      }, delay); // 如果要更准确的处理，这里的延迟时间，应该是delay - ( now - lastTime )
    } else {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}
