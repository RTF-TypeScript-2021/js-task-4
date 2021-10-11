/**
 * Вася вложился в биткоин, когда он стоил 60,000$, но после падения в два раза он все продал
 * с надеждой вложить свои деньги в другие токены чтобы отбить потери.
 * По тактике Васи, вкладывать стоит только в токены, которые еще не показали свой максимум
 * Поэтому он выписал себе несколько перспективных, осталось только понять, куда вложиться
 *
 * На практике, чтобы определить, куда инвестировать, нужно учитывать большое количество параметров,
 * но Вася не инвестор, поэтому во всей этой тенденции ему важны три параметра:
 *    - изменение цены за 24 часа
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
    this.price = parseFloat(tokens[token].price);
    this.priceChange24h = parseFloat(tokens[token].priceChange24h);
}

Coin.prototype.getMaxPrice = function (days) {
    return [...Array(days)].reduce((res, _) => res * (1 + this.priceChange24h / 100), this.price);
}

Coin.prototype.getMinPrice = function (days) {
    return [...Array(days)].reduce((res, _) => res * (1 - this.priceChange24h / 100), this.price);
}

Coin.prototype.getAveragePrice = function (days) {
    return (this.getMaxPrice(days) + this.getMinPrice(days)) / 2;
}

Coin.prototype.calculateStatistic = function (...params) {
    return params.reduce((x, y) => x + y) / params.length;
}

function getDaysCount(months) {
    const startDate = new Date(months[0].year, months[0].month - 1);
    const endDate = new Date(months[months.length - 1].year, months[months.length - 1].month);

    return Math.floor(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
}

/**
 *
 * @param {*} months массив месяцев, формат {month, year}
 * @return название токена
 */

function tokenChoice(months) {
    if (!Array.isArray(months) ||
        months.some(m =>
            !Number.isInteger(m.month) ||
            !Number.isInteger(m.year) ||
            m.month < 1 || m.month > 12 ||
            m.year < 1)) {
        throw new Error();
    }

    let bestStat = 0;
    let bestTokenName = "";
    const daysCount = getDaysCount(months);

    for (const token in tokens) {
        const coin = new Coin(token);
        const curStatistic = coin.calculateStatistic(
            coin.getMinPrice(daysCount),
            coin.getMaxPrice(daysCount),
            coin.getAveragePrice(daysCount)
        );

        if (curStatistic > bestStat) {
            bestStat = curStatistic;
            bestTokenName = token;
        }
    }

    return bestTokenName;
}


module.exports.tokenChoice = tokenChoice;
