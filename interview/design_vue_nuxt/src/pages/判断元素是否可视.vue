<template>
  <div>
    <NuxtWelcome />
  </div>
</template>
<script setup lang="ts">
function isElementInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollY = window.pageYOffset || document.documentElement.scrollTop;
  const elementTop = rect.top + scrollY;
  const elementLeft = rect.left + scrollX;
  const elementBottom = elementTop + rect.height;
  const elementRight = elementLeft + rect.width;

  return (
    elementTop < viewportHeight &&
    elementBottom > 0 &&
    elementLeft < viewportWidth &&
    elementRight > 0
  );
}
</script>
<style scoped></style>