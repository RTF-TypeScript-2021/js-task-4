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
        priceChange24h: '2.99%',
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
    this.price = parseFloat(tokens[token].price)
    this.priceChange24h = parseFloat(tokens[token].priceChange24h);
    this.getPrice = function (days, price, accuracy = 0, random = 0) {
        //let price = this.price;
        const countAmount = 5000/this.price;
        let accumulator = this.price;
        for (let i = 0; i < Math.floor(days); i++) {
            accumulator *= random >= accuracy ?  (1 + price / 100) :  (1 - price / 100)
            if (accuracy !== 0) {
                accuracy = Math.random() * (0.4 - 0.2) + 0.2;
                random = Math.random();
                price += random > accuracy ? Math.random() * (0.1-0.02)+0.02: -Math.random() * (0.1-0.02)+0.02
                random = Math.random();
            }
        }

        return accumulator * countAmount;
    }
}

/**
 *
 * @function getMaxPrice - не нужны,на мой взгляд (привел, так как было написано Максимом в телеге)
 * @function getMinPrice
 * @function getRandomPrice
 */
Coin.prototype.getMaxPrice = (days,price,coin) => coin.getPrice(days,price)

Coin.prototype.getMinPrice = (days,price,coin) => coin.getPrice(days,-price);

Coin.prototype.getAveragePrice = (days,price,coin) => coin.getPrice(days/2,price) + coin.getPrice(days/2,-price)

Coin.prototype.getRandomPrice = (days,price,coin) => coin.getPrice(days,price,Math.random() * (0.1-0.02)+0.02,Math.random());

Coin.prototype.calculateStatistic = function (days, price,coin, ...params){
    let res = 0;
    for (const func of params) {
        res+=func(days,price,coin)
    }

    return res;
}
/**
 *
 * @returns {[(function(*=, *=, *): *)]} : Делегаты прототипа Coin
 */
Coin.prototype.returnDelegates = function (){
    return [this.getRandomPrice];
}


/**
 * 
 * @param {*} months массив месяцев, формат {month, year}
 * @return название токена
 */

function tokenChoice(months) {
    const getDate=(function (months) {
        const start = new Date(months[0].year,months[0].month).getTime();
        const end = new Date(months[months.length-1].year,months[months.length-1].month).getTime();
        const transferMillisecondsToDays = 1000*60*60*24

        return (end-start) / transferMillisecondsToDays;
    })(months)

    let bestStatistic = 0;
    for (const token in tokens){
        const coin = new Coin(token);
        const currentStatistic = coin.calculateStatistic(getDate,coin.priceChange24h,coin,...coin.returnDelegates())
        if(currentStatistic > bestStatistic){
            bestStatistic = currentStatistic
            var bestToken = token
        }
    }

    return bestToken

}


module.exports.tokenChoice = tokenChoice;
