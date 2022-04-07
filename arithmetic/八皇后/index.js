/*
    八皇后:
        每一行只能有一个皇后
        每一列只能有一个皇后
        左上到右下的对角线上只能有一个皇后
        右上到左下的对角线上只能有一个皇后
*/

// 把棋盘模拟成2维数组, n*n的棋盘
let p = [
    [0, 0, 1, 0], // 行 从0 开始 到 n-1
    [1, 0, 0, 0],
    [0, 0, 0, 1],
    [0, 1, 0, 0]
    // 列 从0 开始 到 n-1
];

function calQueen(n) {
    let queenPostion = [];// 存储最终的位置数据
    // 计算n皇后问题
    let leftTopToRightBottom = [];// 存储对角线
    let rightTopToLeftBottom = [];// 存储对角线
    let columns = []; // 列
    function tag(row, col, bool) {
        // 当我们在第row 第col列下了一颗棋子
        // 然后我们来标记一下 具体的行列或是对角线的可用情况

        // 0 + 0 = 0
        leftTopToRightBottom[row + col] = bool;

        // 0 - 0 + 4 - 1 = 3
        rightTopToLeftBottom[row - col + n - 1] = bool;

        // 0
        columns[col] = bool;

        // console.log('leftTopToRightBottom', leftTopToRightBottom);
        // console.log('rightTopToLeftBottom', rightTopToLeftBottom);
        // console.log('columns', columns);
    }
    function chair(row, currentChessboard) {
        if (row > n - 1) {
            queenPostion.push(currentChessboard)
            return; // 棋子下完了
        }
        for (let col = 0; col < n; col++) {
            if (
                !columns[col] &&
                !leftTopToRightBottom[row + col] &&
                !rightTopToLeftBottom[row - col + n - 1]
            ) {
                // 我下了, 然后 按照规则, 对应的对角线和行列 就不能再下了
                tag(row, col, true); // 0 0;

                chair(row + 1, currentChessboard.concat(col)); // 2 [0,1,2]  逐行扫描一行的下

                tag(row, col, false); // 暂时不执行 3 [1,2,3,4] 把之前下过的每一行都清空掉
            };
        }
    };

    chair(0, []);// 从第0行开始 逐行扫描 一局的起点 0 []
    
    console.log(columns);
    console.log(leftTopToRightBottom);
    console.log(rightTopToLeftBottom);

    return queenPostion;
    // let a = [];
    // queenPostion.forEach(item => {
    //     a.push(boardCreater(item, n))
    // })
    // return a;
}


function boardCreater(currentChessboard, n) {
    let board = [];
    for (let index = 0; index < n; index++) {
        board[index] = []
        for (let i = 0; i < n; i++) {
            board[index].push('-');
        }
    }
    for (let i = 0, len = currentChessboard.length; i < len; i++) {
        board[i][currentChessboard[i]] = '+';
    }
    return board;
}


const res = calQueen(4);

// console.log(res);

/*
    原子化 CSS
    CSS-IN-JS
*/