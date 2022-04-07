/*
    树结构基本概念：
        节点
            内部节点：存在一个以上子节点
            外部节点（叶节点）：无子节点
            节点的深度：取决于它祖先节点的数量
            节点的高度：取决于所有深度的最大值
            
        子树

        二叉树
            二叉树中的节点最多只能有两个子节点：一个是左侧子节点，另一个是右侧子节点。
        
            二叉搜索树（BST）
                二叉搜索树（BST）是二叉树的一种，但是只允许你在左侧节点存储（比父节点）小的值，在右侧节点存储（比父节点）大的值。

                边：可以理解为指针
                键：可以理解为节点

                遍历
                    先序遍历：以优先于后代节点的顺序访问每个节点的（先访问节点本身，再访问它的左侧节点，再然后访问它的右侧节点）
                        应用：结构化文档

                    中序遍历：上行顺序访问BST所有节点（从最小到最大的顺序访问所有节点）
                        应用：排序

                    后序遍历：先访问节点的后代节点，再访问节点本身（会先访问左侧子节点，然后是右侧子节点，最后是父节点本身）
                        应用：计算一个目录及其子目录中所有文件所占空间的大小。


                    先序遍历和中序遍历的不同点是：
                        先序遍历会先访问节点本身，然后再访问它的左侧子节点，最后是右侧子节点


                搜索
                    最大值
                    最小值
                    特定值


    实现方法
        insert(key)：向树中插入一个新的键。
        search(key)：在树中查找一个键。如果节点存在，则返回true；如果不存在，则返回false。
        inOrderTraverse()：通过中序遍历方式遍历所有节点。
        preOrderTraverse()：通过先序遍历方式遍历所有节点。
        postOrderTraverse()：通过后序遍历方式遍历所有节点。
        min()：返回树中最小的值/键。
        max()：返回树中最大的值/键。
        remove(key)：从树中移除某个键。
*/

const Node = class {
    constructor(key) {
        this.key = key;// 节点值
        this.left = null; // 左侧子节点
        this.right = null; // 右侧子节点
    }
}

const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1
};


const BinarySearchTree = class {
    constructor() {
        this.root = null; // 二叉树的根节点, 默认啥都没有
    }

    // 比较函数, a < b返回-1. 大于则返回正1
    compareFn(a, b) {
        if (a === b) {
            return 0;
        };

        // return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
        return Compare[a < b ? 'LESS_THAN' : 'BIGGER_THAN'];
    }

    // 向树中插入一个新的键。
    insert(key) {
        // 往二叉树结构里面 插入新的值
        if (!this.root) {
            // 根节点是空的
            this.root = new Node(key);
        } else {
            // 做判断:插左边还是插右边，　并且插入的节点
            this.insertNode(this.root, key); // 从根节点开始判断
        };
    }

    // 因为不确定具体的插入位置因此采取递归的方法, 那么就需要将此处逻辑进行封装
    insertNode(node, key) {
        // 为了在已经有大量数据的时候, 能够递归的调用

        // 待插入的值, 要比待插入节点的值要小, 所以插左边
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            if (node.left) {
                // 待插入节点的左侧子节点已经有了, 继续往下面找
                this.insertNode(node.left, key);
            } else {
                // 待插入节点的左侧子节点不存在就直接往里面插
                node.left = new Node(key);
            };
        } else {
            // 待插入的值, 要比待插入节点的值要大, 所以插右边
            if (node.right) {
                // 待插入节点的右侧子节点已经有了, 继续往下面找
                this.insertNode(node.right, key);
            } else {
                // 待插入节点的右侧子节点不存在就直接往里面插
                node.right = new Node(key);
            };
        };

        // 返回修改后的树（目前返不返回无所谓，因为会递归修改源二叉树）
        return node;
    }

    removeKey(key) {
        this.root = this.removeNode(this.root, key);
    }

    removeNode(node, key) {
        if (node == null) {
            return null;
        }
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            node.left = this.removeNode(node.left, key);
            return node;
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            node.right = this.removeNode(node.right, key); return node;
        } else {
            // 键等于node.key
            // 第一种情况：移除一个叶节点
            if (
                node.left == null
                &&
                node.right == null
            ) {
                node = null;
                return node;
            }
            // 第二种情况：移除有一个左侧或右侧子节点的节点
            if (node.left == null) {
                node = node.right;
                return node;
            } else if (node.right == null) {
                node = node.left;
                return node;
            }
            // 第三种情况：移除有两个子节点的节点
            const aux = this.minNode(node.right);
            node.key = aux.key; // 当前待删除节点 = 右侧子树中最小的节点
            node.right = this.removeNode(node.right, aux.key);
            return node;
        }
    }

    // 在树中查找一个键。如果节点存在，则返回true；如果不存在，则返回false。
    searchKey(key) {
        return this.searchNode(this.root, key);
    }

    // 从树中查找一个节点
    searchNode(node, key) {
        if (node) {
            const compareResult = this.compareFn(key, node.key);

            if (compareResult === Compare.LESS_THAN) {
                // 搜索左侧
                return this.searchNode(node.left, key);
            } else if (compareResult === Compare.BIGGER_THAN) {
                // 搜右侧
                return this.searchNode(node.right, key);
            } else {
                // 搜到了
                return true;
            };
        } else {
            return false;
        };
    }

    // 从根节点开始查找最大子节点
    max() {
        return this.maxNode(this.root);
    }

    // 从指定的节点开始, 查找最大子节点
    maxNode(node) {
        let current = node;

        while (current && current.right) {
            current = current.right;
        };

        return current;
    }

    // 从根节点开始查找最小子节点
    min() {
        return this.minNode(this.root);
    }

    // 从指定的节点开始, 查找最小子节点
    minNode(node) {
        let current = node;

        while (current && current.left) {
            current = current.left;
        };

        return current;
    }

    // 中序遍历方式遍历所有节点
    inOrderTraverse(cb) {
        this.inOrderTraverseNode(this.root, cb);
    }

    inOrderTraverseNode(node, cb) {
        if (node) {
            this.inOrderTraverseNode(node.left, cb);
            cb(node.key);
            this.inOrderTraverseNode(node.right, cb);
        };
    }

    // 先序遍历
    preOrderTraverse(cb) {
        this.preOrderTraverseNode(this.root, cb);
    }

    preOrderTraverseNode(node, cb) {
        if (node) {
            cb(node.key);
            this.preOrderTraverseNode(node.left, cb);
            this.preOrderTraverseNode(node.right, cb);
        };
    }

    // 后序遍历
    postOrderTraverse(cb) {
        this.postOrderTraverseNode(this.root, cb);
    }

    postOrderTraverseNode(node, cb) {
        if (node) {
            this.postOrderTraverseNode(node.left, cb);
            this.postOrderTraverseNode(node.right, cb);
            cb(node.key);
        }
    }
};

const binarySearchTree = new BinarySearchTree();

binarySearchTree.insert(11);
binarySearchTree.insert(7);
binarySearchTree.insert(18);
binarySearchTree.insert(3);
binarySearchTree.insert(9);
binarySearchTree.insert(8);
binarySearchTree.insert(10);
binarySearchTree.insert(13);
binarySearchTree.insert(20);
binarySearchTree.insert(12);
binarySearchTree.insert(14);
binarySearchTree.insert(18);
binarySearchTree.insert(25);

binarySearchTree.removeKey(11);

binarySearchTree.inOrderTraverse(function (key) {
    console.log(key);
});