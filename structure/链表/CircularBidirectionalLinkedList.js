/*
    链表存储有序的元素集合,但不同于数组,链表中的元素在内存中并不是连续放置的。
    每个元素由一个存储元素本身的节点和一个指向下一个元素的引用(也称指针或链接)组成

    1, push(element):向链表尾部添加一个新元素。
    2. insert(element, position):向链表的特定位置插入一个新元素。
    3, getElementAt(index):返回链表中特定位置的元素。如果链表中不存在这样的元素,则返回undefined
    4. remove(element):从链表中移除一个元素。
    5, indexOf(element):返回元素在链表中的索引。如果链表中没有该元素则返回-1.
    6. removeAt(position):从链表的特定位置移除一个元素。
    7, isEmpty():如果链表中不包含任何元素,返回true,如果链表长度大于。则返回false。
    8. size():返回链表包含的元素个数,与数组的length属性类似。
    9. toString():返回表示整个链表的字符串。由于列表项使用了Node类,就需要重写继承自Javascript对象默认的toString方法,让其只输出元素的值。
*/
const Node = class {
    constructor(value) {
        this.value = value; // 值域
        this.next = undefined; // 指针域，指向下一个节点
        this.prev = undefined; // 指针域，指向上一个节点
    }
};

/**
 * @desc 双向循环链表
 */
