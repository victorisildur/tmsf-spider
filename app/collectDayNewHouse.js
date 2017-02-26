"use strict";
exports.__esModule = true;
var newHouse_1 = require("../module/newHouse");
var moment = require("moment");
exports["default"] = function () {
    var date = moment().subtract(2, 'days').format('YYYYMMDD');
    newHouse_1.getDayDetail(date).then(function (detail) {
        console.dir(detail);
    });
};
