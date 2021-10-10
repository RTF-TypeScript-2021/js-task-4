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
 if(size !== 'SIZE_LARGE' && size !== 'SIZE_SMALL'){
  throw new Error('Неправильный размер')
 }
 if(stuffing !== 'STUFFING_CHEESE' && stuffing !== 'STUFFING_SALAD' && stuffing !== 'STUFFING_POTATO'){
  throw new Error('Неправильная начинка')
 }
 this.size = size
 this.stuffing = stuffing
 this.toping = []
}

/*Добавить добавку к гамбургеру. Можно добавить несколько
* добавок, при условии, что они разные.
* @param topping     Тип добавки
* @throws {HamburgerException}  При неправильном использовании*/
Hamburger.prototype.addTopping = function (topping) {
 if(topping !== 'TOPPING_MAYO' && topping !== 'TOPPING_SPICE'){
  throw new Error('Неправильный топинг, уточните название')
 }
 if(this.toping.includes(topping)){
  throw new Error('Эта добавка уже внутри')
 }
 this.toping.push(topping)
}

/* Убрать добавку, при условии, что она ранее была
 * добавлена.
 * @param topping   Тип добавки
 * @throws {HamburgerException}  При неправильном использовании*/
Hamburger.prototype.removeTopping = function (topping) {
 if(topping !== 'TOPPING_MAYO' && topping !== 'TOPPING_SPICE'){
  throw new Error('Неправильный топинг, уточните название')
 }
 this.toping = this.toping.filter(x => x !== topping)
}

/* Получить список добавок.
 * @return {Array} Массив добавленных добавок, содержит константы
 *                 Hamburger.TOPPING_**/
Hamburger.prototype.getToppings = function () {
 return this.toping
}

/* Узнать размер гамбургера */
Hamburger.prototype.getSize = function (size) {
 return this.size
}

/* Узнать начинку гамбургера */
Hamburger.prototype.getStuffing = function () {
 return this.stuffing
}

/* Узнать цену гамбургера
 * @return {Number} Цена в тугриках */
Hamburger.prototype.calculatePrice = function () {
 this.price = 50
 if (this.size === 'SIZE_LARGE'){
  this.price *= 2
 }
 this.price += 10
 if (this.stuffing === 'STUFFING_SALAD'){
  this.price += 10
 }
 else if (this.stuffing === 'STUFFING_POTATO'){
  this.price += 5
 }
 this.toping.forEach((item) => {
  if (item === 'TOPPING_SPICE'){
   this.price += 15
  }
  if (item === 'TOPPING_MAYO'){
   this.price += 20
  }
 })
 return this.price
}


/* Узнать калорийность
 * @return {Number} Калорийность в калориях */
Hamburger.prototype.calculateCalories = function () {
 this.calories = 20
 if (this.size === 'SIZE_LARGE'){
  this.calories *= 2
 }
 this.calories += 20
 if (this.stuffing === 'STUFFING_SALAD'){
  this.calories -= 15
 }
 else if (this.stuffing === 'STUFFING_POTATO'){
  this.calories -= 10
 }
 this.toping.forEach((item) => {
  if (item === 'TOPPING_MAYO'){
   this.calories += 5
  }
 })
 return this.calories
}

module.exports.Hamburger = Hamburger;
