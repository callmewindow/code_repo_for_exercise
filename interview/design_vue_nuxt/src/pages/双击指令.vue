<template>
  <div v-double-click="handleDoubleClick">双击我！</div>
</template>

<script setup lang="ts">
// import doubleClick from /'../directives/doubleClick.ts';

import { Directive } from 'vue';
import {directive}

const doubleClick: Directive = {
  mounted(el, binding) {
    let clicks = 0;
    const doubleClickHandler = binding.value;
    el.addEventListener('click', () => {
      clicks++;
      setTimeout(() => {
        if (clicks === 1) {
          return;
        }
        clicks = 0;
        doubleClickHandler();
      }, 250);
    });
  },
};

function handleDoubleClick() {
  console.log('double clicked!');
}
</script>
