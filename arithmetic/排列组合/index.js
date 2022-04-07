// 求二维数组的全排列组合
const data = [['A', "B"], ['a', 'b'], ['1', '2']];

const compositionStr = function (arr1, arr2) {
    const result = [];
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            result.push(String(arr1[i]) + String(arr2[j]));
        };
    };
    return result;
};

const compositionRes = data.reduce((total, current) => {
    return compositionStr(total, current);
});

// 排列组合
// 斐波拉契
// 数组扁平