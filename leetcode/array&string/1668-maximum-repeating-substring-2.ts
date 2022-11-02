// 简单枚举+动态规划
var maxRepeating = function(sequence, word) {
    const n = sequence.length, m = word.length;
    if (n < m) {
        return 0;
    }

    const f = new Array(n).fill(0);
    for (let i = m - 1; i < n; ++i) {
        let valid = true;
        for (let j = 0; j < m; ++j) {
            if (sequence[i - m + j + 1] !== word[j]) {
                valid = false;
                break;
            }
        }
        if (valid) {
            f[i] = (i === m - 1 ? 0 : f[i - m]) + 1;
        }
    }

    return _.max(f);
};
// KMP+动态规划
var maxRepeating = function(sequence, word) {
    const n = sequence.length, m = word.length;
    if (n < m) {
        return 0;
    }

    const fail = new Array(n).fill(-1);
    for (let i = 1; i < m; ++i) {
        let j = fail[i - 1];
        while (j !== -1 && word[j + 1] !== word[i]) {
            j = fail[j];
        }
        if (word[j + 1] === word[i]) {
            fail[i] = j + 1;
        }
    }

    const f = new Array(n).fill(0);
    let j = -1;
    for (let i = 0; i < n; ++i) {
        while (j !== -1 && word[j + 1] !== sequence[i]) {
            j = fail[j];
        }
        if (word[j + 1] === sequence[i]) {
            ++j;
            if (j === m - 1) {
                f[i] = (i >= m ? f[i - m] : 0) + 1;
                j = fail[j];
            }
        }
    }

    return _.max(f)
};