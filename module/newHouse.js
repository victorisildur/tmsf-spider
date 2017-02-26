"use strict";
exports.__esModule = true;
var cheerio = require("cheerio");
var index_1 = require("../config/index");
var util_1 = require("../util");
var getDayPagePath = function (date) {
    return index_1.dailyPath + "/" + date + "/xf.html";
};
exports.getDayDetail = function (date) {
    return new Promise(function (resolve, reject) {
        util_1.request({
            host: index_1.host,
            path: getDayPagePath(date)
        }).then(function (html) {
            var $ = cheerio.load(html);
            var tableRows = $('table').first().find('tr');
            var houseCnt = tableRows.eq(1).find('td').eq(1).text();
            var allDealCnt = tableRows.eq(5).find('td').eq(1).text();
            houseCnt = util_1.stringToNum(houseCnt);
            allDealCnt = util_1.stringToNum(allDealCnt);
            console.log(date + " newHouseCnt: " + houseCnt + ", allDealCnt: " + allDealCnt);
            resolve({
                allDealCnt: allDealCnt,
                houseCnt: houseCnt
            });
        });
    });
};
