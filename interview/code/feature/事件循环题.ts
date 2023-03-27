console.log(1)
setTimeout(()=>{
    console.log(2)
}, 0)
new Promise<void>((resolve, reject)=>{
    console.log('new Promise')
    resolve()
}).then(()=>{
    console.log('then')
})
console.log(3)

// 判断上述内容的输出

// 实际结果是：1=>'new Promise'=> 3 => 'then' => 2

// 遇到 console.log(1) ，直接打印 1
// 遇到定时器，属于新的宏任务，留着后面执行
// 遇到 new Promise，这个是直接执行的，打印 'new Promise'
// .then 属于微任务，放入微任务队列，后面再执行
// 遇到 console.log(3) 直接打印 3
// 好了本轮宏任务执行完毕，现在去微任务列表查看是否有微任务，发现 .then 的回调，执行它，打印 'then'
// 当一次宏任务执行完，再去执行新的宏任务，这里就剩一个定时器的宏任务了，执行它，打印 2

// 更多题目：https://juejin.cn/post/6880419772127772679#heading-6

// 微任务是在同步任务之后才执行的
// resolve只是相当于给then传了一个参数，并不一定会console，如果有多个resolve，以第一个执行的为准
