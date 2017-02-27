"use strict";
exports.__esModule = true;
var oldHouse_1 = require("../module/oldHouse");
var deal_1 = require("../storage/deal");
exports["default"] = function (date) {
    oldHouse_1.getDayDetail(date.format('YYYYMMDD')).then(function (detail) {
        deal_1.writeSecondDeal({
            date: date.format('YYYY-MM-DD'),
            houseCnt: detail.houseCnt,
            allDealCnt: detail.allDealCnt
        });
    });
};
