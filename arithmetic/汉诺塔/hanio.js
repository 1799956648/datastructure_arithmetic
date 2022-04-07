const R = require('ramda');

/**
 * 汉诺塔：每次只能移动一个柱子，大的滑块不能在小滑块的上方
 * plates：预设具体汉诺塔的滑块的个数
 * A, B, C 为三根柱子，
 * moves 为操作的步骤
 * 
 * @param {Number} plates 滑块数量
 * @param {String} A 柱子A
 * @param {String} B 柱子B
 * @param {String} C 柱子C
 * @param {Array} moves 移动步骤
 * @returns {Array} 操作步骤
 */
const hanoi = function (plates, A, B, C, moves = []) {

    // 如果个数不是大于1的数字，则直接返回
    if (plates <= 0) return moves;

    if (plates === 1) { // 个数只有一个，直接从第一个挪到最后一个
        moves.push([A, "挪到", C]);
    } else {
        // A 借助 C 把（n-1）个滑块移动到了 B
        hanoi(plates - 1, A, C, B, moves);

        // A 直接把第 n 个移动到 C
        moves.push([A, "挪到", C]);

        // B 借助 A 把（n-1）移动到 C
        hanoi(plates - 1, B, A, C, moves);
    };

    return moves;
};

R.compose(console.log, hanoi)(3, "第一根柱子", "第二根柱子", "第三根柱子");