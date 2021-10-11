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

function Hamburger(size, stuffing) {
    this.size = size;
    this.stuffing = stuffing;
    this.toppings = []
}

Hamburger.prototype.getPriceOrCalories = function (property, target) {
    const data = {
        SIZE_SMALL: {
            calories: 20,
            price: 50
        },
        SIZE_LARGE: {
            calories: 40,
            price: 100
        },
        STUFFING_CHEESE: {
            calories: 20,
            price: 10
        },
        STUFFING_SALAD: {
            calories: 5,
            price: 20
        },
        STUFFING_POTATO: {
            calories: 10,
            price: 15
        },
        TOPPING_MAYO: {
            calories: 5,
            price: 20
        },
        TOPPING_SPICE: {
            calories: 0,
            price: 15
        }
    }

    return data[property][target];
}
 
/*Добавить добавку к гамбургеру. Можно добавить несколько
* добавок, при условии, что они разные.
* @param topping     Тип добавки
* @throws {HamburgerException}  При неправильном использовании*/
Hamburger.prototype.addTopping = function (topping) {
    if (!(topping in this)){
        this.toppings.push(topping);
    } else {
        throw new Error('HamburgerException');
    }
}

 
/* Убрать добавку, при условии, что она ранее была
 * добавлена.
 * @param topping   Тип добавки
 * @throws {HamburgerException}  При неправильном использовании*/
Hamburger.prototype.removeTopping = function (topping) {
    const index = this.toppings.indexOf(topping, 0);
    if (index === -1) {
        throw new Error('HamburgerException');
    } else {
        this.toppings.splice(index, 1);
    }
}
 
/* Получить список добавок.
 * @return {Array} Массив добавленных добавок, содержит константы
 *                 Hamburger.TOPPING_**/
Hamburger.prototype.getToppings = function () {
    return this.toppings;
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
    let result = this.getPriceOrCalories(this.size, 'price')
        + this.getPriceOrCalories(this.stuffing, 'price');

    this.toppings.forEach(topping => {
        result += this.getPriceOrCalories(topping, 'price');
    });

    return result;
}
 
 
/* Узнать калорийность
 * @return {Number} Калорийность в калориях */
Hamburger.prototype.calculateCalories = function () {
    let result = this.getPriceOrCalories(this.size, 'calories')
        + this.getPriceOrCalories(this.stuffing, 'calories');

    this.toppings.forEach(topping => {
        result += this.getPriceOrCalories(topping, 'calories');
    });

    return result;
}

module.exports.Hamburger = Hamburger;
