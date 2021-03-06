"use strict";
exports.__esModule = true;
var cheerio = require("cheerio");
var config_1 = require("../config");
var util_1 = require("../util");
var getDayPagePath = function (date) {
    return config_1.dailyPath + "/" + date + "/xf.html";
};
exports.getDayDetail = function (date) {
    return new Promise(function (resolve, reject) {
        util_1.request({
            host: config_1.host,
            path: getDayPagePath(date)
        }).then(function (html) {
            var $ = cheerio.load(html);
            // 第二个表格里
            var tableRows = $('table').eq(1).find('tr');
            // 第2,6行
            var houseCnt = tableRows.eq(1).find('td').eq(1).text();
            var allDealCnt = tableRows.eq(5).find('td').eq(1).text();
            houseCnt = util_1.stringToNum(houseCnt);
            allDealCnt = util_1.stringToNum(allDealCnt);
            console.log("date: " + date + ", newHouseCnt: " + houseCnt + ", allDealCnt: " + allDealCnt);
            resolve({
                allDealCnt: allDealCnt,
                houseCnt: houseCnt
            });
        });
    });
};
