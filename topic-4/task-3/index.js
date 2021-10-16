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
    const speedy = new hamster();

    return speedy;
}

function getLazy() {
    const lazy = new hamster();

    return lazy;
}

// Этот хомяк нашёл еду
const speedy = getSpeedy();
speedy.eat("apple");
console.log(speedy.stomach);

// А этот уже не нашел 
const lazy = getLazy();
console.log(lazy.stomach);


module.exports.getSpeedy = getSpeedy;
module.exports.getLazy = getLazy;