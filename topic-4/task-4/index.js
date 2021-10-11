/**
 * С помощью свойства __proto__ задайте прототипы так,
 *  чтобы поиск любого свойства выполнялся по следующему пути: pockets → bed → table → head. 
 * Например, pockets.pen должно возвращать значение 3 (найденное в table), а bed.glasses – значение 1 (найденное в head).
 */

function getHead() {
    return {
        glasses: 1
    };
}

function getTable() {
    return {
        pen: 3,
        __proto__: getHead()
    };
}

function getBed() {
    return {
        sheet: 1,
        pillow: 2,
        __proto__: getTable()
    };
}

function getPockets() {
    return {
        money: 2000,
        __proto__: getBed()
    };
}

module.exports.getHead = getHead;
module.exports.getTable = getTable;
module.exports.getBed = getBed;
module.exports.getPockets = getPockets;