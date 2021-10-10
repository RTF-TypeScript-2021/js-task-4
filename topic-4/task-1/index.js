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
    if(!token in tokens){
        throw new Error('Токен не обнаружен')
    }
    this.name = token;
    this.price = tokens[token].price.slice(0, -1);
    this.priceChange24h = tokens[token].priceChange24h.slice(0, -1)
}

Coin.prototype.maxValue = function(countDays){
    let finalPrice = this.price
    for (let i = 0; i < countDays; i++){
        finalPrice *= (1 + (this.priceChange24h / 100))
    }
    return finalPrice
}

Coin.prototype.minValue = function(countDays){
    let finalPrice = this.price
    for (let i = 0; i < countDays; i++){
        finalPrice *= (1 - (this.priceChange24h / 100))
    }
    return finalPrice
}

Coin.prototype.middleValue = function (countDays){
    let finalPrice = this.price
    for (let i = 0; i < countDays/2; i++){
        finalPrice *= (1 - (this.priceChange24h / 100))
    }
    for (let i = 0; i < countDays/2; i++){
        finalPrice *= (1 + (this.priceChange24h / 100))
    }
    return finalPrice
}

Coin.prototype.averageProfit = function (countDays){
    return (this.middleValue(countDays)+this.maxValue(countDays)+this.minValue(countDays))/3
}

/**
 * 
 * @param {*} months массив месяцев, формат {month, year}
 * @return название токена
 */
function tokenChoice(months){
    const startDate = new Date(months[0].year, months[0].month, 1)
    const finishDate = new Date(months[months.length-1].year, months[months.length-1].month+1, 0)
    let daysCount = 1+ (finishDate - startDate)/86400000
    const coins = Object.keys(tokens).map(token => new Coin(token));

    let bestCoin
    let maxValue

    for(let coin of coins){
        if(!bestCoin){
            bestCoin = coin.name
            maxValue = coin.averageProfit(daysCount)
        }
        else if(coin.averageProfit(daysCount) > maxValue){
            maxValue = coin.averageProfit(daysCount)
            bestCoin = coin.name
        }
    }
    return bestCoin
}


module.exports.tokenChoice = tokenChoice;
