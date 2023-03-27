function strIterator(str: string): CallableFunction {
  let index = 0;
  const n = str.length;
  function strOutput(): string {
    if(index < n )return str[index++];
    index = 0;
    return str[index++];
  }
  // 返回方法对象才能被不断调用
  return strOutput;
}

const a = strIterator('zyyispig')
for(let i= 0;i<10;i++)
  console.log(a())