const CircularBidirectionalLinkedList = class {
    constructor() {
        this.count = 0; // 计数器从0开始
        this.head = undefined; // 起始节点
    }

    push(value) {
        const node = new Node(value);

        if (!this.head) { // 当前链表为空
            this.head = node;
        } else {
            // 获取未插入前的最后一个节点
            const curLast = this.getNodeAt(this.count - 1);

            // 最后一个节点的 prev 指向 上一个节点（即 curLast）
            node.prev = curLast;

            // 最后一个节点的 next 指向第一个节点
            node.next = this.head;

            // 第一个节点的prev 指向 当前新增的节点（即 node）
            this.head.prev = node;

            // 未插入前的最后一个节点的 next = node
            curLast.next = node;
        };

        this.count++;
    }

    insert(value, idx) {
        // 插入的值范围不能超过链表边界值
        if (idx >= 0 && idx <= this.count) {
            const node = new Node(value);
            let current = this.head;

            if (idx === 0) { // 插在开头
                /* 
                    插入的节点为第一个
                        原本的第一个元素为当前节点的 next
                        原本的第一个元素的 prev 为 当前节点
                */

                // 存在一个以上节点才需要做更新
                if (!this.isEmpty()) {
                    const curLast = this.getNodeAt(this.count - 1);

                    // 原先第一个节点的 prev 指向 最新插入到开头的节点
                    current.prev = node;

                    // 新插入节点的 prev 指向 未插入前的最后一个节点
                    node.prev = curLast;

                    // 最后一个节点的 next 指向最新插入的节点
                    curLast.next = node;
                };

                node.next = current;

                this.head = node;
            } else { // 插在中间位置
                // 循环结束拿到当前插入位置的上一个元素
                for (let i = 1, length = idx; i < length; i++) {
                    current = current.next;
                };

                const nextEle = current.next; // 原先插入位置的元素，即新插入元素的下一个节点 node.next

                nextEle.prev = node; // 元素插入位置的元素的 prev = 当前节点

                node.next = nextEle; // 当前插入的节点的 next = 原先插入位置的元素

                current.next = node; // 插入位置的上一个节点的next = 当前插入的元素
            };
            this.count++;
        } else {
            throw new Error('索引值错误')
        };
    }

    indexOf(value) {
        let current = this.head;
        if (current.value === value) { // 查找的是第一个
            return 0;
        } else {
            for (let i = 1, length = this.count; i < length; i++) {
                // 当前位置的节点
                current = current.next;

                // 相同则返回
                if (current.value === value) {
                    return i;
                }
            };
        };
        return undefined;
    }

    getNodeAt(idx) {
        // 查询范围不能超过链表边界
        if (idx >= 0 && idx <= this.count) {
            if (idx === 0) {
                return this.head;
            } else {
                let current = this.head;

                // 循环结束拿到当前查询位置的上一个元素
                for (let i = 1, length = idx; i < length; i++) {
                    current = current.next;
                };
                return current.next;
            };
        } else {
            throw new Error('索引值错误')
        };
    }

    removeAt(idx) {
        // 删除范围不能超过链表边界
        if (idx >= 0 && idx <= this.count) {
            let beRemoved;

            // 存储最后一个元素
            const curLast = this.getNodeAt(this.count - 1);

            if (idx === 0) {
                // 存储当前被删除的对象
                beRemoved = this.head;

                // 有第二个则表头指向第二个，反之为 undefined
                this.head = this.head.next;

                if (this.count === 2) {
                    // 初始有两个元素，删除第一个元素，剩下一个元素，没有prev和next
                    this.head.prev = undefined;
                    this.head.next = undefined;
                } else if (this.count > 2) {
                    // 初始有两个元素以上，则删除第一个元素，把第二个的 prev 指向最后一个元素，最后一个元素的 next 指向第二个元素
                    this.head.prev = curLast;
                    curLast.next = this.head;
                };
            } else {
                let current = this.head;

                // 循环结束拿到当前查询位置的上一个元素
                for (let i = 1, length = idx; i < length; i++) {
                    current = current.next;
                };

                if (this.count === 2) {
                    // 删除第二个，剩下第一个
                    beRemoved = this.head.next;
                    this.head.prev = undefined;
                    this.head.next = undefined;
                } else if (this.count > 2) {
                    if (this.getNodeAt(idx) === curLast) { // 删除最后一个
                        // 待删除节点
                        beRemoved = curLast;

                        current.next = this.head;
                        this.head.prev = current;
                    } else { // 删除中间的
                        // 待删除节点
                        beRemoved = current.next;

                        // 待删除节点的下一个元素
                        const nextEle = beRemoved.next;

                        // 被删除节点的上一个节点的 next = 被删除节点的下一个节点
                        current.next = nextEle;

                        // 被删除节点的下一个节点的 prev = 被删除节点的上一个节点
                        nextEle.prev = current;
                    };
                };
            };

            this.count--;
            return beRemoved;

        } else {
            throw new Error('索引值错误');
        };
    }

    removeValue(value) {
        let current = this.head;

        if (current.value === value) {
            this.head = current.next;

            if (this.count === 2) {
                this.head.prev = undefined;
                this.head.next = undefined;
            } else if (this.count > 2) {
                // 获取未删除前的最后一个节点
                const curLast = this.getNodeAt(this.count - 1);
                this.head.prev = curLast;
                curLast.next = this.head;
            };

            this.count--;
        } else {
            let prev = null;
            const curLast = this.getNodeAt(this.count - 1);

            for (let i = 1, length = this.count; i < length; i++) {
                // 匹配成功的上一个元素 i - 1
                prev = current;

                // current = i + 1 当前位置的元素
                current = current.next;

                if (current.value === value) {
                    // break;// 删除符合条件的第一个值
                    // 删除符合条件的所有值

                    if (this.count === 2) {
                        prev.next = undefined;
                        prev.prev = undefined;
                    } else if (this.count > 2) {
                        if (current === curLast) { // 删除最后一个
                            prev.next = this.head;
                            this.head.prev = prev;
                        } else { // 删除中间的
                            prev.next = current.next;
                            current.next.prev = prev;
                        };
                    }
                    this.count--;
                    break;
                };
            };
        };
    }

    pop() {
        return this.removeAt(this.count - 1);
    }

    unshift(value) {
        this.insert(value, 0);
    }

    shift(value) {
        return this.removeAt(0);
    }

    isEmpty() {
        return !this.count;
    }

    size() {
        return this.count;
    }

    getHead() {
        return this.head.value;
    }

    toString() {
        let objString = '';
        let current = this.head;

        if (!current) {
            return '';
        } else {
            for (let i = 0, length = this.count; i < length; i++) {
                objString = `${objString},${current.value}`;
                current = current.next;
            };
        };
        return objString.slice(1);
    }
};

const circularBidirectionalLinkedList = new CircularBidirectionalLinkedList();


// for (let i = 5; i > 0; i--) {
//     circularBidirectionalLinkedList.insert(i, 0);
// }

// for (let i = 1; i <= 3; i++) {
//     circularBidirectionalLinkedList.push(i);
// };

circularBidirectionalLinkedList.push(2);
circularBidirectionalLinkedList.insert(1, 0);
circularBidirectionalLinkedList.removeAt(1);

console.log(circularBidirectionalLinkedList);

// console.log(circularBidirectionalLinkedList.toString());

module.exports = CircularBidirectionalLinkedList;