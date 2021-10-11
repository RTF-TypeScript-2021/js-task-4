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
    if (!token in tokens){
        throw Error(`В базе моей программы нет токена ${token}, 
        если хочешь это исправить, напиши в книгу "жалобы и предложения" и мы... Ну ты итак все знаешь`);
    }
    this.name = token;
    this.price = parseFloat(tokens[token].price.slice(1, -2));
    this.priceChange24h = parseFloat(tokens[token].priceChange24h.slice(1, -2));
}

Coin.prototype.getMaxTokenValue = function(daysCount) {
    let day = 0;
    while (day < daysCount) {
        this.price *= (1 + this.priceChange24h / 100);
        day += 1
    }

    return this.price;
}

Coin.prototype.getMinTokenValue = function(daysCount) {
    let day = 0;
    while (day < daysCount) {
        this.price *= (1 - this.priceChange24h / 100);
        day += 1
    }

    return this.price;
}

Coin.prototype.getFiftyFiftyTokenVAlue = function(daysCount) {
    const maxValueFifty = this.getMaxTokenValue(Math.round(daysCount / 2));
    const minValueFifty = this.getMinTokenValue(Math.ceil(daysCount / 2));

    return maxValueFifty + minValueFifty;
}

Coin.prototype.getAverageTokenValue = function(daysCount) {
    return (this.getMaxTokenValue(daysCount) + this.getMinTokenValue(daysCount) + 
    this.getFiftyFiftyTokenVAlue(daysCount)) / 3; 
}

/**
 * 
 * @param {*} months массив месяцев, формат {month, year}
 * @return название токена
 */
function tokenChoice(months) { 
    for (let i = 0; i < months.length; i++) {
        if (!Number.isInteger(months[i]['month']) || !Number.isInteger(months[i]['year']) ||
         months[i]['month'] > 12 || months[i]['month'] < 1) {
            throw Error(`Перепроверьте данные о датах...`);
        }
    }
    const startDate = new Date(months[0].year, months[0].month - 1);
    const endDate = new Date(months[months.length - 1].year, months[months.length - 1].month);
    const daysCount = Math.floor(endDate.getTime() - startDate.getTime()) / (1000 * 24 * 60 * 60);
    let bestToken = '';
    let bestCoinAverage = 0;
    for (const token in tokens) {
        const coin = new Coin(token);
        const coinAverage = coin.getAverageTokenValue(daysCount)
        if (coinAverage > bestCoinAverage) {
            bestCoinAverage = coinAverage;
            bestToken = coin.name;
        }
    }

    return bestToken;
}


module.exports.tokenChoice = tokenChoice;
