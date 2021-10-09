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

Hamburger.SIZES = [Hamburger.SIZE_SMALL, Hamburger.SIZE_LARGE];
Hamburger.STUFFING = [Hamburger.STUFFING_CHEESE, Hamburger.STUFFING_SALAD, Hamburger.STUFFING_POTATO];
Hamburger.TOPPINGS = [Hamburger.TOPPING_SPICE, Hamburger.TOPPING_MAYO];

Hamburger.PRICES = {[Hamburger.SIZE_SMALL]: 50, [Hamburger.SIZE_LARGE]: 100,
    [Hamburger.STUFFING_CHEESE]: 10, [Hamburger.STUFFING_SALAD]: 20,
    [Hamburger.STUFFING_POTATO]: 15, [Hamburger.TOPPING_MAYO]: 20,
    [Hamburger.TOPPING_SPICE]: 15};

Hamburger.CALORIES = {[Hamburger.SIZE_SMALL]: 20, [Hamburger.SIZE_LARGE]: 40,
    [Hamburger.STUFFING_CHEESE]: 20, [Hamburger.STUFFING_SALAD]: 5,
    [Hamburger.STUFFING_POTATO]: 10, [Hamburger.TOPPING_MAYO]: 5,
    [Hamburger.TOPPING_SPICE]: 0};


function Hamburger(size, ...stuffing) {
    if (Hamburger.SIZES.indexOf(size) === -1){
        throw new Error("HamburgerException. Size is incorrect.");
    }
    if (stuffing.some(stuff => Hamburger.STUFFING.indexOf(stuff) === -1)){
        throw new Error("HamburgerException. Stuffing is incorrect.");
    }
    
    this.size = size; 
    this.stuffing = stuffing;
    this.toppings = []
}

 
/*Добавить добавку к гамбургеру. Можно добавить несколько
* добавок, при условии, что они разные.
* @param topping     Тип добавки
* @throws {HamburgerException}  При неправильном использовании*/
Hamburger.prototype.addTopping = function (topping) {
    if (Hamburger.TOPPINGS.indexOf(topping) === -1){
        throw new Error("HamburgerException. Topping is incorrect.");
    }

    this.toppings.push(topping);
}
 
/* Убрать добавку, при условии, что она ранее была
 * добавлена.
 * @param topping   Тип добавки
 * @throws {HamburgerException}  При неправильном использовании*/
Hamburger.prototype.removeTopping = function (topping) {
    if (Hamburger.TOPPINGS.indexOf(topping) === -1){
        throw new Error("HamburgerException. Topping is incorrect.");
    }

    this.toppings.splice(topping.indexOf(topping), 1);
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

Hamburger.prototype.calculate = function (valuesProvider) {
    const stuffingValues = this.stuffing.map(stuff => valuesProvider[stuff]);
    const stuffingValuesSum = stuffingValues.reduce((cost, stuffPrice) => cost + stuffPrice);
    const toppingValues = this.toppings.map(topping => valuesProvider[topping]);
    const toppingValuesSum = toppingValues.reduce((cost, toppingPrice) => cost + toppingPrice);

    return valuesProvider[this.size] + stuffingValuesSum + toppingValuesSum;
}

/* Узнать цену гамбургера
 * @return {Number} Цена в тугриках */
Hamburger.prototype.calculatePrice = function () {
    return this.calculate(Hamburger.PRICES);
}
 
 
/* Узнать калорийность
 * @return {Number} Калорийность в калориях */
Hamburger.prototype.calculateCalories = function () {
    return this.calculate(Hamburger.CALORIES);
}

module.exports.Hamburger = Hamburger;
