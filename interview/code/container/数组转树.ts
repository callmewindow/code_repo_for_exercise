// 该题目类似于复杂链表的合并

type testItem = {
  id: number,
  name: string,
  pid: number,
}

function arrToTreeLoop(pid: number, arr: testItem[]): any[] {
  return arr.filter((item) => item.pid === pid).map(
    (item) => {
      // 搭建新对象，...表示加载原本的内容
      return {
        ...item,
        children: arrToTreeLoop(item.id, arr),
      };
    }
  )
}

function arrToTreeMap(arr: testItem[]) {
  // 利用map存储不同id对应的新对象
  const result: any[] = [];
  const itemMap = new Map();
  for (const item of arr) {
    const id = item.id;
    const pid = item.pid;
    // 按需建立新对象
    let itemNow = itemMap.get(id);
    // 这里可能只有child，所以需要特殊处理一下
    if (itemNow === undefined) {
      itemMap.set(id, {
        children: [],
      })
      itemNow = itemMap.get(item.id);
    }
    // 这里无论有无child都能处理

    itemMap.set(id, {
      ...item,
      children: itemNow.children,
    })
    itemNow = itemMap.get(id);

    if (pid == 0) result.push(itemNow);
    else {
      let pItem = itemMap.get(pid);
      if (pItem === undefined) {
        itemMap.set(pid, {
          children: []
        })
        pItem = itemMap.get(pid);
      }
      pItem.children.push(itemNow);
    }

  }
  return result;
}

let arr: testItem[] = [
  { id: 1, name: '部门1', pid: 0 },
  { id: 2, name: '部门2', pid: 1 },
  { id: 3, name: '部门3', pid: 1 },
  { id: 4, name: '部门4', pid: 3 },
  { id: 5, name: '部门5', pid: 4 },
]
console.log(arrToTreeMap(arr)[0]['children']);