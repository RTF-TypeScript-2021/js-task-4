/**
    У нас есть два хомяка: шустрый (speedy) и ленивый (lazy); оба наследуют от общего объекта hamster.
    Когда мы кормим одного хомяка, второй тоже наедается. Почему? Как это исправить?
 */

const hamster = {
    eat(food) {
        this.stomach.push(food);
    }
};

function getSpeedy() {
    const speedy = {
        stomach: [],
        __proto__: hamster
    };

    return speedy;
}

function getLazy() {
    const lazy = {
        stomach: [],
        __proto__: hamster
    };

    return lazy;
}

// Этот хомяк нашёл еду
const speedy = getSpeedy();
speedy.eat("apple");
console.log(speedy.stomach); // apple

// У этого хомяка тоже есть еда. Почему? Исправьте
console.log(getLazy().stomach); // apple


module.exports.getSpeedy = getSpeedy;
module.exports.getLazy = getLazy;