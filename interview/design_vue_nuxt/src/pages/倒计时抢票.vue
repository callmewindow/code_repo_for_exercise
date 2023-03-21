<template>
  <div>
    <div class="all">
      <div class="title">
        <div class="title_main">
          杭州市通用5元券
        </div>
        <div class="title_sub">
          杭味面馆
        </div>
      </div>
      <button class="purchase" @click="tryPurchase">
        {{ btnCon }}
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';

const leftTime = ref(10); // 倒计时时间
// const btnCon = ref('10s'); // 默认显示时间
const purchase = ref(0); // 0未抢购，1已抢购，-1抢购失败

onMounted(() => {
  // 进入页面开始倒计时
  setTimer();
});

const btnCon = computed<string>((): string => {
  // if(purchase.value === 0) 
  if (purchase.value === 1) return '已抢购';
  if (purchase.value === -1) return '抢购失败';
  return leftTime.value > 0 ? `${leftTime.value}s` : '抢购';
});

function setTimer() {
  const times = setInterval(() => {
    // console.log(leftTime.value);
    if (leftTime.value === 0) {
      // 关闭以停止循环
      clearInterval(times);
    } else {
      leftTime.value--;
    }
  }, 1000)
}

async function tryPurchase() {
  if (leftTime.value > 0) return;

  // await之后会解析promise，直接返回参数
  const res = await purchaseTicket();
  // console.log(res);
  if (res === 'success') purchase.value = 1;
};

async function purchaseTicket(): Promise<string> {
  // promise的初始化也是同步任务，一定会执行后才返回
  return new Promise((resolve) => {
    setTimeout(() => resolve('success'), 1000);
  })
}
</script>
<style scoped>
.all {
  box-sizing: border-box;
  height: 136px;
  width: 430px;
  border-radius: 12px;
  background-color: #fff0f1;
  padding-left: 30px;
  padding-right: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  display: block;
  /* border: 1px solid black; */
  /* flex内部元素float，clear，vertical-align均失效 */
  /* float: left; */
}

.title_main {
  font-size: 24px;
  font-weight: bold;
}

.title_sub {
  font-size: 22px;
  color: gray;
  /* 控制溢出 */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.purchase {
  display: block;
  flex-shrink: 0;
  cursor: pointer;
  /* float: right; */
  width: 108px;
  height: 45px;
  border: 0;
  border-radius: 8px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  background-color: #f00;
}</style>