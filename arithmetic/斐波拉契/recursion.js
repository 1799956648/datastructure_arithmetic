const f = function (n) {
    if (n === 1) return 0;
    if (n === 2) return 1;
    return f(n - 1) + f(n - 2);
};

// 优化后的递归
const optimizeFibonacci = function (first, second, n) {
    /* 
        1. 终止条件
        2. 简单情景
    */
    if (n > 0) {
        if (n === 1) { // 递归终止条件
            return first; // 简单情景
        };
        if (n === 2) { // 递归终止条件
            return second; // 简单情景
        };
        if (n === 3) { // 递归终止条件
            return first + second; // 简单情景
        };
        return optimizeFibonacci(second, first + second, n - 1);
    } else {
        return -1;
    };
};

const result = optimizeFibonacci(1, 1, 5);