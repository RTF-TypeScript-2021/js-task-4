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

    return hamster.apply(speedy) || speedy;
}

function getLazy() {
    const lazy = {
        __proto__ : hamster.prototype,
    };

    return hamster.apply(lazy) || lazy;
}

// Этот хомяк нашёл еду
const speedy = getSpeedy();
speedy.eat("apple");
console.log(speedy.stomach); // apple

// У этого хомяка тоже есть еда. Почему? Исправьте
/*
    Объекты lazy и speedy не содержат поля speedy поэтому при вызове метода
    eat stomatch будет искаться в прототипе если в прототипе его не окажется, 
    то поиск будет продолжаться по цепочке прототипов.
    Так как в нашем случае  __proto__ содержит массив stomach, то он будет изменен. 
    На hamster ссылаются два объекта, поэтому при вызове getLazy().stomach
    мы получим  __proto__.stomach, который уже содержит "apple"

    Сделал из объекта hamster функцию конструктор, который вызывается с привязкой
    к новому созданному объекту. Теперь массив stomach у каждого объекта свой и
    не изменяется при вызове метода eat у другого объекта.
    
    В __proto__ положил hamster.prototype для доступа к методу eat из наследников
*/
console.log(getLazy().stomach); // apple


module.exports.getSpeedy = getSpeedy;
module.exports.getLazy = getLazy;