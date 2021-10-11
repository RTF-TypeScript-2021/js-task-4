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
    if (!(token in tokens)) {
        throw new Error("token неверный или несуществует");
    }
    this.name = token;
    this.price = parseFloat(tokens[token].price.replace('$', ''));
    this.priceChange24h = parseFloat(tokens[token].priceChange24h.replace('%', ''));

}

Coin.prototype.calculateMaxIncome = function(periodOfTime) {
    const multiplier = (1 + (this.priceChange24h/100))**periodOfTime;

    return this.price*multiplier - this.price;
}

Coin.prototype.calculateMinus = function(periodOfTime) {
    const multiplier = (1 - (this.priceChange24h/100))**periodOfTime;

    return this.price*multiplier - this.price;
}

Coin.prototype.calculateAverage = function(periodOfTime) {
    return (this.calculateMaxIncome(periodOfTime) + this.calculateMinus(periodOfTime))/2
}
/**
 * 
 * @param {*} months массив месяцев, формат {month, year}
 * @return название токена
 */
function tokenChoice(months) { 
    const periodOfTime = Math.floor((new Date(months[0].year, months[0].month - 1).getTime() - Date.now())/86400000);
    if (periodOfTime <= 0) {
        throw new Error("Время некрректно");
    }
    let priceAtDate = 0;
    let bestCoin;
    for(const token in tokens) {
        const price = new Coin(token).calculateAverage(periodOfTime);
        if (price > priceAtDate) {
            priceAtDate = price;
            bestCoin = token;
        }
    }

    return bestCoin;
}
console.log(tokenChoice([{ month: 11, year: 2021 }]))
module.exports.tokenChoice = tokenChoice;
