function findParentDirectory(paths:string[]): string|null {
  // 按斜杠拆分
  const pathSplit = paths.map(item=>item.split('/'));
  const pathFound:string[] = [];
  let index = 0, isCommon = false;
  while(!isCommon){
    let tmpPath = pathSplit[0][index];
    for(var i=0;i<pathSplit.length;i++){
      // 依次判断每一个位置的路径是不是父目录
      if(pathSplit[i][index]!=tmpPath) isCommon = true;
    }
    if(!isCommon) pathFound.push(tmpPath);
    index++;
  }
  // 根据find情况返回
  if((pathFound.length == 1 &&  pathFound[0]=="") || pathFound.length == 0) {
    return null;
  }
  return pathFound.join('/')
}