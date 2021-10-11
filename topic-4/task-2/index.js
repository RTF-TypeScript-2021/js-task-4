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
    [Hamburger.SIZE_SMALL]: {
        price: 50,
        kal: 20
    },
    [Hamburger.SIZE_LARGE]: {
        price: 100,
        kal: 40
    }
}
const stuffings = {
    [Hamburger.STUFFING_CHEESE]: {
        price: 10,
        kal: 20
    },
    [Hamburger.STUFFING_SALAD]: {
        price: 20,
        kal: 5
    },
    [Hamburger.STUFFING_POTATO]: {
        price: 15,
        kal: 10
    }
}
const toppings = {
    [Hamburger.TOPPING_MAYO]: {
        price: 20,
        kal: 5
    },
    [Hamburger.TOPPING_SPICE]: {
        price: 15,
        kal: 0
    }
}

function Hamburger(size, stuffing) {
    if (!(size in sizes) || !(stuffing in stuffings)) {
        throw new Error("wrong parametrs");
    }
       this.size = size;
       this.stuffing = stuffing;
       this.topping = [];
 
}
 
/*Добавить добавку к гамбургеру. Можно добавить несколько
* добавок, при условии, что они разные.
* @param topping     Тип добавки
* @throws {HamburgerException}  При неправильном использовании*/
Hamburger.prototype.addTopping = function (topping) {
    if (!(topping in toppings)) {
        throw new Error();
    }
    if(this.topping.includes(topping)){
        throw new Error('Такая добавка уже есть');
    }
    this.topping.push(topping);
}
 
/* Убрать добавку, при условии, что она ранее была
 * добавлена.
 * @param topping   Тип добавки
 * @throws {HamburgerException}  При неправильном использовании*/
 Hamburger.prototype.removeTopping = function (topping) {
    if (!(topping in toppings)) {
        throw new Error();
    }
    if(!(this.topping.includes(topping))){
        throw new Error('добавки нет');
    }
    this.topping = this.topping.filter(x => x !== topping);
 }
 
/* Получить список добавок.
 * @return {Array} Массив добавленных добавок, содержит константы
 *                 Hamburger.TOPPING_**/
 Hamburger.prototype.getToppings = function () {
    return this.topping;
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
    let result = sizes[this.size].price + stuffings[this.stuffing].price;
    for (const topping of this.topping) {
        result += toppings[topping].price;
    }
    return result;
}
 
 
/* Узнать калорийность
 * @return {Number} Калорийность в калориях */
Hamburger.prototype.calculateCalories = function () {
    let result = sizes[this.size].kal + stuffings[this.stuffing].kal;
    for (const topping of this.topping) {
        result += toppings[topping].kal;
    }
    return result;
}

module.exports.Hamburger = Hamburger;
