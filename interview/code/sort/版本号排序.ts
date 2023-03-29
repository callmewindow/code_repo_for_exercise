// 题目： 输入一组版本号，输出从大到小的排序
// 输入： ['2.1.0.1', '0.402.1', '10.2.1', '5.1.2', '1.0.4.5']
// 输出： ['10.2.1', '5.1.2', '2.1.0.1', '1.0.4.5', '0.402.1']
// 很方便实现，只需要基于每一个字符串基于.进行分词，然后调用sort函数，依次判断元素的每一个数组的顺序即可
function compareVersion(versions:string[]): string[]{
  // 新对象保存分词后的versions
  // 这里也没有必要直接把所有内容都转成数字再判断，因为有些转化是不必要的
  const versionStr: string[][] = versions.map((str)=>{
    const strArr = str.split('.');
    return strArr;
  })
  // 这里因为无法获取脚标，所以暂时不进行直接排序，说明后面还要额外join一次
  // versions.sort(())
  versionStr.sort((b,f)=>{
    // 每个位置都是拆分后的.之间的数字的字符串
    let i = 0,j = 0;
    // const bN = b.length, f
    // 这里如果基于长度判断，后面还需要判断一次，所以直接true
    while(true){
      if(b[i] === undefined || f[i] === undefined){
        // 前面相同有一个短，短的在后面
        return f.length - b.length;
      }
      const numB = Number(b[i]), numF = Number(f[i]);
      if(numB === numF) continue;
      else return numF - numB;
    }
  })
  return versionStr.map((strArr)=>strArr.join('.'));
}

let test = ['2.1.0.1', '0.402.1', '10.2.1', '5.1.2', '1.0.4.5']
console.log(compareVersion(test))
