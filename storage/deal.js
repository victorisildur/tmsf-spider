"use strict";
exports.__esModule = true;
var mysql = require("mysql");
var pool = mysql.createPool({
    connectionLimit: 10000,
    host: 'localhost',
    user: 'root',
    password: '1111',
    database: 'tmsf'
});
var timeout = 0;
exports.writeDeal = function (deal) {
    pool.getConnection(function (err, conn) {
        if (err) {
            console.error(err);
            setTimeout(function () {
                exports.writeDeal(deal);
            }, 100 * (++timeout));
            return;
        }
        conn.query('INSERT INTO deal (`date`, `houseCnt`, `allCnt`) values(?, ?, ?)', [deal.date, deal.houseCnt, deal.allDealCnt], function (err, ret) {
            conn.release();
        });
    });
};
exports.writeSecondDeal = function (deal) {
    pool.getConnection(function (err, conn) {
        if (err) {
            console.error(err);
            setTimeout(function () {
                exports.writeSecondDeal(deal);
            }, 100 * (++timeout));
            return;
        }
        conn.query('INSERT INTO secondDeal (`date`, `houseCnt`, `allCnt`) values(?, ?, ?)', [deal.date, deal.houseCnt, deal.allDealCnt], function (err, ret) {
            conn.release();
        });
    });
};
