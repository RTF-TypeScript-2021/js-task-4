/**
 * С помощью свойства __proto__ задайте прототипы так,
 *  чтобы поиск любого свойства выполнялся по следующему пути: pockets → bed → table → head. 
 * Например, pockets.pen должно возвращать значение 3 (найденное в table), а bed.glasses – значение 1 (найденное в head).
 */

function getHead() {
    this.head = {
        glasses: 1
    };

    return this.head;
}

function getTable() {
    this.table = {
        pen: 3,
        __proto__: getHead()
    };

    return this.table;
}

function getBed() {
    this.bed = {
        sheet: 1,
        pillow: 2,
        __proto__: getTable()
    };

    return this.bed;
}

function getPockets() {
    this.pockets = {
        money: 2000,
        __proto__: getBed()
    };

    return this.pockets;
}


module.exports.getHead = getHead;
module.exports.getTable = getTable;
module.exports.getBed = getBed;
module.exports.getPockets = getPockets;