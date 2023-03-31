import { Directive } from 'vue';

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

export default doubleClick;
