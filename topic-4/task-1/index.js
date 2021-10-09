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
const skew=0.5

function randomBM(min, max, skew=0.5) {
    let u1 = 0, u2 = 0;
    while (u1 === 0){
        u1 = Math.random();
    }
    while (u2 === 0){
        u2 = Math.random();
    } 
    const R = Math.sqrt(-2.0 * Math.log(u1));
    const Theta = 2.0 * Math.PI * u2;
   
    const result = (min*(1-rand)+max*rand);

    return result;
    
}

/**
 * 
 * @param {*} token токен
 */
function Coin(token) {
    this.price = Number.parseFloat(token.price);
    this.priceChange24h = Number.parseFloat(token.priceChange24h)/100;
    this.amount = Math.floor(checkVasya / this.price);
}

Coin.prototype.updatePrice = function(){
    const procent = randomBM(1-this.priceChange24h, 1 + this.priceChange24h, skew);
    //console.log(procent, 1-this.priceChange24h,1+ this.priceChange24h);
    this.price = this.price * procent;
}

Coin.prototype.getProfit = function(){
    return this.amount * this.price;
}

/**
 * 
 * @param {*} months массив месяцев, формат {month, year}
 * @return название токена
 */
function tokenChoice(months) {
    const totalDays = months.reduce((days, obj)=> days + new Date(obj.year, obj.month,0).getDate(), 0);
    const eth = new Coin(tokens.ETH);
    const doge = new Coin(tokens.DOGE);
    for(let i = 0; i < totalDays; i++){
        eth.updatePrice();
        doge.updatePrice();
    }
    console.log(eth.getProfit());
    console.log(doge.getProfit());
}

tokenChoice([{ month: 10, year: 2022 },{ month: 11, year: 2022 },{ month: 9, year: 2022 }]);


//module.exports.tokenChoice = tokenChoice;
