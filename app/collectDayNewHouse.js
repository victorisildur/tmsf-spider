"use strict";
exports.__esModule = true;
var newHouse_1 = require("../module/newHouse");
var deal_1 = require("../storage/deal");
exports["default"] = function (date) {
    newHouse_1.getDayDetail(date.format('YYYYMMDD')).then(function (detail) {
        deal_1.writeDeal({
            date: date.format('YYYY-MM-DD'),
            houseCnt: detail.houseCnt,
            allDealCnt: detail.allDealCnt
        });
    });
};
