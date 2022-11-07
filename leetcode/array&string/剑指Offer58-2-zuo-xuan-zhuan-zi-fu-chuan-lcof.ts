// 作弊方法和正常方法
function reverseLeftWords(s: string, n: number): string {
    // 切片作弊
    // return s.slice(n) + s.slice(0,n)
    // 正常遍历
    let newS = '';
    for(let i = n;i<n+s.length;i++){
        // 取余可以实现从n加到l-1，再从0加到n-1
        newS += s[i % s.length];
    }
    return newS
};