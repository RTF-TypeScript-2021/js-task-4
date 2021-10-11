/**
 * Некая сеть фастфудов предлагает несколько видов гамбургеров:
 * маленький (50 тугриков, 20 калорий)
 * большой (100 тугриков, 40 калорий)
 * Гамбургер может быть с одним из нескольких видов начинок (обязательно):
 * сыром (+ 10 тугриков, + 20 калорий)
 * салатом (+ 20 тугриков, + 5 калорий)
 * картофелем (+ 15 тугриков, + 10 калорий)
 * Дополнительно, гамбургер можно посыпать приправой (+ 15 тугриков, 0 калорий) и полить майонезом (+ 20 тугриков, + 5 калорий).
 * Напиши программу, насчитывающую стоимость и калорийность гамбургера. Используй ООП подход (подсказка: нужен класс Гамбургер,
 * константы, методы для выбора опций и расчёта нужных величин).
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

function Hamburger (size, stuffing) {
    if (size !== Hamburger.SIZE_SMALL && size !== Hamburger.SIZE_SMALL
        || stuffing !== Hamburger.STUFFING_CHEESE && stuffing !== Hamburger.STUFFING_SALAD
        && stuffing !== Hamburger.STUFFING_POTATO) {
        throw new Error("HamburgerException. Wrong size or stuffing");
    }
    
    this.size = size;
    this.stuffing = stuffing;
    this.toppings = [];
}

Hamburger.prototype.prices = {
    SIZE_SMALL: 50,
    SIZE_LARGE: 100,
    STUFFING_CHEESE: 10,
    STUFFING_SALAD: 20,
    STUFFING_POTATO: 15,
    TOPPING_MAYO: 20,
    TOPPING_SPICE: 15
}

Hamburger.prototype.calories = {
    SIZE_SMALL: 20,
    SIZE_LARGE: 40,
    STUFFING_CHEESE: 20,
    STUFFING_SALAD: 5,
    STUFFING_POTATO: 10,
    TOPPING_MAYO: 5,
    TOPPING_SPICE: 0
}

/*Добавить добавку к гамбургеру. Можно добавить несколько
* добавок, при условии, что они разные.
* @param topping     Тип добавки
* @throws {HamburgerException}  При неправильном использовании*/
Hamburger.prototype.addTopping = function (topping) {
    if (topping !== Hamburger.TOPPING_SPICE && topping !== Hamburger.TOPPING_MAYO
        || this.toppings.includes(topping)) {
        throw new Error("HamburgerException. Wrong topping")
    }
    
    this.toppings.push(topping);
}

/* Убрать добавку, при условии, что она ранее была
 * добавлена.
 * @param topping   Тип добавки
 * @throws {HamburgerException}  При неправильном использовании*/
Hamburger.prototype.removeTopping = function (topping) {
    if (topping !== Hamburger.TOPPING_SPICE && topping !== Hamburger.TOPPING_MAYO
        || !this.toppings.includes(topping)) {
        throw new Error("HamburgerException. Wrong topping")
    }
    
    this.toppings = this.toppings.filter(item => item !== topping)
}

/* Получить список добавок.
 * @return {Array} Массив добавленных добавок, содержит константы
 *                 Hamburger.TOPPING_**/
Hamburger.prototype.getToppings = function () {
    return this.toppings;
}

/* Узнать размер гамбургера */
Hamburger.prototype.getSize = function () {
    return this.size;
}

/* Узнать начинку гамбургера */
Hamburger.prototype.getStuffing = function () {
    return this.stuffing;
}

/* Узнать цену гамбургера
 * @return {Number} Цена в тугриках */
Hamburger.prototype.calculatePrice = function () {
    let fullPrice = this.prices[this.size] + this.prices[this.stuffing];
    
    for (const i of this.toppings) {
        fullPrice += this.prices[i]
    }
    
    return fullPrice;
}


/* Узнать калорийность
 * @return {Number} Калорийность в калориях */
Hamburger.prototype.calculateCalories = function () {
    let fullCalories = this.calories[this.size] + this.calories[this.stuffing];
    
    for (const i of this.toppings) {
        fullCalories += this.calories[i]
    }
    
    return fullCalories;
}

module.exports.Hamburger = Hamburger;
