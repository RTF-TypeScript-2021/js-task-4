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


const checkVasya = 5000;
/**
 * 
 * @param {*} token токен
 */


function Coin(token) {
    this.name = token
    this.price = Number.parseFloat(tokens[token].price);
    this.priceChange24h = Number.parseFloat(tokens[token].priceChange24h)/100;
    this.amount = Math.floor(checkVasya / this.price);
}


Coin.prototype.getProfitMid = function(days) {
    const min = this.price*Math.pow(1 - this.priceChange24h, days);
    const max = this.price*Math.pow(1 + this.priceChange24h, days);

    return this.amount*(max - min)/2;
}

/**
 * 
 * @param {*} months массив месяцев, формат {month, year}
 * @return название токена
 */
function tokenChoice(months) {
    if(!Array.isArray(months)) {
        throw new Error("month must be objects array");
    }
    if(months.length === 0 || !months.every(obj => Number.isInteger(obj.month)
        && Number.isInteger(obj.year) 
        && obj.year > 2000
        && obj.month>=0 
        && obj.month<=11)) {
        throw  new Error("Invalid item of months array");
    }
    const totalDays = months.reduce((days, obj) => 
        days + new Date(obj.year, obj.month,0).getDate(), 0
    );
    const keys = Object.keys(tokens);
    let token;
    let bestCoin = new Coin(keys[0]);
    for(const key of keys) {
        token = new Coin(key);
        if (bestCoin.getProfitMid(totalDays) < token.getProfitMid(totalDays)) {
            bestCoin = token;
        }
    }

    return bestCoin.name;
}

module.exports.tokenChoice = tokenChoice;
