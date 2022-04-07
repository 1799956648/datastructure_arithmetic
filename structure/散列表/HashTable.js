
const ValuePair = class {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
};

/**
 * 散列表
 */
const HashTable = class {
    constructor() {
        this.table = {};
    }

    toStringFn(key) {
        // 存在一个feature: 部分值的情况下, 会导致, 出现重复的key
        if (key === null) {
            return 'Null'
        } else if (key === undefined) {
            return 'Underfined';
        } else if (typeof key === 'string' || key instanceof String) {
            return `${key}`;
        }
        return key.toString();
    }

    // 散列函数

    /* 
        在将键转化为字符串之后，
        loseLoseHashCode 方法包括初始化一个hash 变量并赋值为一个质数(大多数实现都使用5381)，
        然后迭代参数key，将hash 与33相乘（用作一个常数)，并和当前迭代到的字符的ASCII码值相加

        最后，我们将使用相加的和与另一个随机质数相除的余数比我们认为的散列表大小要大。
    */
    loseLoseHashCode(key) {
        const tableKey = this.toStringFn(key);

        let hash = 5381;
        for (let i = 0; i < tableKey.length; i++) {
            hash = (hash * 33) + tableKey.charCodeAt([i]);
        };
        return hash % 1013; // 37是关键码
    }

    add(key, value) {
        if (key && value) {
            Reflect.set(this.table, this.loseLoseHashCode(key), new ValuePair(key, value));
            return true;
        };
        return false;
    }

    get(key) {
        return (Reflect.get(this.table, this.loseLoseHashCode(key)) || {}).value;
    }

    remove(key) {
        return Reflect.deleteProperty(this.table, this.loseLoseHashCode(key));
    }
};

const hashTable = new HashTable();

hashTable.add('大', '帅逼')

// hashTable.remove('大')

console.log(hashTable.loseLoseHashCode('大'));

// console.log(hashTable);

module.exports = HashTable;