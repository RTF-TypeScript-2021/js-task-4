/**
 * Вася вложился в биткоин, когда он стоил 60,000$, но после падения в два раза он все продал
 * с надеждой вложить свои деньги в другие токены чтобы отбить потери.
 * По тактике Васи, вкладывать стоит только в токены, которые еще не показали свой максимум
 * Поэтому он выписал себе несколько перспективных, осталось только понять, куда вложиться
 * 
 * На практике, чтобы определить, куда инвестировать, нужно учитывать большое количество параметров,
 * но Вася не инвестор, поэтому во всей этой тенденции ему важны три параметра:
 * 	- изменение цены за 24 часа
 *  - цена
 * 
 * Бюджет Васи = 5.000$ и он хочет держать на них токены, а потом продать.
 * 
 * Вася выяснил, на сколько приблизительно меняется цена у каждого токена и записал это в поле priceChange24h
 * Может как уменьшиться, так и увеличиться.
 * 
 * У вас уже создан базовый класс Coin, вам необходимо создать от него остальные токены
 * 
 * В итоге по предоставленным данным вы должны выбрать один токен, который принесет максимальную прибыль
*/


const tokens = {
    ETH: {
        price: '3400.92$',
        priceChange24h: '4.18%',
    },
    DOGE: {
        price: '0.2219$',
        priceChange24h: '1.99%',
    },
    CAKE: {
        price: '19.81$',
        priceChange24h: '1.63%',
    },
    LTC: {
        price: '159.11$',
        priceChange24h: '1.88%',
    }
}


/**
 * 
 * @param {*} token токен
 */
function Coin(token) {

    if(!(token in tokens)){
        throw new Error("Нет такого токена")
    }

    this.price = tokens[token].price.slice(1,-2);
    this.priceChange24h = tokens[token].priceChange24h.slice(1,-2);
}

Coin.prototype.calcSum= function(countDays, znak) {
    for ( let day = 0; day < countDays; day++) {
        this.price *= (1 - (znak * this.priceChange24h / 100));
    }

    return this.price;
}

Coin.prototype.maxValueToken = function(countDays){
    return this.calcSum(countDays, 1);
}

Coin.prototype.minValueToken = function(countDays){
    return this.calcSum(countDays, -1);
}

Coin.prototype.middleValueToken = function(countDays){
    this.price =  this.calcSum(countDays, -1);
    this.price *=  this.calcSum(countDays, 1);
    
    return this.price;
}


Coin.prototype.averageValueToken = function(countDays) {
    this.price = ((this.maxValueToken(countDays) + this.minValueToken(countDays) + this.middleValueToken(countDays)) / 3);
    
    return this.price;
} 


/**
 * 
 * @param {*} months массив месяцев, формат {month, year}
 * @return название токена
 */
function tokenChoice(months) { 
    if(months["month"] > 12 || months["month"] < 1 || !Number.isInteger(months[0]["month"]) || !Number.isInteger(months[0]["year"])) {
        throw new Error("Введена не дата")
    }
    const days = Math.floor((new Date(months[0]["year"], months[0]["month"] + 1) - new Date()) / (1000*60*60*24));;
    let nameTok;
    let maxMon = 0;
    for (const token in tokens) {
        const coun = new Coin(token).averageValueToken(days);
        if(coun > maxMon) {
            maxMon = coun;
            nameTok = token;
        }
    }

    return nameTok;
}


module.exports.tokenChoice = tokenChoice;
