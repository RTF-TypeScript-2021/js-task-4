/**
    У нас есть два хомяка: шустрый (speedy) и ленивый (lazy); оба наследуют от общего объекта hamster.
    Когда мы кормим одного хомяка, второй тоже наедается. Почему? Как это исправить?
 */

let hamster = {
    stomach: [],
    
    eat(food) {
        this.stomach.push(food);
    }
};

function getSpeedy() {
    let speedy = {
        stomach: [],
        __proto__: hamster
    };

    return speedy;
}

function getLazy() {
    let lazy = {
        stomach: [],
        __proto__: hamster
    };

    return lazy;
}

// Этот хомяк нашёл еду
getSpeedy().eat("apple");
console.log(getSpeedy().stomach); // apple
const speedy = getSpeedy();
speedy.eat("apple");
console.log(speedy.stomach);

// У этого хомяка тоже есть еда. Почему? Исправьте
console.log(getLazy().stomach); // apple
// А этот уже не нашел 
const lazy = getLazy();
console.log(lazy.stomach);


module.exports.getSpeedy = getSpeedy;
module.exports.getLazy = getLazy;