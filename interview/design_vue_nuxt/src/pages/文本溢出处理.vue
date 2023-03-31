<template>
  <div>
    <div class="text-container" :class="{ 'truncated': truncated }">
      <div class="text" ref="text">{{ text }}</div>
      <div v-if="truncated" class="show-more" @click="showFullText = !showFullText">
        {{ showFullText ? '收起' : '查看全部' }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '这是一段很长的文本，可能超出两行，需要省略。',
      showFullText: false
    }
  },
  computed: {
    truncated() {
      // 获取文本元素和容器元素的高度
      const textHeight = this.$refs.text.offsetHeight;
      const containerHeight = this.$el.offsetHeight;

      // 判断文本是否超出容器两行
      return textHeight > containerHeight * 2;
    }
  }
};
</script>

<style>
.text-container {
  position: relative;
  overflow: hidden;
}

.text {
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
}

.show-more {
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: #fff;
  padding: 0.2em 0.5em;
  cursor: pointer;
}

.truncated .text {
  -webkit-line-clamp: initial;
  overflow: visible;
  display: block;
}</style>
