<template>
  <div>
    缩放
    <div class="line"></div>
    阴影
    <div class="line_shadow"></div>
    移动
    <div class="line_trans"></div>
    1px
    <div style="width: 100px; border-top: 1px solid black;"></div>
  </div>
</template>
<script setup lang="ts">
</script>
<style scoped>
.line {
  position: relative;
  height: 1px;
  background-color: black;
}

.line::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background-color: black;
  transform: scaleY(0.5);
  transform-origin: top;
}

.line_shadow {
  height: 1px;
  box-shadow: 0 0 0.25px black;
}

.line_trans {
  position: relative;
  height: 1px;
  background-color: black;
}

.line_trans::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background-color: black;
  transform: translateY(-50%);
}
</style>