"use strict"

/* Размеры, виды начинок и добавок */
Hamburger.SIZE_SMALL = 'SIZE_SMALL'; //kal 20 price 50
Hamburger.SIZE_LARGE = 'SIZE_LARGE'; //kal 40 price 100
Hamburger.STUFFING_CHEESE = 'STUFFING_CHEESE'; //price 10 kal 20
Hamburger.STUFFING_SALAD = 'STUFFING_SALAD' //price 20 kal 5
Hamburger.STUFFING_POTATO = 'STUFFING_POTATO' //price 15 kal 10
Hamburger.TOPPING_MAYO = 'TOPPING_MAYO'; //price 20 kal 5
Hamburger.TOPPING_SPICE = 'TOPPING_SPICE'; //price 15

Hamburger.prototype.sizesData = {
    SIZE_SMALL: {
        cal: 20,
        price: 50
    },
    SIZE_LARGE: {
        cal: 40,
        price: 100
    },
};

Hamburger.prototype.stuffingsData = {
    STUFFING_CHEESE: {
        cal: 20,
        price: 10
    },
    STUFFING_SALAD: {
        cal: 5,
        price: 20
    },
    STUFFING_POTATO: {
        Cal: 10,
        Price: 15
    },
};

Hamburger.prototype.toppingsData = {
    TOPPING_MAYO: {
        cal: 5,
        price: 20
    },
    TOPPING_SPICE: {
        cal: 0,
        price: 15
    }
};

/**
* Класс, объекты которого описывают параметры гамбургера. 
* @constructor
* @param size Размер
* @param stuffing Начинка
*/
function Hamburger(size, stuffing) {
    if(!(size in this.sizesData) || !(stuffing in this.stuffingsData)) {
        throw new HamburgerException(`Invalid arguments. ${size}:${size in this.sizesData}, ${stuffing}:${stuffing in this.stuffingsData}`);
    }

    this.size = size;
    this.stuffing = stuffing;
    this.toppings = new Set();
}

/**
* Добавить добавку к гамбургеру. Можно добавить несколько
* добавок, при условии, что они разные.
* @param topping Тип добавки
* @throws {HamburgerException}  При неправильном использовании
 */
Hamburger.prototype.addTopping = function(topping) {
    if (!(topping in this.toppingsData)){
        throw new HamburgerException("Invalid arguments");
    }
    if (!(topping in this.toppingsData)){
        throw new HamburgerException(`${topping} already in hamburger`);
    }
    this.toppings.add(topping);
}

/**
* Убрать добавку, при условии, что она ранее была
* добавлена.
* @param topping Тип добавки
* @throws {HamburgerException}  При неправильном использовании
 */
Hamburger.prototype.removeTopping = function(topping) {
    if(!(topping in this.toppingsData)){
        throw new HamburgerException(`${topping} not in hamburger`);
    }
    this.toppings.delete(topping);
}

/**
 * Получить список добавок.
 * @return {Array} Массив добавленных добавок, содержит константы
 */
Hamburger.prototype.getToppings = function() {
    return Array.from(this.toppings);
}

/* Узнать размер гамбургера */
Hamburger.prototype.getSize = function() {
    return this.size;
}

/* Узнать начинку гамбургера */
Hamburger.prototype.getStuffing = function() {
    return this.stuffing;
}

/**
 * Узнать цену гамбургера
 * @return {Number} Цена в тугриках 
 */
Hamburger.prototype.calculatePrice = function() {
    return this.getToppings().reduce((sum, curr) => sum + this.toppingsData[curr].price, 0)
        + this.stuffingsData[this.stuffing].price
        + this.sizesData[this.size].price;
}
 
/**
 *  Узнать калорийность
 * @return {Number} Калорийность в калориях 
 * */
Hamburger.prototype.calculateCalories = function () {
    return this.getToppings().reduce((sum, curr) => sum + this.toppingsData[curr].cal, 0)
        + this.stuffingsData[this.stuffing].cal
        + this.sizesData[this.size].cal;
}

class HamburgerException extends Error {
    constructor(message) {
        super(message);
        this.name = "HamburgerException";
        this.message = message;
    }
}

module.exports.Hamburger = Hamburger;
