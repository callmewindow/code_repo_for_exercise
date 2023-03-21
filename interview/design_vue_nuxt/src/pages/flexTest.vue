<template>
  <div>
    <div class="container">
      <div class="item">A</div>
      <div class="item">B</div>
      <div class="item">C</div>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
<style>
.container {
  display: flex;
  flex-wrap: wrap;
  align-content: stretch;
  border: 2px black solid;
  height: 250px;
  width: 240px;
  margin: 10px auto;
}

.item {
  width: 100px;
  height: 80px;
  background-color: aqua;
}

.item:first-of-type {
  background-color: pink;
}

.item:last-of-type {
  background-color: greenyellow;
}
</style>