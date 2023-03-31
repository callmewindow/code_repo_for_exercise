<template>
  <div class="flex-container">
    <div class="fixed-column">
      <!-- 左侧固定内容 -->
    </div>
    <div class="auto-column">
      <!-- 右侧自适应内容 -->
    </div>
  </div>
</template>

<style>
.flex-container {
  display: flex;
  flex-direction: row;
}

.fixed-column {
  width: 200px; /* 左侧固定宽度 */
}

.auto-column {
  flex: 1; /* 右侧自适应占满剩余空间 */
}
</style>
