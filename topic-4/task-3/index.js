/**
    У нас есть два хомяка: шустрый (speedy) и ленивый (lazy); оба наследуют от общего объекта hamster.
    Когда мы кормим одного хомяка, второй тоже наедается. Почему? Как это исправить?
 */

function Hamster () {
    this.stomach = [];
}

Hamster.prototype.eat = function(food) {
    this.stomach.push(food);
}
   
function getSpeedy() {
    return new Hamster();
}
    
function getLazy() {
    return new Hamster();
}
    
const speedy = getSpeedy();
speedy.eat("apple");
console.log(speedy.stomach); 
const lazy = getLazy();
console.log(lazy.stomach); // apple
    
    
module.exports.getSpeedy = getSpeedy;
module.exports.getLazy = getLazy;