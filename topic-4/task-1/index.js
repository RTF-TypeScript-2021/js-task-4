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

const budget = 5000;


/**
 * 
 * @param {*} token токен
 */
function Coin(token) {
    if (!(token in tokens)){
        throw new Error("Argument error. Token is incorrect.");
    }
    this.price = this.parseParameter(tokens[token].price);
    this.priceChange24h = this.parseParameter(tokens[token].priceChange24h);
    this.name = token;
}

Coin.prototype.parseParameter = function (parameter){
    return Number.parseFloat(parameter.substring(0, parameter.length - 1));
}

Coin.prototype.GetProfitWithOnlyIncreasing = function (daysCount, startPrice) {
    startPrice = startPrice || this.price;
    const finalPrice = startPrice * (1 + (this.priceChange24h / 100)) ** daysCount;

    return {"profit": finalPrice - startPrice, finalPrice};
}

Coin.prototype.GetProfitWithOnlyDecreasing = function (daysCount, startPrice) {
    startPrice = startPrice || this.price;
    const finalPrice = startPrice * (1 - (this.priceChange24h / 100)) ** daysCount;

    return {"profit": finalPrice - startPrice, finalPrice};
}

Coin.prototype.GetProfitWithHalfTrend = function (daysCount, firstTrend, secondTrend) {
    const daysCountHalf = Math.floor(daysCount / 2);
    const firstTrendProfit = firstTrend(daysCountHalf);
    const secondTrendProfit = secondTrend(daysCountHalf + (daysCount % 2), firstTrendProfit["finalPrice"]);

    return firstTrendProfit["profit"] + secondTrendProfit["profit"];
}

Coin.prototype.GetProfitWithIncreasingAndDecreasing = function (daysCount) {
    return this.GetProfitWithHalfTrend(daysCount, this.GetProfitWithOnlyIncreasing, this.GetProfitWithOnlyDecreasing);
}

Coin.prototype.GetProfitWithDecreasingAndIncreasing = function (daysCount) {
    return this.GetProfitWithHalfTrend(daysCount, this.GetProfitWithOnlyDecreasing, this.GetProfitWithOnlyIncreasing);
}

Coin.prototype.GetProfitWithDayCondition = function (daysCount, DayCondition) {
    let [profit, finalPrice] = [0, this.price];
    for (let day = 0; day < daysCount; day++){
        let currentProfit = 0;
        if (DayCondition(day)){
            [currentProfit, finalPrice] = this.GetProfitWithOnlyIncreasing(1, finalPrice);
        } else {
            [currentProfit, finalPrice] = this.GetProfitWithOnlyDecreasing(1, finalPrice);
        }
        profit += currentProfit;
    }

    return profit;
}

Coin.prototype.GetProfitWithAlternation = function (daysCount) {
    return this.GetProfitWithDayCondition(daysCount, day => day % 2 === 0);
}

Coin.prototype.GetProfitWithRandom = function (daysCount) {
    return this.GetProfitWithDayCondition(daysCount, () => Math.random() > 0.5);
}


Coin.prototype.calculateAverageProfit = function (daysCount){
    const profits = [this.GetProfitWithOnlyIncreasing(daysCount), this.GetProfitWithOnlyDecreasing(daysCount),
        this.GetProfitWithDecreasingAndIncreasing(daysCount), this.GetProfitWithIncreasingAndDecreasing(daysCount),
        this.GetProfitWithAlternation(daysCount), this.GetProfitWithRandom(daysCount)];

    return profits.reduce((sum, profit) => sum + profit) / profits.length;
}


/**
 * 
 * @param {*} months массив месяцев, формат {month, year}
 * @return название токена
 */
function tokenChoice(months) {
    if (months.some(date => Object.values(date).some(x => !Number.isInteger(x)) || date["month"] > 12 || date["month"] <= 0)){
        throw new Error("Argument error. Months format is incorrect.");
    }

    const daysCount = months.reduce((count, date) => count + (new Date(date['year'], date['month'], 0)).getDate());
    const coins = Object.keys(tokens).map(token => new Coin(token));

    let maxProfit = 0;
    let maxProfitCoin = coins[0];
    for (const coin in coins) {
        if (coin.price < budget){
            const profit = coin.calculateAverageProfit(daysCount);
            if (profit > maxProfit) {
                [maxProfit, maxProfitCoin] = [profit, coin];
            }
        }
    }

    return maxProfitCoin.name;
}


module.exports.tokenChoice = tokenChoice;
