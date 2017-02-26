"use strict";
exports.__esModule = true;
var cheerio = require("cheerio");
var config_1 = require("../config");
var util_1 = require("../util");
var getDayPagePath = function (date) {
    return config_1.dailyPath + "/" + date + "/esf.html";
};
exports.getDayDetail = function (date) {
    return new Promise(function (resolve, reject) {
        util_1.request({
            host: config_1.host,
            path: getDayPagePath(date)
        }).then(function (html) {
            var $ = cheerio.load(html);
            // 第1个表格里
            var tableRows = $('table').eq(0).find('tr');
            // 最后一行 
            var row = tableRows.last();
            // 2, 4 列
            var allDealCnt = row.find('td').eq(1).text();
            var houseCnt = row.find('td').eq(3).text();
            houseCnt = util_1.stringToNum(houseCnt);
            allDealCnt = util_1.stringToNum(allDealCnt);
            console.log("date: " + date + ", oldHouseCnt: " + houseCnt + ", allDealCnt: " + allDealCnt);
            resolve({
                allDealCnt: allDealCnt,
                houseCnt: houseCnt
            });
        });
    });
};
