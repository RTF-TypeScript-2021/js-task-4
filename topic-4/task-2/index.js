/**
* Некая сеть фастфудов предлагает несколько видов гамбургеров:
* маленький (50 тугриков, 20 калорий)
* большой (100 тугриков, 40 калорий)
* Гамбургер может быть с одним из нескольких видов начинок (обязательно):
* сыром (+ 10 тугриков, + 20 калорий)
* салатом (+ 20 тугриков, + 5 калорий)
* картофелем (+ 15 тугриков, + 10 калорий)
* Дополнительно, гамбургер можно посыпать приправой (+ 15 тугриков, 0 калорий) и полить майонезом (+ 20 тугриков, + 5 калорий).
* Напиши программу, рассчитывающую стоимость и калорийность гамбургера. Используй ООП подход (подсказка: нужен класс Гамбургер,
* константы, методы для выбора опций и расчета нужных величин).
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

const kalAndCostSizeOfHamburgers = {
    'SIZE_SMALL' : {
        kal: 20,
        price: 50
    },
    'SIZE_LARGE' : {
        kal: 40,
        price: 100
    }
}

const kalAndCostToppingOfHamburgers = {
    'TOPPING_MAYO' : {
        kal: 5,
        price: 20
    },
    'TOPPING_SPICE' : {
        kal: 0,
        price: 15
    }
}

const kalAndCostStuffingOfHamburgers = {
    'STUFFING_CHEESE' : {
        kal: 20,
        price: 10
    },
    'STUFFING_SALAD' : {
        kal: 5,
        price: 20
    },
    'STUFFING_POTATO' : {
        kal: 10,
        price: 15
    }
}

function isNotRightRequestForBurger(size, stuffing) {
    let errorSizeFlag = true;
    let errorStuffingFlag = true;
    for (const baseSize in kalAndCostSizeOfHamburgers) {
        if (baseSize === size) {
            errorSizeFlag = false;
            break;
        }
    }
    for (const baseStuffing in kalAndCostStuffingOfHamburgers) {
        if (baseStuffing === stuffing) {
            errorStuffingFlag = false;
            break;
        }
    }

    return errorSizeFlag || errorStuffingFlag;
}

function Hamburger(size, stuffing) {
    if (isNotRightRequestForBurger(size, stuffing)) {
        throw new Error("The input data for Hamburger has wrong type");
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
    if (topping !== Hamburger.TOPPING_MAYO && topping !== Hamburger.TOPPING_SPICE) {
        throw new Error("HamburgerException");
    } else if (!this.topping.includes(topping)) {
        this.topping.push(topping);
    }
}
 
/* Убрать добавку, при условии, что она ранее была
 * добавлена.
 * @param topping   Тип добавки
 * @throws {HamburgerException}  При неправильном использовании*/
Hamburger.prototype.removeTopping = function (topping) {
    if (topping !== Hamburger.TOPPING_MAYO && topping !== Hamburger.TOPPING_SPICE
        && !this.topping.includes(topping)) {
        throw new Error("HamburgerException");
    }
    const i = this.topping.indexOf(topping);
    this.topping.splice(i,1);
}
 
/* Получить список добавок.
 * @return {Array} Массив добавленных добавок, содержит константы
 *                 Hamburger.TOPPING_**/
Hamburger.prototype.getToppings = function () {
    return this.topping;
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
    let toppingPrice = 0;
    for (const topping of this.topping) {
        toppingPrice += kalAndCostToppingOfHamburgers[topping].price;
    }

    return kalAndCostSizeOfHamburgers[this.size].price
        + kalAndCostStuffingOfHamburgers[this.stuffing].price
        + toppingPrice;
}
 
 
/* Узнать калорийность
 * @return {Number} Калорийность в калориях */
Hamburger.prototype.calculateCalories = function () {
    let toppingKal = 0;
    for (const topping of this.topping) {
        toppingKal += kalAndCostToppingOfHamburgers[topping].kal;
    }

    return kalAndCostSizeOfHamburgers[this.size].kal
        + kalAndCostStuffingOfHamburgers[this.stuffing].kal
        + toppingKal;
}

module.exports.Hamburger = Hamburger;
