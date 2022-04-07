let arr = [[12, 312], [[123], [213], [123, [123, [123]]]]];
const flat = function (arr) {
    return arr.reduce((prev, current) => {
        return prev.concat(Array.isArray(current) ? flat(current) : current);
    }, []);
};

const res = flat(arr);

console.log(res);