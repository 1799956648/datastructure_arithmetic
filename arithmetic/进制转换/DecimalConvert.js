
const Stack = require('../structure/stack/Stack.js');

const R = require('ramda');

const numPad = function (num, digit) {
    return String(num)
        .split('.')
        .reduce((result, str, idx) => {
            const isInteger = idx === 0;

            let nums = isInteger ? str.split('').reverse() : str.split('');

            let joinStr = '';

            while (nums.length) {
                let tempStr = nums.splice(0, digit).join('');

                while (tempStr.length < digit) tempStr += '0';

                joinStr += tempStr;
            };

            result += '.' + (isInteger ? joinStr.split('').reverse().join('') : joinStr);
            return result;
        }, [])
        .slice(1)
};

const zeroPrefixRuleOut = val => String(val).replace(/^0+/g, '');

/* 
    B（Binary)表示二进制，
    O（Octal）表示八进制，
    D（Decimal）或不加表示十进制，
    H（Hexadecimal）表示十六进制。
    例如：(101011)B = (53)O = (43)D = (2B)H
*/

const DecimalConvert = class {
    constructor() {
        this.codes = {
            // 十六进制转数字
            hexadecimalToNum: {
                'A': 10,
                'B': 11,
                'C': 12,
                'D': 13,
                'E': 14,
                'F': 15,
            },

            // 数字转十六进制
            numToHexadecimal: {
                10: 'A',
                11: 'B',
                12: 'C',
                13: 'D',
                14: 'E',
                15: 'F',
            },

            // 二进制转八进制编码
            binaryToOctal: {
                '000': 0,
                '001': 1,
                '010': 2,
                '011': 3,
                '100': 4,
                '101': 5,
                '110': 6,
                '111': 7,
            },

            // 八进制转二进制编码
            octalToBinary: {
                0: '000',
                1: '001',
                2: '010',
                3: '011',
                4: '100',
                5: '101',
                6: '110',
                7: '111',
            },

            // 二进制转十六进制编码
            binaryToHexadecimal: {
                '0000': '0',
                '0001': '1',
                '0010': '2',
                '0011': '3',
                '0100': '4',
                '0101': '5',
                '0110': '6',
                '0111': '7',
                '1000': '8',
                '1001': '9',
                '1010': 'A',
                '1011': 'B',
                '1100': 'C',
                '1101': 'D',
                '1110': 'E',
                '1111': 'F',
            },

            // 十六进制转二进制编码
            hexadecimaToBinary: {
                '0': '0000',
                '1': '0001',
                '2': '0010',
                '3': '0011',
                '4': '0100',
                '5': '0101',
                '6': '0110',
                '7': '0111',
                '8': '1000',
                '9': '1001',
                'A': '1010',
                'B': '1011',
                'C': '1100',
                'D': '1101',
                'E': '1110',
                'F': '1111',
            }
        };
    }

    // 十进制转二进制
    decimalTobinary(num) {
        /* 
            方法：除2取余法，即每次将整数部分除以2，余数为该位权上的数，而商继续除以2，余数又为上一个位权上的数，这个步骤一直持续下去，直到商为0为止，最后读数时候，从最后一个余数读起，一直到最前面的一个余数。 

            例：将十进制的(43)D转换为二进制的步骤如下：
            1. 将商43除以2，商21余数为1；
            2. 将商21除以2，商10余数为1；
            3. 将商10除以2，商5余数为0；
            4. 将商5除以2，商2余数为1；
            5. 将商2除以2，商1余数为0； 
            6. 将商1除以2，商0余数为1； 
            7. 读数，因为最后一位是经过多次除以2才得到的，因此它是最高位，读数字从最后的余数向前读，101011，即(43)D=(101011)B。
        */

        const decimalConvert = new Stack();

        let str = '';
        let quotient = num; // 商

        while (quotient > 0) {
            decimalConvert.push(quotient % 2); // 入栈
            quotient = Math.floor(quotient / 2); // 求商为0停止
        };

        while (!decimalConvert.isEmpty()) {
            str += decimalConvert.pop();
        };

        return zeroPrefixRuleOut(str);
    }

    // 十进制转八进制
    decimalToOctalVersionOne(num) {
        /* 
            方法1：除8取余法，即每次将整数部分除以8，余数为该位权上的数，而商继续除以8，余数又为上一个位权上的数，这个步骤一直持续下去，直到商为0为止，最后读数时候，从最后一个余数起，一直到最前面的一个余数。

            例：将十进制的(796)D转换为八进制的步骤如下：
            1. 将商796除以8，商99余数为4；
            2. 将商99除以8，商12余数为3；
            3. 将商12除以8，商1余数为4；
            4. 将商1除以8，商0余数为1；
            5. 读数，因为最后一位是经过多次除以8才得到的，因此它是最高位，读数字从最后的余数向前读，1434，即(796)D=(1434)O。      
        */
        const decimalConvert = new Stack();

        let str = '';
        let quotient = num; // 商

        while (quotient > 0) {
            decimalConvert.push(quotient % 8); // 入栈
            quotient = Math.floor(quotient / 8); // 求商为0停止
        };

        while (!decimalConvert.isEmpty()) {
            str += decimalConvert.pop();
        };

        return zeroPrefixRuleOut(str);
    }

    // 十进制转八进制
    decimalToOctalVersionTwo(num) {
        /* 
            方法2：使用间接法，先将十进制转换成二进制，然后将二进制又转换成八进制；
        */
        return this.binaryToOctal(this.decimalTobinary(num));
    }

    // 十转十六进制
    decimalToHexadecimal(num) {
        /* 
            方法1：除16取余法，即每次将整数部分除以16，余数为该位权上的数，而商继续除以16，余数又为上一个位权上的数，这个步骤一直持续下去，直到商为0为止，最后读数时候，从最后一个余数起，一直到最前面的一个余数。

            例：将十进制的(796)D转换为十六进制的步骤如下：
            1. 将商796除以16，商49余数为12，对应十六进制的C；
            2. 将商49除以16，商3余数为1；
            3. 将商3除以16，商0余数为3；
            4. 读数，因为最后一位是经过多次除以16才得到的，因此它是最高位，读数字从最后的余数向前读，31C，即(796)D=(31C)H。
        */

        const decimalConvert = new Stack();

        let str = '';
        let quotient = num; // 商

        while (quotient > 0) {

            const remainder = quotient % 16;

            decimalConvert.push(Reflect.has(this.codes.numTohexadecimal, remainder) ? this.codes.numTohexadecimal[remainder] : remainder); // 入栈
            quotient = Math.floor(quotient / 16); // 求商为0停止
        };

        while (!decimalConvert.isEmpty()) {
            str += decimalConvert.pop();
        };

        return zeroPrefixRuleOut(str);
    }

    // 二进制转十进制
    binaryToDecimal(num) {
        /* 
           方法：二进制数从低位到高位（即从右往左）计算，第0位的权值是2的0次方，第1位的权值是2的1次方，第2位的权值是2的2次方，依次递增下去，把最后的结果相加的值就是十进制的值了

           例：将二进制的(101011)B转换为十进制的步骤如下：
            1. 第0位 1 x 2^0 = 1；
            2. 第1位 1 x 2^1 = 2；
            3. 第2位 0 x 2^2 = 0；
            4. 第3位 1 x 2^3 = 8；
            5. 第4位 0 x 2^4 = 0；
            6. 第5位 1 x 2^5 = 32；
            7. 读数，把结果值相加，1+2+0+8+0+32=43，即(101011)B=(43)D。

            先数值分割依次放入栈中，通过不断取出栈顶的 (元素 * 2 ^ n) 相加等到最终的十进制数字
        */

        const decimalConvert = new Stack();

        let result = 0;
        let idx = 0;

        for (const val of String(num)) {
            decimalConvert.push(val); // 入栈
        };
        while (!decimalConvert.isEmpty()) {
            result += decimalConvert.pop() * (2 ** idx);
            idx++;
        };

        return zeroPrefixRuleOut(result);
    }

    // 二进制转八进制
    binaryToOctal(num) {
        // 011 010 111.010 011 100
        //  3   2   7 . 2   3   4

        // 100 101 100
        //  4   5   4
        //  454

        // 补全
        return zeroPrefixRuleOut(numPad(String(num)
            .replace(/\s+/g, ''), 3)
            .split('.')
            .reduce((str, value) => {
                const len = value.length / 3;
                for (let i = 0; i < len; i++) {
                    str += i === 0 ? '.' : '';
                    str += this.codes.binaryToOctal[value.slice(i * 3, (i + 1) * 3)];
                };
                return str;
            }, '')
            .slice(1));
    }

    // 二进制转十六进制
    binaryToHexadecimal(num) {
        // 补全
        return zeroPrefixRuleOut(numPad(String(num)
            .replace(/\s+/g, ''), 4)
            .split('.')
            .reduce((str, value) => {
                const len = value.length / 4;
                for (let i = 0; i < len; i++) {
                    str += i === 0 ? '.' : '';
                    str += this.codes.binaryToHexadecimal[value.slice(i * 4, (i + 1) * 4)];
                };
                return str;
            }, '')
            .slice(1));
    }

    // 八进制转十进制
    octalToDecimal(num) {
        /* 
            方法：八进制数从低位到高位（即从右往左）计算，第0位的权值是8的0次方，第1位的权值是8的1次方，第2位的权值是8的2次方，依次递增下去，把最后的结果相加的值就是十进制的值了。

          八进制就是逢8进1，八进制数采用 0～7这八数来表达一re个数。

          例：将八进制的(53)O转换为十进制的步骤如下：
            1. 第0位 3 x 8^0 = 3；
            2. 第1位 5 x 8^1 = 40；
            3. 读数，把结果值相加，3+40=43，即(53)O=(43)D。
        */

        const decimalConvert = new Stack();

        let idx = 0;
        let str = 0;

        for (const val of String(num)) {
            decimalConvert.push(val); // 入栈
        };

        while (!decimalConvert.isEmpty()) {
            str += decimalConvert.pop() * (8 ** idx);
            idx++;
        };

        return zeroPrefixRuleOut(str);
    }

    // 八进制转十六进制
    octalToHexadecimal(num) {
        return this.binaryToHexadecimal(this.octalToBinary(num));
    }

    // 八进制转二进制
    octalToBinary(num) {
        const decimalConvert = new Stack();
        for (let i = 0, val; val = String(num)[i++];) {
            decimalConvert.push(this.codes.octalToBinary[val]);
        };
        return zeroPrefixRuleOut(decimalConvert.toString().replace(/\,+/g, ''));
    }

    // 十六进制转十进制
    hexadecimalToDecimal(num) {
        const decimalConvert = new Stack();

        let idx = 0;
        let str = 0;

        for (const val of String(num)) {
            decimalConvert.push(val); // 入栈
        };

        while (!decimalConvert.isEmpty()) {
            const val = decimalConvert.pop().toLocaleUpperCase();
            const target = this.codes.hexadecimalToNum[val];
            str += (target ? target : val) * (16 ** idx);
            idx++;
        };

        return zeroPrefixRuleOut(str);
    }

    // 十六进制转二进制
    hexadecimalToBinary(num) {
        const decimalConvert = new Stack();

        for (let i = 0, val; val = String(num)[i++];) {
            decimalConvert.push(this.codes.hexadecimaToBinary[val.toLocaleUpperCase()])
        };

        return decimalConvert.toString().replace(/\,+/g, '');
    }

    // 十六进制转八进制
    hexadecimalToOctal(num) {
        return this.binaryToOctal(this.hexadecimalToBinary(num));
    }
};

// const decimalConvert = new DecimalConvert();

// 2 -> 10
// R.compose(console.log, Number.parseInt)('1010', 2)

// 10 -> 2
// R.compose(console.log, decimalConvert.decimalTobinary)(10)

// 2 -> 10
// console.log((796).toString(8));

// console.log(decimalConvert.binaryToDecimal(101011));
// console.log(decimalConvert.decimalTobinary(-43));
// console.log(decimalConvert.octalToDecimal(53));

// R.compose(console.log, decimalConvert.decimalToOctalVersionOne)(796)

// console.log(decimalConvert.hexadecimalToOctal('d7'));
// console.log(Number.parseInt('d7', 16).toString(8));