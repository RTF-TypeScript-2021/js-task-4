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


/**
 * 
 * @param {*} months массив месяцев, формат {month, year}
 * @return название токена
 */
 function Coin(token) {
    this.name = token;
    this.price = Number(tokens[token].price.slice(0, -1));
    this.priceChange24h = Number(tokens[token].priceChange24h.slice(0,-1)) / 100;
}

 function tokenChoice(months) {
    const start = new Date(months[0].month, months[0].year);
    const end = new Date(months[months.length - 1].year, months[months.length - 1].month + 1);
    const days  = (end - start) / 86400000;

    let maxProfit = 0;
    let best;

    for (const actual in tokens) {
        const coin = new Coin(actual);
        const profit = coin.price * coin.priceChange24h ** days;
        if (profit > maxProfit) {
            maxProfit = profit;
            best = coin.name;
        }
    }

    return best;
}


module.exports.tokenChoice = tokenChoice;
