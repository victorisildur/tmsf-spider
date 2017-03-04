"use strict";
exports.__esModule = true;
var storage_1 = require("../storage");
var getInventory_1 = require("../module/getInventory");
exports["default"] = function (date) {
    getInventory_1.getTodayInventory(date.format('YYYYMMDD')).then(function (inventory) {
        console.dir(inventory);
        return storage_1.writeInventory({
            date: date.format('YYYY-MM-DD'),
            zhucheng: inventory.zhucheng,
            xiaoshan: inventory.xiaoshan,
            yuhang: inventory.yuhang,
            fuyang: inventory.fuyang,
            dajiangdong: inventory.dajiangdong,
            total: inventory.total
        });
    }).then(function () {
        process.exit(0);
    });
};
