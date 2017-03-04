"use strict";
exports.__esModule = true;
var oldHouse_1 = require("../module/oldHouse");
var storage_1 = require("../storage");
exports["default"] = function (date) {
    return oldHouse_1.getDayDetail(date.format('YYYYMMDD')).then(function (detail) {
        return storage_1.writeSecondDeal({
            date: date.format('YYYY-MM-DD'),
            houseCnt: detail.houseCnt,
            allDealCnt: detail.allDealCnt
        });
    });
};
