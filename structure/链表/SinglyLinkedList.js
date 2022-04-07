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
    8. size():返回链表包含的元素个数,与数组的length属性类似
    9. toString():返回表示整个链表的字符串。由于列表项使用了Node类,就需要重写继承自Javascript对象默认的toString方法,让其只输出元素的值。
*/
const Node = class {
    constructor(value) {
        this.value = value; // 值域
        this.next = undefined; // 指针域，指向下一个节点
    }
};

/**
 * @desc 单向链表
 */
const SinglyLinkedList = class {
    constructor() {
        this.count = 0; // 计数器从0开始
        this.head = undefined; // 起始节点
    }

    push(value) {
        const node = new Node(value);
        if (!this.head) { // 当前链表为空
            this.head = node;
        } else {
            let current = this.head;

            // 循环获取最后一个节点，
            while (current.next) {
                current = current.next;
            };

            // 最后一个节点的 next = node
            current.next = node;
        };
        this.count++;
    }

    insert(value, idx) {
        const node = new Node(value);
        let current = this.head;

        // 插入的值范围不能超过链表边界值
        if (idx >= 0 && idx <= this.count) {
            if (idx === 0) { // 插在开头
                // 插入的节点为第一个，原本的第一个元素为当前节点的 next
                this.head = node;
                this.head.next = current;
            } else { // 插在中间位置
                // 循环结束拿到当前插入位置的上一个元素
                for (let i = 1, length = idx; i < length; i++) {
                    current = current.next;
                };

                let nextEle = current.next; // 原先插入位置的元素，即新插入元素的下一个节点 node.next
                node.next = nextEle; // 当前插入的节点.next = 原先插入位置的元素
                current.next = node; // 插入位置的上一个节点.next = 当前插入的元素
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
            if (idx === 0) {
                // 起始节点 = 起始节点.next
                beRemoved = this.head = this.head.next;
            } else {
                let current = this.head;

                // 循环结束拿到当前查询位置的上一个元素
                for (let i = 1, length = idx; i < length; i++) {
                    current = current.next;
                };

                // 存储待删除的节点
                beRemoved = current.next;

                // 被删除节点的上一个节点的 next = 被删除节点的下一个节点
                current.next = beRemoved.next;
            };

            this.count--;
            return beRemoved;

        } else {
            throw new Error('索引值错误')
        };
    }

    removeValue(value) {
        let current = this.head;

        if (current.value === value) {
            this.head = current.next;
            this.count--;
        } else {
            let pre = null;

            for (let i = 1, length = this.count; i < length; i++) {
                // 匹配成功的上一个元素 i - 1
                pre = current;

                // current = i + 1 当前位置的元素
                current = current.next;

                if (current.value === value) {
                    // break;// 删除符合条件的第一个值
                    // 删除符合条件的所有值
                    pre.next = current.next;
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

    getHeadNode() {
        return this.head;
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
            do {
                objString = `${objString},${current.value}`;
            } while (current = current.next);
        };
        return objString.slice(1);
    }

    reverse(node, cb) {
        // 1. 明确该函数的功能：反转链表
        // 2. 找出递归终止条件，简单场景
        // 3. 找出等价关系式: reverse(node) === 
        if (node === undefined || node.next === undefined) {
            return node;
        };

        /* 
            1. 1.next = 2;
            2.
        */

        this.reverse(node.next, cb);
        cb(node);

        // console.log('执行了');
    }
};

const singlyLinkedList = new SinglyLinkedList();

singlyLinkedList.push(1);
singlyLinkedList.push(3);
singlyLinkedList.push(2);
singlyLinkedList.push(4);

const result = singlyLinkedList.reverse(singlyLinkedList.getHeadNode(), function (node) {
    console.log(node.value);
});

module.exports = SinglyLinkedList;