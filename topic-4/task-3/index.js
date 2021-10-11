"use strict"

const hamsterTypes = {
    speedy: "speedy",
    lazy: "lazy"
}

class Hamster {
    constructor(type) {
        this.stomach = []
        this.type = type
    }

    eat(food) {
        this.stomach.push(food);
    }
};

function getSpeedy() {
    return new Hamster(hamsterTypes.speedy);
}

function getLazy() {
    return new Hamster(hamsterTypes.lazy)
}

// Этот хомяк нашёл еду
getSpeedy().eat("apple");
console.log(getSpeedy().stomach); // apple

// У этого хомяка тоже есть еда. Почему? Исправьте
console.log(getLazy().stomach); // apple

module.exports.getSpeedy = getSpeedy;
module.exports.getLazy = getLazy;