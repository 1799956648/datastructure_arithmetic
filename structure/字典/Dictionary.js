/**
 * 字典
 */
const Dictionary = class {
    constructor() {
        this.table = {};
    }

    toStringFn(item) {
        // 存在一个feature: 部分值的情况下, 会导致, 出现重复的key
        if (item === null) {
            return 'Null'
        } else if (item === undefined) {
            return 'Underfined';
        } else if (typeof item === 'string' || item instanceof String) {
            return `${item}`;
        }
        return item.toString();
    }
};