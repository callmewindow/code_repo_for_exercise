<template>
  <div id="test">
    <!-- {{ menuTree }} -->
    <template v-if="menuTree.length > 0">
      <ul v-for="item, index in menuTree" :key="index">
        {{ item.name }}
        <template v-if="item.children.length > 0">
          <li v-for="child,childIndex in item.children" :key="childIndex">
            {{ child.name }}
          </li>
        </template>
      </ul>
    </template>
  </div>
</template>
<script setup lang="ts">
// 给一个扁平数组，利用id和pid表明继承关系
// 转为树状结构，并用html展示出来

type MenuTreeItem = {
  id?:number,
  pid?:number,
  name?:string,
  sort:number,
  children: MenuTreeItem[],
}

let menuTree = ref<MenuTreeItem[]>([]);

onMounted(() => {
  menuTree.value = arrToTreeMap(menu)
  console.log(menuTree);
})

type MenuItem = {
  id: number,
  pid: number,
  sort: number,
  name: string,
}
let menu: MenuItem[] = [
  { id: 1, name: '菜单1', pid: 0, sort:1},
  { id: 2, name: '菜单1-1', pid: 1, sort:1},
  { id: 3, name: '菜单1-2', pid: 1, sort:0 },
  { id: 4, name: '菜单2', pid: 0, sort:0 },
  { id: 5, name: '菜单2-1', pid: 4, sort:0},
]
function arrToTreeMap(arr: MenuItem[]): MenuTreeItem[] {
  // 利用map存储不同id对应的新对象
  const result: any[] = [];
  const itemMap = new Map<number, MenuTreeItem>();
  for (const item of arr) {
    const id = item.id;
    const pid = item.pid;
    // 按需建立新对象
    let itemNow = itemMap.get(id);
    // 这里可能只有child，所以需要特殊处理一下
    if (itemNow === undefined) {
      itemMap.set(id, {
        sort:0,
        children: [],
      })
      itemNow = itemMap.get(id);
    }
    // 这里无论有无child都能处理
    if(itemNow === undefined) continue;
    itemMap.set(id, {
      ...item,
      children: itemNow.children,
    })
    itemNow = itemMap.get(id);
    if(itemNow === undefined) continue;

    if (pid == 0) result.push(itemNow);
    else {
      let pItem = itemMap.get(pid);
      if (pItem === undefined) {
        itemMap.set(pid, {
          sort:0,
          children: []
        })
        pItem = itemMap.get(pid);
      }
      if(pItem !== undefined){
        pItem.children.push(itemNow);
        pItem.children.sort((b,f)=>b.sort - f.sort);
      }
    }

  }
  return result.sort((b,f)=>b.sort - f.sort);
}
</script>
<style scoped></style>