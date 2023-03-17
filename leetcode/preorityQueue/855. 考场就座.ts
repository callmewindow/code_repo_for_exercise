// https://leetcode.cn/problems/exam-room/
// 临时提交
/**
 * @param {number} n
 */
var ExamRoom = function(n) {
  this.person = [];
  this.rightBoundary = n - 1;
};

/**
 * @return {number}
 */
ExamRoom.prototype.seat = function() {
  const person = this.person;

  // 1. 空的话直接坐在 0
  if (!person.length) {
    person.push(0);
    return 0;
  }

  // 2. 只有一个的时候判断远近，往两头坐
  if (person.length === 1) {
    const val = person[0];
    if (val > (this.rightBoundary - val)) {
      this.person.unshift(0);
      return 0;
    } else {
      this.person.push(this.rightBoundary);
      return this.rightBoundary;
    }
  }

  // 3. 判断任意两个座位的间隔，找到最大的间隔坐中间
  let last = -1;
  let maxSpace = 0;
  let insertVal;
  let insertIdx;
  for (let i = 0; i < person.length; i++) {
    let curr = person[i];
    if (curr - last < 1) {
      continue;
    }
    let half = last + ((curr - last) >> 1);
    let space = Math.min(half - last, curr - half);
    if (space > maxSpace) {
      maxSpace = space;
      insertVal = half;
      insertIdx = i;
    }

    // 特殊处理：如果当前座位不是 0，判断是不是可以坐在 0
    if (i === 0 && curr !== 0 && curr > space) {
      maxSpace = curr;
      insertVal = 0;
      insertIdx = i;
    }

    last = curr;
  }

  // 特殊处理：如果插入的值是 undefined，看看最后一个座位是不是空着的，是的话可以坐
  if (insertVal === undefined && person[person.length - 1] !== this.rightBoundary) {
    insertIdx = person.length;
    insertVal = this.rightBoundary;
  }

  this.person.splice(insertIdx, 0, insertVal);
  return insertVal;
};

/** 
 * @param {number} p
 * @return {void}
 */
ExamRoom.prototype.leave = function(p) {
  // 二分查找是否存在 p，存在则删除
  const person = this.person;
  let l = 0, r = person.length - 1;
  while (l <= r) {
    const mid = l + ((r - l) >> 1);
    if (person[mid] === p) {
      person.splice(mid, 1);
      break;
    } else if (person[mid] > p) {
      r = mid - 1;
    } else if (person[mid] < p) {
      l = mid + 1;
    }
  }
};

/**
 * Your ExamRoom object will be instantiated and called as such:
 * var obj = new ExamRoom(n)
 * var param_1 = obj.seat()
 * obj.leave(p)
 */