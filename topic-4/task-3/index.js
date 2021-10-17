/**
    У нас есть два хомяка: шустрый (speedy) и ленивый (lazy); оба наследуют от общего объекта hamster.
    Когда мы кормим одного хомяка, второй тоже наедается. Почему? Как это исправить?
 */

const hamster = {
    stomach: [],
    
    eat (food) {
        this.stomach.push(food);
    }
};

function getSpeedy () {
    return {
        stomach: [],
        __proto__: hamster
    };
}

function getLazy () {
    return {
        stomach: [],
        __proto__: hamster
    };
}


const speedy = getSpeedy();
const lazy = getLazy();

// Этот хомяк нашёл еду
speedy.eat("apple");
console.log(speedy.stomach);

// У этого хомяка тоже есть еда. Почему? Исправьте
console.log(lazy.stomach);


module.exports.getSpeedy = getSpeedy;
module.exports.getLazy = getLazy;