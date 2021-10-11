/**
    У нас есть два хомяка: шустрый (speedy) и ленивый (lazy); оба наследуют от общего объекта hamster.
    Когда мы кормим одного хомяка, второй тоже наедается. Почему? Как это исправить?
 */

function hamster() {
    this.stomach = [];
}

hamster.prototype.eat = function(food){
    this.stomach.push(food);
}

function getSpeedy() {
    const speedy = {
        __proto__ : hamster.prototype,
    };
    hamster.apply(speedy);

    return speedy;
}

function getLazy() {
    const lazy = {
        __proto__ : hamster.prototype,
    };
    hamster.apply(lazy);

    return lazy;
}

// Этот хомяк нашёл еду
getSpeedy().eat("apple");
console.log(getSpeedy().stomach); // apple

// У этого хомяка тоже есть еда. Почему? Исправьте
console.log(getLazy().stomach); // apple


module.exports.getSpeedy = getSpeedy;
module.exports.getLazy = getLazy;