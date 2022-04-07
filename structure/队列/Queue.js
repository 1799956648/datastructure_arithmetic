/* 
    队列遵循FIFO：first in first out （先进先出）原则的一组有序的项。
    队列在尾部添加新元素，并从顶部移除元素。最新添加的元素必须排在队列的末尾    
    enqueue：向队列尾部添加一个或多个新的项 as Array push
    dequeue：移除队列的第一项（即排在队列最前面的值），同时返回被移除的元素 as Array shift
    peek：返回队列中第一个元素-最先被添加，也将是最先被移除。队列不做任何变动（其它语言也可以叫做 front 方法）
    isEmpty：队列里是否有元素
    clear：移除队列里的所有元素
    size：返回队列里的元素个数，as Array length
    forEach 迭代器
    for of 迭代器
    toString 字符串格式化
*/

const Queue = class {
    constructor() {
        this.count = 0; // 队列元素个数
        this.items = {}; // 队列列表
    }

    enqueue() { // as Array push
        for (let i = 0; i < arguments.length; i++) {
            this.items[this.count++] = arguments[i];
        };
    }

    dequeue() { // as Array shift
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

    peek() {
        if (this.isEmpty()) return undefined;
        return this.items[0];
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

// const queue = new Queue();

// queue.enqueue(1, 2, 3);
// queue.enqueue(4, 5, 6);

// queue.dequeue();

// console.log(queue.peek());
// console.log(queue.clear());

// queue.forEach(function () {
//     console.log(arguments);
// })

// for (let value of queue) {
//     console.log(value);
// }

module.exports = Queue;