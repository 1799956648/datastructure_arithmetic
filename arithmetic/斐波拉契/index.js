
const f = function (num) {
    /* 
        1
            prev = 0
            next = 1
        2
            prev = 1
            next = 1
        3   
            prev = 1
            next = 2
        4
            prev = 2
            next = 3
        5
            prev = 3
            next = 5
        6
            prev = 5
            next = 8
        7
            prev = 8
            next = 13
        8
            prev = 13
            next = 21
        9
            prev = 21
            next = 34
        10
            prev = 34
            next = 55
    */
    let [prev, next] = [0, 1];
    let arr = [];
    for (let i = 0; i < num; i++) {
        arr.push(prev);
        [prev, next] = [next, prev + next];
    };
    return arr;
};

console.log(f(10));