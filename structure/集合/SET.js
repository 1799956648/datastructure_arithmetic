/* 
    集合是由一组无序且唯一(即不能重复）的项组成的。该数据结构使用了与有限集合相同的数学概念，但应用在计算机科学的数据结构中。

    当前ES6给我们提供了set结构,天生就实现了集合的效果

    接下来,需要声明一些集合可用的方法，包括集合运算（并集、交集、差集、子集）

    1. 并集: 对于给定的两个集合，返回一个包含两个集合中所有元素的新集合。
    2．交集: 对于给定的两个集合，返回一个包含两个集合中共有元素的新集合。
    3．差集: 对于给定的两个集合，返回一个包含所有存在于第一个集合且不存在于第二个集合的元素的新集合。
    4．子集: 验证一个给定集合是否是另一集合的子集。

    add(element): 向集合添加一个新元素。
    delete(element): 从集合移除一个元素。
    has(element): 如果元素在集合中,返回true,否则返回false.
    clear(): 移除集合中的所有元素。
    size(): 返回集合所包含元素的数量。它与数组的length属性类似
    values(): 返回一个包含集合中所有值(元素)的数组。
*/

const SET = class {
    constructor() {
        this.items = {}; // 存储集合内的基本数据
    }

    add(element) {
        if (!this.has(element)) {
            // 直接用元素的内容做索引
            Reflect.set(this.items, element, element);
            return true;
        };
        return false;
    }

    delete(element) {
        if (this.has(element)) {
            Reflect.deleteProperty(this.items, element);
            return true;
        };
        return false;
    }

    has(element) {
        return Reflect.has(this.items, element);
    }

    clear() {
        this.items = {};
    }

    size() {
        return this.values().length;
    }

    values() {
        return Object.values(this.items);
    }

    // 并集：求两个集合中所有元素的新集合
    union(otherSet) {
        /* 
            当前SET实例与otherSet的实例合并起来
            [1,2]
            [2,3,5]

            -> [1,2,3,5]
        */
        const unionSet = new SET();
        this.values().forEach(value => unionSet.add(value));
        otherSet.values().forEach(value => unionSet.add(value));
        return unionSet;
    }

    // 交集：求两个集合中共用元素的新集合
    intersection(otherSet) {
        /* 
            [1,2,4,5]
            [1,2,3,5]

            -> [1,2,5]
        */

        const intersectionSet = new SET();

        const selfValues = this.values();
        const otherValues = otherSet.values();

        let bigger = this; // 最大循环次数对象
        let smaller = otherValues; // 最小循环次数对象

        // 取最大和最小循环次数对象
        if (otherValues.length > selfValues.length) {
            smaller = selfValues;
            bigger = otherSet;
        };

        // 以最小循环次数迭代对比
        smaller.forEach(value => {
            if (bigger.has(value)) {
                intersectionSet.add(value);
            };
        });

        return intersectionSet;
    }

    // 差集：求存在于第一个集合且不存在于第二个集合的元素的新集合
    difference(otherSet) {
        const difference = new SET();
        /* 
            [1,2,4,5]
            [1,3]

            -> [2,4,5]
        */

        this.values().forEach(value => {
            if (!otherSet.has(value)) {
                difference.add(value);
            };
        });

        return difference;
    }

    // 子集：求一个给定集合是否是另一集合的子集
    isSubsetOf(otherSet) {
        /*
            1. A 为 this，B 为 otherSet
            2. B 是否包含 A（A是否是B的子集）
            3. A 所有的值必须存在于 B 中
        */

        // 子集不能大于父集
        if (this.size() > otherSet.size()) {
            return false;
        };

        return this.values().every(value => otherSet.has(value));
    }
};

const set = new SET();
const otherSet = new SET();

set.add(1);
set.add(2);

otherSet.add(1);
otherSet.add(2);
otherSet.add(3);

console.log(set.intersection(otherSet));