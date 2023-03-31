<template>
  <div class="out">
    <div class="wrapper">
      <div class="intrinsic-aspect-ratio-container2">
        <div class="content">
          123
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.wrapper {
  width: 40vw;
}

.intrinsic-aspect-ratio-container {
  width: 100%;
  height: 0;
  padding: 0;
  padding-bottom: 50%;
  margin: 50px;
  background-color: lightsalmon;
}


.intrinsic-aspect-ratio-container2 {
  width: 100%;
  height: auto;
  aspect-ratio: 16/9;
  background-color: lightsalmon;
}
</style>
