/**
 * С помощью свойства __proto__ задайте прототипы так,
 *  чтобы поиск любого свойства выполнялся по следующему пути: pockets → bed → table → head.
 * Например, pockets.pen должно возвращать значение 3 (найденное в table), а bed.glasses – значение 1 (найденное в head).
 */

function getHead () {
    return {
        glasses: 1
    };
}

function getTable () {
    return {
        __proto__: getHead(),
        pen: 3,
    };
}

function getBed () {
    return {
        __proto__: getTable(),
        sheet: 1,
        pillow: 2,
    };
}

function getPockets () {
    return {
        __proto__: getBed(),
        money: 2000,
    };
}

module.exports.getHead = getHead;
module.exports.getTable = getTable;
module.exports.getBed = getBed;
module.exports.getPockets = getPockets;