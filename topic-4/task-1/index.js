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

Coin.prototype.getCost = function (countDay) {
    return (1 + this.priceChange24h / 100) ** countDay - (1 / this.price);
}

function getDate(months) {
    const timeConst =  1000 * 60 * 60 * 24;

    return Math.floor((new Date(months[0]["year"], months[0]["month"] + 1) - new Date()) / timeConst);
}

/**
 * 
 * @param {*} months массив месяцев, формат {month, year}
 * @return название токена
 */
function tokenChoice(months) {
    let mostProfitableToken = -1;
    let valueOfMostProfitableToken = -1;
    const countDay = getDate(months);

    for (const token in tokens) {
        const coin = new Coin(token);
        const costCoin = coin.getCost(countDay);

        if (costCoin > valueOfMostProfitableToken) {
            mostProfitableToken = coin;
            valueOfMostProfitableToken = costCoin;
        }
    }

    return mostProfitableToken.name;
}


module.exports.tokenChoice = tokenChoice;
