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
Hamburger.STUFFING_CHEESE = 'STUFFING_CHEESE'; //kal 20 price 10
Hamburger.STUFFING_SALAD = 'STUFFING_SALAD' //kal 5 price 20 
Hamburger.STUFFING_POTATO = 'STUFFING_POTATO' //kal 10 price 15 
Hamburger.TOPPING_MAYO = 'TOPPING_MAYO'; //kal 5 price 20 
Hamburger.TOPPING_SPICE = 'TOPPING_SPICE'; //kal 0 price 15

/* В массиве значений первым значением идет калорийность, вторым цена */
const SizeMap = new Map(
    [[Hamburger.SIZE_LARGE, [40, 100]], 
        [Hamburger.SIZE_SMALL, [20, 50]]]
);
const StuffingMap = new Map(
    [[Hamburger.STUFFING_CHEESE, [20, 10]], 
        [Hamburger.STUFFING_SALAD, [5, 20]],
        [Hamburger.STUFFING_POTATO, [10, 15]]]
);
const ToppingMap = new Map(
    [[Hamburger.TOPPING_MAYO, [5, 20]], 
        [Hamburger.TOPPING_SPICE, [0, 15]]]
);


/** Бросаем Гамбургерную ошибку */
function HamburgerException(message) {
    const hamburgerException = new Error(message);
    hamburgerException.name = "HamburgerException";

    return hamburgerException;
}

function Hamburger(size, stuffing) {
    if (!SizeMap.has(size)) {
        throw new HamburgerException(`Если вас не устраивают размеры наших бугеров, 
        напишите в книгу "жалобы и предложения", мы рассмотрим ваше предложение(нет)`);
    }
    if (!StuffingMap.has(stuffing)) {
        throw new HamburgerException(`Салат, патато или чиззз? Другого больше нет в меню, вот это сюрприззз`)
    }
    this.size = size;
    this.stuffing = stuffing;
    this.toppings = [];
}
 
/*Добавить добавку к гамбургеру. Можно добавить несколько
* добавок, при условии, что они разные.
* @param topping     Тип добавки
* @throws {HamburgerException}  При неправильном использовании*/
Hamburger.prototype.addTopping = function (topping) {
    if (!ToppingMap.has(topping)) {
        throw new HamburgerException(`У нас пока что нет звезды мишлен, поэтому прийдется выбирать между мазиком и приправой`);
    }
    if (this.toppings.includes(topping)) {
        throw new HamburgerException(`Зачем так много? Может просто майонез дома поешь?`);
    }
    this.toppings.push(topping);
}
 
/* Убрать добавку, при условии, что она ранее была
 * добавлена.
 * @param topping   Тип добавки
 * @throws {HamburgerException}  При неправильном использовании*/
Hamburger.prototype.removeTopping = function (topping) {
    const toppingIndex = this.toppings.indexOf(topping);
    if (toppingIndex === -1) {
        throw new HamburgerException(`Ты итак не просил добавить ${topping}`);
    } 
    this.toppings.splice(toppingIndex, 1);
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
    let price = SizeMap.get(this.size)[1] + StuffingMap.get(this.stuffing)[1];
    for (let i = 0; i < this.toppings.length; i++) {
        price += ToppingMap.get(this.toppings[i])[1];
    }

    return price;
}
 
 
/* Узнать калорийность
 * @return {Number} Калорийность в калориях */
Hamburger.prototype.calculateCalories = function () {
    let cal = SizeMap.get(this.size)[0] + StuffingMap.get(this.stuffing)[0];
    for (let i = 0; i < this.toppings.length; i++) {
        cal += ToppingMap.get(this.toppings[i])[0];
    }

    return cal;
}

module.exports.Hamburger = Hamburger;