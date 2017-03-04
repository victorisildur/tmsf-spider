"use strict";
exports.__esModule = true;
var newHouse_1 = require("../module/newHouse");
var storage_1 = require("../storage");
exports["default"] = function (date) {
    return newHouse_1.getDayDetail(date.format('YYYYMMDD')).then(function (detail) {
        return storage_1.writeDeal({
            date: date.format('YYYY-MM-DD'),
            houseCnt: detail.houseCnt,
            allDealCnt: detail.allDealCnt
        });
    });
};
