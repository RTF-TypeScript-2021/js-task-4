"use strict"

const hamsterTypes = {
    speedy: "speedy",
    lazy: "lazy"
}

class Hamster {
    constructor(type) {
        this.stomach = [];
        this.type = type;
    }

    eat(food) {
        this.stomach.push(food);
    }
};

function getSpeedy() {
    return new Hamster(hamsterTypes.speedy);
}

function getLazy() {
    return new Hamster(hamsterTypes.lazy);
}

// Этот хомяк нашёл еду
const speedy = getSpeedy();
speedy.eat("apple");
console.log(speedy.stomach); // apple

console.log(getLazy().stomach); // empty

module.exports.getSpeedy = getSpeedy;
module.exports.getLazy = getLazy;