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
    if (!token in tokens) {
        throw new Error("The input data is not a token");
    }
    this.name = token;
    this.price = tokens[token].price.slice(0, 1);
    this.priceChange24h = tokens[token].priceChange24h.slice(0, 1);
}

Coin.prototype.getMinValue = function (countDays) {
    let minValue = 0;
    for (let i = 0; i < countDays; i++) {
        minValue *= (1 - this.priceChange24h / 100);
    }

    return minValue;
}

Coin.prototype.getMaxValue = function (countDays) {
    let maxValue = 0;
    for (let i = 0; i < countDays; i++) {
        maxValue *= (1 + this.priceChange24h / 100);
    }

    return maxValue;
}

Coin.prototype.getMiddleValue = function (countDays) {
    if (!Number.isInteger(countDays) || countDays < 0) {
        throw new Error("Count days has wrong type");
    }

    return Math.round((this.getMinValue(countDays) + this.getMaxValue(countDays)) / 2);
}

function getCountDays(months) {
    const timeConst =  1000 * 60 * 60 * 24;
    const startDay = new Date(months[0].year, months[0].month - 1);
    const endDay = new Date(months[months.length - 1].year, months[months.length - 1].month);

    return Math.floor((endDay.getTime() - startDay.getDay()) / timeConst);
}

/**
 * 
 * @param {*} months массив месяцев, формат {month, year}
 * @return название токена
 */
function tokenChoice(months) {
    for (let i = 0; i < months.length; i++) {
        if (months[i].month > 12 || months[i].year < 1
            || !Number.isInteger(months[i].month) || !Number.isInteger(months[i].year)) {
            throw new Error("The input date has wrong type");
        }
    }

    const countDays = getCountDays(months);
    let profitValue = -1;
    let profitToken = {};

    for (const token in tokens) {
        const coin = new Coin(token);
        const middleValue = coin.getMiddleValue(countDays);
        if (middleValue > profitValue) {
            profitValue = middleValue;
            profitToken = token;
        }
    }

    return profitToken;
}


module.exports.tokenChoice = tokenChoice;
