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
Hamburger.STUFFING_SALAD = 'STUFFING_SALAD'; //price 20 kal 5
Hamburger.STUFFING_POTATO = 'STUFFING_POTATO'; //price 15 kal 10
Hamburger.TOPPING_MAYO = 'TOPPING_MAYO'; //price 20 kal 5
Hamburger.TOPPING_SPICE = 'TOPPING_SPICE'; //price 15

const prices = {TOPPING_SPICE: 15, TOPPING_MAYO: 20, STUFFING_POTATO: 15, STUFFING_SALAD: 20,
    STUFFING_CHEESE: 10, SIZE_LARGE: 100, SIZE_SMALL: 50}

const kalories = {TOPPING_SPICE: 0, TOPPING_MAYO: 5, STUFFING_POTATO: 10, STUFFING_SALAD: 5,
    STUFFING_CHEESE: 20, SIZE_LARGE: 40, SIZE_SMALL: 20}

function Hamburger(size, stuffing) {
    if(size !== Hamburger.SIZE_SMALL && size !== Hamburger.SIZE_LARGE){
        throw new Error('Неправильно задан размер');
    }
    if(stuffing !== Hamburger.STUFFING_CHEESE && stuffing !== Hamburger.STUFFING_SALAD  && stuffing !== Hamburger.STUFFING_POTATO) {
        throw new Error("Не задано обязательной начинки");
    }
    this.stuffing = stuffing;
    this.size = size;
    this.topping = [];
    this.price = prices[size] + prices[stuffing];
    this.kalory = kalories[size] + kalories[stuffing];
}
 
/*Добавить добавку к гамбургеру. Можно добавить несколько
* добавок, при условии, что они разные.
* @param topping     Тип добавки
* @throws {HamburgerException}  При неправильном использовании*/
Hamburger.prototype.addTopping = function (topping) {
    if(topping !== Hamburger.TOPPING_MAYO && topping !== Hamburger.TOPPING_SPICE  && this.topping.includes(topping)) {
        throw "HamburgerException";
    }
    this.topping.push(topping);
    this.price += prices[topping];
    this.kalory += kalories[topping];
}
 
/* Убрать добавку, при условии, что она ранее была
 * добавлена.
 * @param topping   Тип добавки
 * @throws {HamburgerException}  При неправильном использовании*/
Hamburger.prototype.removeTopping = function (topping) {
    const toppingIndex = this.topping.indexOf(topping);
    if (toppingIndex === -1) {
        throw Error();
    } 
    this.topping.splice(toppingIndex, 1);
    this.price -= prices[topping]
    this.kalory -= kalories[topping]
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
    return this.stuffing
}
 
/* Узнать цену гамбургера
 * @return {Number} Цена в тугриках */
Hamburger.prototype.calculatePrice = function () {
    return this.price;
}
 
 
/* Узнать калорийность
 * @return {Number} Калорийность в калориях */
Hamburger.prototype.calculateCalories = function () {
    return this.kalory;
}

module.exports.Hamburger = Hamburger;
