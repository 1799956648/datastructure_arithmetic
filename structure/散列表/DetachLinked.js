const BidirectionalLinkedList = require('../链表/BidirectionalLinkedList');

class ValuePair {
    constructor(key, value) { // 单个的字典值的节点
        this.key = key;
        this.value = value;
    }
    toString() {
        return `[${this.key}:${this.value}]`; // 单个值节点转成字符串
    }
}

/**
 * 分离链接实现的散列表结构
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

    /* 
       在将键转化为字符串之后，
       loseLoseHashCode 方法包括初始化一个hash 变量并赋值为一个质数(大多数实现都使用5381)，
       然后迭代参数key，将hash 与33相乘（用作一个常数)，
       并和当前迭代到的字符的ASCII码值相加

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
            const tableKey = this.loseLoseHashCode(key);
            const valuePair = new ValuePair(key, value);

            if (Reflect.has(this.table, tableKey)) {
                // 相同散列值
                // 相同原始key，认覆盖操作，不同原始key，认添加操作

                let current = this.table[tableKey].getHead();
                let condition = true;
                let count = 0;

                do {
                    // 相同原始key，新值替换旧值
                    if (current.value.key === key) {
                        const {
                            prev,
                            next
                        } = current;

                        // 更新上一个元素的next = 当前
                        if (prev) {
                            prev.next = valuePair;
                        };

                        // 更新下一个元素的prev = 当前
                        if (next) {
                            next.prev = valuePair;
                        };

                        if (
                            !prev
                            ||
                            !next
                            ||
                            (prev && next) // 匹配的是已存在的中间元素
                        ) {
                            this.table[tableKey].insert(valuePair, count);
                            this.table[tableKey].removeAt(count + 1);
                        };

                        condition = false;
                    } else {
                        // 不同原始key，认添加操作
                        current = current.next;
                        if (!current) {
                            condition = false;
                            this.table[tableKey].push(valuePair);
                        };
                    };

                    count++;
                } while (condition);
            } else {
                // 每一个节点都是一个链表结构
                Reflect.set(this.table, tableKey, new BidirectionalLinkedList());
                this.table[tableKey].push(valuePair);
            };

            return true;
        };
        return false;
    }

    get(key) {
        const tableKey = this.loseLoseHashCode(key);
        if (Reflect.has(this.table, tableKey)) {
            let current = this.table[tableKey].getHead();

            do {
                if (current.value.key === key) {
                    return current;
                };
            } while (current = current.next);
        };
        return undefined;
    }

    remove(key) {
        const tableKey = this.loseLoseHashCode(key);

        if (Reflect.has(this.table, tableKey)) {
            let current = this.table[tableKey].getHead();

            do {
                if (current.value.key === key) {
                    const {
                        prev,
                        next
                    } = current;

                    if (prev) {
                        prev.next = next;
                    };

                    if (next) {
                        next.prev = prev;
                    };

                    return true;
                };
            } while (current = current.next);
        };
        return false;
    }
};

const hashTable = new HashTable();

hashTable.add('h', { x: 'h' })
hashTable.add('26', { x: '28' })
hashTable.add('h103', { x: 'h103' })

hashTable.remove('h103')

module.exports = HashTable;

const numberToChinese = function(num) {
	num = String(num).trim();
	
    // 非数字不转换
    if (!/^\d*(\.\d*)?$/.test(num)) {
        return "Number is wrong!";
    };
	
    const AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九");
    const BB = new Array("", "十", "百", "千", "万", "亿", "点", "");
    
    let a = ("" + num).split("."),
    k = 0,
    re = "";

    for (let i = a[0].length - 1; i >= 0; i--) {
        switch (k) {
            case 0:
                re = BB[7] + re;
                break;
            case 4:
                if (!new RegExp("0{4}\\d{" + (a[0].length - i - 1) + "}$").test(a[0]))
                    re = BB[4] + re;
                break;
            case 8:
                re = BB[5] + re;
                BB[7] = BB[5];
                k = 0;
                break;
        }
        if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0) re = AA[0] + re;
        if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re;
        k++;
    };

    // 加上小数部分(如果有小数部分) 
    if (a.length > 1) {
		// 0.1 返回 零点一
        if (/^0$/.test(a[0])) {
            re = '零' + re;
        };

        re += BB[6];
        for (var i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)];
    };
	
	// 一十一 返回 十一
    return re
        .replace(/^一十/, '十');
};

const aaa = numberToChinese('');

console.log(aaa);