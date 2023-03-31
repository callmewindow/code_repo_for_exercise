// https://leetcode.cn/problems/simplify-path/
// split拆分用栈模拟
function simplifyPath(path: string): string {
  // 用栈记录当前路径情况
  // 按照/拆分，只要不是空字符串即代表是路径名或.或..
  // .时不操作，..pop
  const pathArr = path.split('/');
  const pathNow: string[] = [];
  for(let path of pathArr){
    if(path === '' || path === '.') continue;
    if(path === '..'){
      // 没有上级目录也没事，不会报错
      pathNow.pop();
    }else{
      // 遇到正常路径则push
      pathNow.push(path);
    }
  }
  // console.log(pathNow);
  // 拼接当前的路径
  let res = '/';
  for(let path of pathNow) res = res + path + '/';
  // 如果不是只有一个/，则说明末尾会多一个/
  return res.length > 1 ? res.slice(0,-1) : res;
};