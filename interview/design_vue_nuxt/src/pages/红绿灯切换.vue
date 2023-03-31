<template>
  <div class="traffic-light">
    <div class="light red" :class="{ active: currentLight == 'red' }"></div>
    <div class="light yellow" :class="{ active: currentLight == 'yellow' }"></div>
    <div class="light green" :class="{ active: currentLight == 'green' }"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentLight: '',
    };
  },
  mounted() {
    this.startTimer();
  },
  methods: {
    startTimer() {
      this.currentLight = 'red';
      const timer = (duration) => {
        return new Promise(resolve => {
          setTimeout(resolve, duration);
        })
      }
      const switchLight = async (light) => {
        switch (light) {
          case 'red':
            await timer(2000);
            this.currentLight = 'green';
            break;
          case 'yellow':
            await timer(1000);
            this.currentLight = 'red';
            break;
          case 'green':
            await timer(3000);
            this.currentLight = 'yellow';
            break;
          default:
            break;
        }
        await switchLight(this.currentLight);
      };

      switchLight(this.currentLight);
    }
  }
};
</script>

<style>
.traffic-light {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.light {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 20px;
  opacity: 0.3;
}

.red {
  background-color: red;
}

.yellow {
  background-color: yellow;
}

.green {
  background-color: green;
}

.active {
  opacity: 0.9;
}
</style>
