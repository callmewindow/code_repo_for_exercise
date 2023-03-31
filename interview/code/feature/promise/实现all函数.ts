// 这个函数接收一个 Promise 数组作为参数，并返回一个新的 Promise。
// 它会同时执行所有 Promise，当所有 Promise 全部 resolve 时，会将它们的结果以数组形式作为结果传递给新 Promise 的 resolve 函数。
// 如果任意一个 Promise reject，那么新 Promise 也会 reject，并将 reject 的原因作为结果传递给新 Promise 的 catch 函数。
function myAll(promises) {
  return new Promise((resolve, reject) => {
    const results: any[] = [];
    let count = 0;
    for (let i = 0; i < promises.length; i++) {
      promises[i]
        .then((result: any) => {
          results[i] = result;
          count++;
          if (count === promises.length) {
            resolve(results);
          }
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}
