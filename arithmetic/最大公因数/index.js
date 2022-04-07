// 求最大公因数
const maximumCommonFactor = function (n1, n2) {
    // 循环最少次数比较，保证 n1 为最小值
    if (n1 > n2) {
        [n1, n2] = [n2, n1];
    };

    let commonDivisor = 0;

    for (let i = 1; i <= n1; i++) {
        if (n1 % i === 0 && n2 % i === 0) {
            commonDivisor = i;
        };
    };

    return commonDivisor;
};

// maximumCommonFactor(12, 18);

console.log(maximumCommonFactor(18, 12));