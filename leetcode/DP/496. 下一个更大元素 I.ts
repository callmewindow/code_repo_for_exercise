// https://leetcode.cn/problems/next-greater-element-i/
// o(n2)的解法，不是遍历n1的时候去多次遍历n2，而是先计算n2各个数的下一最大，然后去遍历n1直接判断即可
function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
  // 先遍历s2每个元素的下一更大元素
  let nums2_bigger: number[] = new Array(nums2.length)
  nums2.every((n_2, i_2, nums2) => {
    nums2_bigger[i_2] = -1;
    for (let i_2_2 = i_2 + 1; i_2_2 < nums2.length; i_2_2 += 1) {
      if (nums2[i_2_2] > n_2) {
        nums2_bigger[i_2] = nums2[i_2_2];
        break;
      }
    }
    return true
  })
  let nums1_bigger: number[] = new Array(nums1.length)
  nums1.every((n_1, i_1, nums1) => {
    if (nums2.indexOf(n_1) != -1) {
      // 虽然题目说明都出现，这里严谨判断一下
      nums1_bigger[i_1] = nums2_bigger[nums2.indexOf(n_1)]
    }
    return true
  })
  return nums1_bigger
};

// 手写单调栈，貌似速度没有提高
function nextGreaterElement_1(nums1: number[], nums2: number[]): number[] {
  let l_1 = nums1.length;
  let l_2 = nums2.length;
  // reverse也会让自己改变
  let nums1_bigger: number[] = new Array(l_1).fill(-1);
  let nums2_bigger: number[] = new Array(l_2).fill(-2);
  let nums2_help: number[] = [];
  let l_h: number;
  for (let i_2 = l_2 - 1; i_2 >= 0; i_2--) {
    // 倒序遍历
    while (nums2_bigger[i_2] == -2) {
      l_h = nums2_help.length;
      if (l_h == 0) {
        // 没有元素表示自己最大，入栈然后退出
        nums2_help.push(nums2[i_2]);
        nums2_bigger[i_2] = -1;
      } else {
        // 如果有数值就和头部的判断
        while (l_h > 0) {
          if (nums2[i_2] < nums2_help[l_h - 1]) {
            // 如果栈顶大于自己，则找到了最邻近的更大数，因此直接赋值然后入栈
            nums2_bigger[i_2] = nums2_help[l_h - 1];
            nums2_help.push(nums2[i_2]);
            l_h = 0;
          } else {
            // 否则就一直弹出
            nums2_help.pop();
            l_h = nums2_help.length;
          }
        }
      }
    }
  }
  nums1.every((n_1, i_1, nums1) => {
    let n_1_i = nums2.indexOf(n_1);
    if (n_1_i != -1) {
      nums1_bigger[i_1] = nums2_bigger[n_1_i];
      return true;
    }
    return false;
  })
  return nums1_bigger
};

// 官方解法，利用了一些优化方法和技巧
function nextGreaterElement_2(nums1: number[], nums2: number[]): number[] {
  const num_map = new Map();
  const nums2_help: number[] = [];
  for (let i = nums2.length - 1; i >= 0; --i) {
    const num = nums2[i];
    // 将循环合一，直到栈为空或找到比自己大的数
    while (nums2_help.length && num >= nums2_help[nums2_help.length - 1]) {
      nums2_help.pop();
    }
    // 判断是否为空，因为无论是空还是有比自己大的数，都应该push进去
    num_map.set(num, nums2_help.length ? nums2_help[nums2_help.length - 1] : -1);
    nums2_help.push(num);
  }
  // 基于nums1搭建一个数组，先填充0然后基于map填充具体的下一个大数
  const res = new Array(nums1.length).fill(0).map((_, i) => num_map.get(nums1[i]));
  return res;
};

// 减少循环中的判断次数，可以提高一定的时间？
function nextGreaterElement_3(nums1: number[], nums2: number[]): number[] {
  // 用map来存储数和更大数的匹配，可以节省效率
  let num_map = new Map();
  let nums1_bigger: number[] = new Array(nums1.length);
  let nums2_help: number[] = [];
  let l_h: number;
  for (let i_2 = nums2.length - 1; i_2 >= 0; i_2--) {
    // 倒序遍历
    while (nums2_help.length > 0 && nums2[i_2] >= nums2_help[nums2_help.length - 1]) {
      nums2_help.pop();
    }
    let l_h = nums2_help.length
    // 简单的if和else其实可以再优化为三元式
    if (l_h == 0) {
      num_map.set(nums2[i_2], -1)
    } else {
      num_map.set(nums2[i_2], nums2_help[l_h - 1])
    }
    nums2_help.push(nums2[i_2])
  }
  // 这种有规律的基于某个值的赋值也可以利用map优化
  nums1.every((n_1, i_1, nums1) => {
    nums1_bigger[i_1] = num_map.get(n_1);
    return true;
  })
  return nums1_bigger
};