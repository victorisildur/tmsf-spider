"use strict";
exports.__esModule = true;
var collectDayNewHouse_1 = require("./app/collectDayNewHouse");
var collectDayOldHouse_1 = require("./app/collectDayOldHouse");
var moment = require("moment");
var date = moment().subtract(1, 'days');
Promise.all([collectDayNewHouse_1["default"](date), collectDayOldHouse_1["default"](date)]).then(function () {
    process.exit(0);
});
