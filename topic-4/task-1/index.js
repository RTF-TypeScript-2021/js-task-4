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
    this.name = token
    this.price = Number(tokens[token].price.slice(0, -1))
    this.priceIncrease = Number(tokens[token].priceChange24h.slice(0, -1)) / 100
}

Coin.prototype.getProfit = function(budget, daysCount){
    return budget * (1 + this.priceIncrease) ** daysCount - budget;
}

Coin.prototype.getDecline = function(budget, daysCount){
    const startBudget = budget;
    for (const i in daysCount){
        budget = budget * (1 - this.priceIncrease);
    }

    return budget - startBudget;
}

/**
 * 
 * @param {*} months массив месяцев, формат {month, year}
 * @return название токена
 */
function tokenChoice(months) {
    if (typeof months[0].year !== "number" || typeof months[0].month !== "number"){
        throw "Incorrect date"
    }

    let daysCount = 0
    for (const i in months) {
        const start = new Date(months[0].year, months[0].month - 1);
        const end = new Date(months[0].year, months[0].month);
        daysCount += (end - start) / 86400000;
    }

    let maxPrice = 0;
    let bestToken = '';

    for (const name in tokens){
        const coin = new Coin(name)
        const priceIncrease = coin.getProfit(5000, daysCount)
        const priceDecrease = coin.getDecline(5000, daysCount)
        const price = (priceIncrease + priceDecrease) / 2
        if (price > maxPrice){
            maxPrice = price;
            bestToken = name;
        }
    }

    return bestToken;
}


module.exports.tokenChoice = tokenChoice;
