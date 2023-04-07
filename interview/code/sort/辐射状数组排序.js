/* 
问题：辐射状排序以下数组，最小值在中间大数在两侧，且奇数在左偶数在右，即：  [3,1,0,2,4]。 
*/

const arr = [27, 70, 77, 60, 26, 17, 52, 53, 39, 0, 61, 74, 41, 96, 95, 49, 62, 31, 29, 11];

function radioSort(arr) {
  // 从小到大排序，不需要从小到大
  // arr.sort((b,f)=>b-f);
  const min = Math.min(...arr);
  const midIndex = arr.length >> 1;
  
  // console.log(min ,midIndex);

  // 按奇数左偶数右侧策略排序
  arr.sort((b,f)=>{
    // // 最小值跳过，确保在最前即可
    // if (b === min) return -1;
    // if (f === min) return 1;
    // 确保奇数在前
    if (b % 2 === 1 && f % 2 === 0) return -1;
    if (f % 2 === 1 && b % 2 === 0) return 1;
    // 同奇偶根据大小调整
    if (b%2 === 1 && f %2 === 1) return f-b; // 奇数大的在前
    if (b%2 === 0 && f %2 === 0) return b-f; // 偶数小的在前
    return 0;
  })

  console.log(arr);

  // // 此时最小值最前，按奇偶顺序排列，进行替换，最小值在中间
  // const minIndex = arr.indexOf(min);
  // [arr[midIndex], arr[minIndex]] = [arr[minIndex], arr[midIndex]];

  return arr;
}

let test = [0,1,2,3,4];

// console.log(radioSort(test));
console.log(radioSort(arr));
