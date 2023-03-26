<template>
  <div>
    1
    <div class="special_shape_6"></div>
    2
    <div class="special_shape_9"></div>
    3
    <div class="special_shape_10"></div>
    4
    <div class="star"></div>
    5
    <div class="border"></div>
  </div>
</template>
<script setup lang="ts">
</script>
<style scoped>
.special_shape_6 {
  width: 100px;
  height: 65px;
  background-color: lightgreen;
  /* ploygon每个参数是每个点的位置 */
  clip-path: polygon(50% 0,
      100% 100%,
      0 100%);
}

.special_shape_9 {
  width: 0px;
  position: relative;
  border-left: solid 50px transparent;
  border-top: solid 50px red;
}

.special_shape_10 {
  width: 0px;
  position: relative;
  border-left: solid 50px blue;
  border-top: solid 50px transparent;
}

.star {
  width: 100px;
  height: 100px;
  background-color: orange;
  /* ploygon每个参数是每个点的位置 */
  clip-path: polygon(50% 0,
      35% 40%,
      0 45%,
      30% 65%,
      20% 100%,
      50% 80%,
      80% 100%,
      70% 65%,
      100% 45%,
      65% 40%);
}

.border {
    width: 0;
    height: 0;
    border-style:solid;
    /* 按顺序是上方border的厚度，左右border的厚度和下方border的厚度 */
    border-width: 0 50px 50px;
    border-color: transparent transparent #d9534f;
}
</style>