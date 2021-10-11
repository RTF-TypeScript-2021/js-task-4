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

module.exports.getSpeedy = getSpeedy;
module.exports.getLazy = getLazy;