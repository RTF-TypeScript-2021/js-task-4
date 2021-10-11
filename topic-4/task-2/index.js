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
Hamburger.PRICESANDKALS = createDictOfKalAndPrice();
function createDictOfKalAndPrice() {
    const PRICESANDKALS = new Map();
    PRICESANDKALS.set(Hamburger.SIZE_LARGE, [40, 100]); 
    PRICESANDKALS.set(Hamburger.SIZE_SMALL, [20, 50]);
    PRICESANDKALS.set(Hamburger.STUFFING_CHEESE, [20, 10]);
    PRICESANDKALS.set(Hamburger.STUFFING_SALAD, [5, 20]);
    PRICESANDKALS.set(Hamburger.STUFFING_POTATO, [10, 15]);
    PRICESANDKALS.set(Hamburger.TOPPING_MAYO, [5, 20]);
    PRICESANDKALS.set(Hamburger.TOPPING_SPICE, [0, 15]);

    return PRICESANDKALS;
};
function Hamburger(size, stuffing) {
    if (!(size in Hamburger) || !(stuffing in Hamburger)) {
        throw new HamburgerException("stuffing или size некорректны");
    }
    this.stuffing = stuffing;
    this.size = size; 
}

/*Добавить добавку к гамбургеру. Можно добавить несколько
* добавок, при условии, что они разные.
* @param topping     Тип добавки
* @throws {HamburgerException}  При неправильном использовании*/
Hamburger.prototype.addTopping = function (topping) {
    if (this.toppings === undefined) {
        this.toppings = [];
    }
    if (!(topping in Hamburger) || this.toppings.includes(topping)) {
        throw new HamburgerException("topping неверный или уже присутсвует в бургере");
    }   
    this.toppings.push(topping);  
}
/* Убрать добавку, при условии, что она ранее была
 * добавлена.
 * @param topping   Тип добавки
 * @throws {HamburgerException}  При неправильном использовании*/
Hamburger.prototype.removeTopping = function (topping) {
    if (this.toppings === undefined) {
        this.toppings = [];      
    }
    if (!(topping in Hamburger) || !(this.toppings.includes)) {
        throw new HamburgerException("Неверный topping или такого нету в Бургере");
    }
    this.toppings.splice(this.toppings.indexOf(topping), 1);
}
 
/* Получить список добавок.
 * @return {Array} Массив добавленных добавок, содержит константы
 *                 Hamburger.TOPPING_**/
Hamburger.prototype.getToppings = function () {
    return this.toppings?? [];
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
    this.toppings.forEach(element => {
        price += Hamburger.PRICESANDKALS.get(element)[1];
    });
    price += Hamburger.PRICESANDKALS.get(this.size)[1];
    price += Hamburger.PRICESANDKALS.get(this.stuffing)[1];

    return price;
}
 
 
/* Узнать калорийность
 * @return {Number} Калорийность в калориях */
Hamburger.prototype.calculateCalories = function () {
    let kal = 0;
    this.toppings.forEach(element => {
        kal += Hamburger.PRICESANDKALS.get(element)[0];
    });
    kal += Hamburger.PRICESANDKALS.get(this.size)[0];
    kal += Hamburger.PRICESANDKALS.get(this.stuffing)[0];
   
    return kal;
}

function HamburgerException(message) {
    this.message = message;
    this.exeptionName = "Ошибка Бургера";
}

module.exports.Hamburger = Hamburger;
