"use strict";
exports.__esModule = true;
var cheerio = require("cheerio");
var config_1 = require("../config");
var util_1 = require("../util");
exports.getTodayInventory = function (date) {
    return new Promise(function (resolve, reject) {
        util_1.request({
            host: config_1.host,
            path: '/index.jsp'
        }).then(function (html) {
            var $ = cheerio.load(html);
            // 表格#myCont5里
            var table = $('#myCont5').find('table');
            var rows = table.find('tr');
            // 第2->6行
            var zhucheng = rows.eq(1).find('td').eq(3).text(), xiaoshan = rows.eq(2).find('td').eq(3).text(), yuhang = rows.eq(3).find('td').eq(3).text(), fuyang = rows.eq(4).find('td').eq(3).text(), dajiangdong = rows.eq(5).find('td').eq(3).text(), total = rows.eq(6).find('td').eq(3).text();
            resolve({
                date: date,
                zhucheng: util_1.stringToNum(zhucheng),
                xiaoshan: util_1.stringToNum(xiaoshan),
                yuhang: util_1.stringToNum(yuhang),
                fuyang: util_1.stringToNum(fuyang),
                dajiangdong: util_1.stringToNum(dajiangdong),
                total: util_1.stringToNum(total)
            });
        });
    });
};
