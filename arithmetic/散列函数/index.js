/* 
    在将键转化为字符串之后，
    loseLoseHashCode 方法包括初始化一个hash 变量并赋值为一个质数(大多数实现都使用5381)，
    然后迭代参数key，将hash 与33相乘（用作一个常数)，并和当前迭代到的字符的ASCII码值相加

    最后，我们将使用相加的和与另一个随机质数相除的余数比我们认为的散列表大小要大。
*/
const loseLoseHashCode = function (key) {
    const tableKey = this.toStringFn(key);

    let hash = 5381;
    for (let i = 0; i < tableKey.length; i++) {
        hash = (hash * 33) + tableKey.charCodeAt([i]);
    };
    return hash % 1013; // 37是关键码
};