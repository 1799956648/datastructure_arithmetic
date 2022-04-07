const dbQueue = new (require('../structure/queue/DBqueue'));

const R = require('ramda');

const {
    random,
    floor,
} = Math;

const randomInt = function (min, max) {
    return floor(random() * (max - min) + min);
};

/* 
    击鼓传花
        在这个游戏中,孩子们围成一个圆圈,把花尽快地传递给旁边的人。
        某一时刻传花停止,这个时候花在谁手里,谁就退出圆圈、结束游戏。
        重复这个过程直到只剩一个孩子(胜者)

    游戏规则:
        我们会得到一份名单,把里面的名字全都加入队列。给定一个数字,然后迭代队列。
        从队列开头移除一项,再将其添加到队列末尾模拟击鼓传花(如果你把花传给了旁边的人,你被淘汰的威胁就立刻解除了) 。
        一旦达到给定的传递次数,拿着花的那个人就被淘汰了(从队列中移除) 。
        最后只剩下一个人的时候,这个人就是胜者。

    a > b > c：三位玩家
    玩4局
    第一次：结果，淘汰玩家 b
        b > c > a
        c > a > b
        a > b > c
        b > c > a
    第二次：结果，淘汰玩家 c
        a > c
        c > a
        a > c
        c > a
    最终结果，淘汰玩家 [b、c]，赢家 a
*/
const hotpotato = function (player, num) {
    const eliminatedList = []; // 淘汰者

    for (let i = 0; i < player.length; i++) {
        dbQueue.addBack(player[i]);
    };

    // 还有玩家，继续当前游戏
    while (dbQueue.size() > 1) {
        for (let i = 0; i < num; i++) {
            // 安全的玩家继续排到队伍后面
            dbQueue.addBack(dbQueue.removeFront());
        };

        // 排在首位的，为本局游戏淘汰的玩家
        eliminatedList.push(dbQueue.removeFront());
    };

    return {
        eliminated: eliminatedList,
        winner: dbQueue.removeFront(),
    };
};

const nameArr = ['a', 'b', 'c'];

// R.compose(console.log, hotpotato)(nameArr, randomInt(1, 20));

R.compose(console.log, hotpotato)(nameArr, 4);
