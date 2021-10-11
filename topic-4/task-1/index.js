"use strict"

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

class Coin { 
    /**
     * @param {String} token
     */
    constructor(token) {
        this.name = token;
        this.price = parseFloat(tokens[token].price);
        this.percentage = parseFloat(tokens[token].priceChange24h) / 100;
    }

    /**
     * @param {Date} date
     */
    getProfitValue(days) {
        const max = this.price * (1 + this.percentage) ** days;
        const min = this.price * (1 - this.percentage) ** days;

        return (max - min) / 2 * (budget / this.price);
    }
}

/**
 * 
 * @param {Array} dates массив месяцев, формат {month, year}
 * @return название токена
 */
// Что означает массив месяцев? 
// Нужно взять дни между парами дат? / Взять дни между первой и последней датами? / Просто посчитать кол-во дней в конкретном месяце конкретного года (28,29,30,31)? 
// Условие не очень понял... 
// (решение сделаю по первому варианту)
function tokenChoice(dates) {
    if(!Array.isArray(dates) || dates.length === 0 || dates.some(
        date => !Number.isInteger(date.year) 
        || !Number.isInteger(date.month) 
        || date.month < 0 
        || date.month > 11)
    ) {
        throw new Error("Invalid arguments");
    }

    const currDate = new Date()
    dates.unshift({month: currDate.getMonth(), year: currDate.getFullYear()})
    const monthsTopProfits = [];
    const coins = Array
        .from(Object.keys(tokens))
        .map(token => new Coin(token))
        .filter(coin => coin.price <= budget);

    for (let i = 1; i < dates.length; i++) {
        const days = getDays(
            new Date(dates[i - 1].year, dates[i - 1].month), 
            new Date(dates[i].year, dates[i].month)
        );
        monthsTopProfits.push(coins
            .map(coin => [coin, coin.getProfitValue(days)])
            .sort(x => x[1])
            [0]
        );
    }

    return monthsTopProfits.sort(x => x[1])[0][0].name;
}

/**
 * @param {Date} start 
 * @param {Date} end 
 */
function getDays(start, end) {
    return (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
}

module.exports.tokenChoice = tokenChoice;
