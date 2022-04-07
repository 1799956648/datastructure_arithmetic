const dbQueue = new (require('../structure/queue/DBqueue'));

const R = require('ramda');

const palindromeChecker = function (str) {
    const lowerString = str.toLocaleLowerCase().replace(/\s/g, '');

    for (let i = 0; i < lowerString.length; i++) {
        dbQueue.addBack(lowerString.charAt(i));
    };

    let isEqual = true;

    while (dbQueue.size() > 1 && isEqual) {
        isEqual = dbQueue.removeFront() === dbQueue.removeBack();
    };

    return isEqual;
};

R.compose(console.log, palindromeChecker)('a');