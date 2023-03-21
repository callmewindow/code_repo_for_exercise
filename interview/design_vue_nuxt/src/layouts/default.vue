<template>
  <div>
    <h1>欢迎来到起风了的测试项目，如下是你的测试内容</h1>
    <div id="testPage">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
<style scoped>
#testPage {
  border: 1px solid black;
  min-height: 200px;
}
</style>