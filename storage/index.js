"use strict";
exports.__esModule = true;
var mysql = require("mysql");
require('events').EventEmitter.prototype._maxListeners = 1000;
var pool = mysql.createPool({
    connectionLimit: 4,
    host: 'localhost',
    localAddress: '127.0.0.1',
    user: 'root',
    password: '1111',
    database: 'tmsf',
    waitForConnections: true,
    queueLimit: 1000
});
var timeout = 0;
var _write = function (sql, value) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, conn) {
            if (err) {
                console.error(err);
                setTimeout(function () {
                    _write(sql, value);
                }, 100 * (++timeout));
                return;
            }
            conn.on('error', function (err) {
                conn.release();
                setTimeout(function () {
                    _write(sql, value);
                }, 100 * (++timeout));
            });
            conn.query(sql, value, function (err, ret) {
                conn.release();
                resolve();
                if (err) {
                    console.error(err);
                    setTimeout(function () {
                        _write(sql, value);
                    }, 100 * (++timeout));
                }
            });
        });
    });
};
exports.writeDeal = function (deal) {
    return _write('INSERT INTO deal (`date`, `houseCnt`, `allCnt`) values(?, ?, ?)', [deal.date, deal.houseCnt, deal.allDealCnt]);
};
exports.writeSecondDeal = function (deal) {
    return _write('INSERT INTO secondDeal (`date`, `houseCnt`, `allCnt`) values(?, ?, ?)', [deal.date, deal.houseCnt, deal.allDealCnt]);
};
exports.writeInventory = function (inventory) {
    return _write('INSERT INTO inventory (`date`, `zhucheng`, `xiaoshan`, `yuhang`, `fuyang`, `dajiangdong`, `total`) values (?,?,?,?,?,?,?)', [inventory.date, inventory.zhucheng, inventory.xiaoshan, inventory.yuhang, inventory.fuyang, inventory.dajiangdong, inventory.total]);
};
