/**
* Некая сеть фастфудов предлагает несколько видов гамбургеров:
* маленький (50 тугриков, 20 калорий)
* большой (100 тугриков, 40 калорий)
* Гамбургер может быть с одним из нескольких видов начинок (обязательно):
* сыром (+ 10 тугриков, + 20 калорий)
* салатом (+ 20 тугриков, + 5 калорий)
* картофелем (+ 15 тугриков, + 10 калорий)
* Дополнительно, гамбургер можно посыпать приправой (+ 15 тугриков, 0 калорий) и полить майонезом (+ 20 тугриков, + 5 калорий).
* Напиши программу, расчиытвающую стоимость и калорийность гамбургера. Используй ООП подход (подсказка: нужен класс Гамбургер, 
* константы, методы для выбора опций и рассчета нужных величин).
* Код должен быть защищен от ошибок. Представь, что твоим классом будет пользоваться другой программист. 
* Если он передает неправильный тип гамбургера, например, или неправильный вид добавки, должно выбрасываться исключение 
* (ошибка не должна молча игнорироваться).
*/


/**
* Класс, объекты которого описывают параметры гамбургера. 
* 
* @constructor
* @param size        Размер
* @param stuffing    Начинка
*/

/* Размеры, виды начинок и добавок */
Hamburger.SIZE_SMALL = 'SIZE_SMALL'; //kal 20 price 50
Hamburger.SIZE_LARGE = 'SIZE_LARGE'; //kal 40 price 100
Hamburger.STUFFING_CHEESE = 'STUFFING_CHEESE'; //price 10 kal 20
Hamburger.STUFFING_SALAD = 'STUFFING_SALAD' //price 20 kal 5
Hamburger.STUFFING_POTATO = 'STUFFING_POTATO' //price 15 kal 10
Hamburger.TOPPING_MAYO = 'TOPPING_MAYO'; //price 20 kal 5
Hamburger.TOPPING_SPICE = 'TOPPING_SPICE'; //price 15

const sizes = {
    "SIZE_SMALL": {
        kal: 20,
        price: 50
    },
    "SIZE_LARGE": {
        kal: 40,
        price: 100
    }
}
const stuffings = {
    "STUFFING_CHEESE": {
        kal: 20,
        price: 10
    },
    "STUFFING_SALAD": {
        kal: 5,
        price: 20
    },
    "STUFFING_POTATO": {
        kal: 10,
        price: 15
    }
}
const toppings = {
    "TOPPING_MAYO": {
        kal: 5,
        price: 20
    },
    "TOPPING_SPICE": {
        kal: 0,
        price: 15
    }
}

function Hamburger(size, stuffing) {
    if (!(size in sizes) || !(stuffing in stuffings)) {
        throw new Error("Wrong argument size or stuffing!");
    }
    this.size = size;
    this.stuffing = stuffing;
    this.ourToppings = [];
}
 
/*Добавить добавку к гамбургеру. Можно добавить несколько
* добавок, при условии, что они разные.
* @param topping     Тип добавки
* @throws {HamburgerException}  При неправильном использовании*/
Hamburger.prototype.addTopping = function (topping) {
    if (!(topping in toppings) || this.ourToppings.includes(topping)) {
        throw new Error("Wrong argument topping!");
    }
    this.ourToppings.push(topping);
}
 
/* Убрать добавку, при условии, что она ранее была
 * добавлена.
 * @param topping   Тип добавки
 * @throws {HamburgerException}  При неправильном использовании*/
 Hamburger.prototype.removeTopping = function (topping) {
    if (!(topping in toppings) || !this.ourToppings.includes(topping)) {
        throw new Error("Wrong argument topping!");
    }
    this.ourToppings = this.ourToppings.splice(this.ourToppings.indexOf(topping), 1);
 }
 
/* Получить список добавок.
 * @return {Array} Массив добавленных добавок, содержит константы
 *                 Hamburger.TOPPING_**/
 Hamburger.prototype.getToppings = function () {
    return this.ourToppings;
 }
 
/* Узнать размер гамбургера */
Hamburger.prototype.getSize = function (size) {  
    return this.size;
}
 
/* Узнать начинку гамбургера */
Hamburger.prototype.getStuffing = function () {
    return this.stuffing;
}
 
/* Узнать цену гамбургера
 * @return {Number} Цена в тугриках */
Hamburger.prototype.calculatePrice = function () {
    let price = 0;
    for (let topping of this.ourToppings){
        price += toppings[topping].price;
    }
    return sizes[this.size].price + stuffings[this.stuffing].price +price;
}
 
 
/* Узнать калорийность
 * @return {Number} Калорийность в калориях */
Hamburger.prototype.calculateCalories = function () {
    let kalories = 0;
    for (let topping of this.ourToppings){
        kalories += toppings[topping].kal;
    }
    return sizes[this.size].kal + stuffings[this.stuffing].kal + kalories;
}

module.exports.Hamburger = Hamburger;
