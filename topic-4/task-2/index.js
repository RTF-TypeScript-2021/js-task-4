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
Hamburger.SIZE_SMALL = {
    type: 'SIZE_SMALL',
    kal : 20,
    price : 50,
}; //kal 20 price 50
Hamburger.SIZE_LARGE = {
    type : 'SIZE_LARGE',
    kal : 40,
    price : 100,
}; //kal 40 price 100
Hamburger.STUFFING_CHEESE = {
    type : 'STUFFING_CHEESE',
    kal : 20,
    price : 10,
}; //price 10 kal 20
Hamburger.STUFFING_SALAD = {
    type : 'STUFFING_SALAD',
    kal : 5,
    price : 20,
}; //price 20 kal 5
Hamburger.STUFFING_POTATO = {
    type : 'STUFFING_POTATO',
    kal : 10,
    price : 15,
}; //price 15 kal 10
Hamburger.TOPPING_MAYO = {
    type : 'TOPPING_MAYO',
    kal : 5,
    price : 20,
} ; //price 20 kal 5
Hamburger.TOPPING_SPICE = {
    type : 'TOPPING_SPICE',
    kal : 0,
    price : 15,
};
//price 15

function Hamburger(size, stuffing) {
    if(Hamburger[size.type] === undefined){
        throw Error();
    }
    if(Hamburger[stuffing.type] === undefined){
        throw Error();
    }
    this.size = size;
    this.stuffing = stuffing; //TODO: одна начинка должна быть обязательно
    this.toppings = []; 
}
/*Добавить добавку к гамбургеру. Можно добавить несколько
* добавок, при условии, что они разные.
* @param topping     Тип добавки
* @throws {HamburgerException}  При неправильном использовании*/
Hamburger.prototype.addTopping = function (topping) {
    if(Hamburger[topping.type] === undefined){
        throw Error();
    }
    if(this.toppings.includes(topping)){
        throw Error();
    }
    this.toppings.push(topping);
}
 
/* Убрать добавку, при условии, что она ранее была
 * добавлена.
 * @param topping   Тип добавки
 * @throws {HamburgerException}  При неправильном использовании*/
Hamburger.prototype.removeTopping = function (topping) {
    const toppingIdx = this.toppings.indexOf(topping);
    if (topping === -1){
        throw new Error();
    }else {
        this.toppings.splice(toppingIdx,1);
    }
}
 
/* Получить список добавок.
 * @return {Array} Массив добавленных добавок, содержит константы
 *                 Hamburger.TOPPING_**/
Hamburger.prototype.getToppings = function () {
    return this.toppings.slice();
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
    const priceHumburger = this.size.price + this.stuffing.price;
    const priceTopic = this.toppings.reduce((acc,toppig)=>acc+toppig.price,0);
    
    return priceHumburger + priceTopic;
}
 
 
/* Узнать калорийность
 * @return {Number} Калорийность в калориях */
Hamburger.prototype.calculateCalories = function () {
    const kalHumburger = this.size.kal + this.stuffing.kal;
    const kalTopic = this.toppings.reduce((acc,toppig)=>acc+toppig.kal,0);
    
    return kalHumburger + kalTopic;
}

module.exports.Hamburger = Hamburger;
