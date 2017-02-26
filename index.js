"use strict";
exports.__esModule = true;
var collectDayNewHouse_1 = require("./app/collectDayNewHouse");
var collectDayOldHouse_1 = require("./app/collectDayOldHouse");
var moment = require("moment");
var days = 3650;
for (var i = 0; i < days; i++) {
    var date = moment().subtract(i + 1, 'days');
    if (date.isAfter('2013-01-13')) {
        // new house statistic
        collectDayNewHouse_1["default"](date);
        // old house statistic
        collectDayOldHouse_1["default"](date);
    }
    else {
        break;
    }
}
