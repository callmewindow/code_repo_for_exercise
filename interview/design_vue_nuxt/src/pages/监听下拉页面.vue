<template>
    <div>
        <NuxtWelcome />
    </div>
</template>
<script setup lang="ts">
// 获取页面滚动条滚动的位置
function getScrollTop(): number {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

// 获取页面可视区域的高度
function getClientHeight(): number {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
}

// 获取页面文档的总高度
function getScrollHeight(): number {
    return document.documentElement.scrollHeight || document.body.scrollHeight || 0;
}

// 监听用户下拉页面操作
window.addEventListener('scroll', () => {
    if (getScrollTop() + getClientHeight() >= getScrollHeight()) {
        console.log('用户已下拉到页面底部！');
        // 执行你需要的操作
    }
});

</script>
<style scoped></style>