/* 
    栈遵循LIFO：last in first out （先进后出）原则的有序集合。
    新添加或待删除的元素都保存在栈的同一端，称为栈顶，另一端就叫栈底。
    在栈里，新元素都靠近栈顶，旧元素都接近栈底。
    push：添加一个或多个元素到栈顶 as Array push
    pop：移除栈顶的元素，同时返回被移除的元素 as Array pop
    peek：返回栈顶的元素，不对栈做任何修改
    isEmpty：栈里是否有元素
    clear：移除栈里的所有元素
    size：返回栈里的元素个数，as Array length
    forEach 迭代器
    for of 迭代器
    toString 字符串格式化
*/

const Stack = class {

    constructor() {
        this.count = 0; // 栈元素个数
        this.items = {}; // 栈列表
    }

    push(...eles) { // as Array push
        for (let i = 0; i < eles.length; i++) {
            this.items[this.count] = eles[i];
            this.count++;
        };
    }

    pop() { // as Array pop
        if (this.isEmpty()) return undefined;
        this.count--;
        const result = this.items[this.count];
        Reflect.deleteProperty(this.items, this.count);
        return result;
    }

    peek() {
        if (this.isEmpty()) return undefined;
        return this.items[this.count - 1];
    }

    isEmpty() {
        return !!!this.count;
    }

    clear() {
        this.count = 0;
        this.items = {};

        // while (!this.isEmpty()) this.pop();
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

// const stack = new Stack();

// stack.push(1, 2, 3);

// stack.forEach(function() {
//     console.log(arguments);
// });

// for (const key of stack) {
//     console.log(key, stack);
// };

// stack.pop();
// stack.pop();
// stack.pop();

// console.log(stack.isEmpty());

// console.log(stack.toString());

module.exports = Stack;