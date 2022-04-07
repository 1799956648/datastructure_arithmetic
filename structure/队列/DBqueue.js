/* 
    双端队列是一种允许我们同时从前端和后端添加和移除元素的特殊队列
    又同时遵守了先进先出和后进先出原则，可以说它是把队列和栈相结合的一种数据结构

    addFront：该方法在双端队列前端添加新的元素 as Array unshift
    addBack：该方法在双端队列后端添加新的元素 as Array  push

    removeFront：该方法会从双端队列前端移除第一个元素 as Array  shift 
    removeBack：该方法会从双端队列后端移除第一个元素  as Array  pop

    peekFront：该方法返回双端队列前端的第一个元素
    peekBack：该方法返回双端队列后端的第一个元素

    isEmpty：队列里是否有元素
    clear：移除队列里的所有元素
    size：返回队列里的元素个数，as Array length
    forEach 迭代器
    for of 迭代器
    toString 字符串格式化
*/

const DBqueue = class {
    constructor() {
        this.count = 0; // 队列元素个数
        this.items = {}; // 队列列表
    }

    addFront() { // as Array unshift
        // this.count + arguments.length-1 数组的最新的最大索引值，数组原有的元素需要整体完后挪动的最大临界索引值

        // 第一个for循环就是把原有的元素往后挪，挪出刚刚好的位置索引值
        for (let i = this.count + arguments.length - 1; i > arguments.length - 1; i--) {
            // 此处把原有元素赋值给该元素在数组中新的索引地方
            this.items[i] = this.items[i - arguments.length];
        };

        // 第二个for循环其实就是把入参，按顺序在数组头部插入
        for (let i = 0; i < arguments.length; i++) {
            this.items[i] = arguments[i];
            this.count++;
        };
    }

    addBack() { // as Array  push
        for (let i = 0; i < arguments.length; i++) {
            this.items[this.count++] = arguments[i];
        };
    }

    removeFront() { // as Array  shift 
        if (this.isEmpty()) return undefined;

        const result = this.items[0]; // 先缓存队列第一项

        // 每一项都向左前进一位，这时会存在最后一项多余的
        for (let i = 0; i < this.count - 1; i++) {
            this.items[i] = this.items[i + 1];
        };

        // 删除多出的最后一项
        Reflect.deleteProperty(this.items, this.count - 1);

        // 下标--
        this.count--;

        return result;
    }

    removeBack() { // as Array  pop
        if (this.isEmpty()) return undefined;
        this.count--;
        const result = this.items[this.count];
        Reflect.deleteProperty(this.items, this.count);
        return result;
    }

    peekFront() {
        if (this.isEmpty()) return undefined;
        return this.items[0];
    }

    peekBack() {
        if (this.isEmpty()) return undefined;
        return this.items[this.count - 1];
    }

    isEmpty() {
        return !!!this.count;
    }

    clear() {
        this.count = 0;
        this.items = {};

        // while (!this.isEmpty()) this.dequeue();
    }

    size() { // as Array length
        return this.count;
    }

    forEach(cb) {
        for (let i = 0; i < this.count; i++) {
            cb(this.items[i], i, this.items);
        };
    }

    [Symbol.iterator]() {
        let idx = 0;
        let self = this;
        return {
            next() {
                if (idx < self.count) { // 有值
                    return {
                        value: self.items[idx++],
                        done: false,
                    };
                } else { // 没值
                    return {
                        value: undefined,
                        done: true,
                    };
                };
            }
        };
    }

    toString() {
        let str = '';
        for (let i = 0; i < this.count; i++) {
            str += `,${this.items[i]}`;
        };
        return str.slice(1);
    }
};

// const dbQueue = new DBqueue();

// dbQueue.addFront(4, 5, 6);
// dbQueue.addFront(1, 2, 3);

// dbQueue.removeFront();
// dbQueue.removeBack();

// console.log(dbQueue.toString());

module.exports = DBqueue;