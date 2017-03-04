import * as mysql from 'mysql';
import { DayDeal, Inventory } from '../model';
require('events').EventEmitter.prototype._maxListeners = 1000;

const pool = mysql.createPool({
    connectionLimit: 4,
    host: 'localhost',
    localAddress: '127.0.0.1',
    user: 'root',
    password: '1111',
    database: 'tmsf',
    waitForConnections: true,
    queueLimit: 1000
});

let timeout = 0;

const _write = (sql: string, value: any) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) {
                console.error(err);
                setTimeout(() => {
                    _write(sql, value);
                }, 100 * (++timeout));
                return;
            }
            conn.on('error', err => {
                conn.release();
                setTimeout(() => {
                    _write(sql, value);
                }, 100 * (++timeout));
            });
            conn.query(sql, value, (err, ret) => {
                conn.release();
                resolve();
                if (err) {
                    console.error(err);
                    setTimeout(() => {
                        _write(sql, value);
                    }, 100 * (++timeout));
                }
            });

        })
    })
}

export const writeDeal = (deal: DayDeal) => {
    return _write('INSERT INTO deal (`date`, `houseCnt`, `allCnt`) values(?, ?, ?)', [deal.date, deal.houseCnt, deal.allDealCnt]);
}

export const writeSecondDeal = (deal: DayDeal) => {
    return _write('INSERT INTO secondDeal (`date`, `houseCnt`, `allCnt`) values(?, ?, ?)', [deal.date, deal.houseCnt, deal.allDealCnt]);
}

export const writeInventory = (inventory: Inventory) => {
    return _write('INSERT INTO inventory (`date`, `zhucheng`, `xiaoshan`, `yuhang`, `fuyang`, `dajiangdong`, `total`) values (?,?,?,?,?,?,?)',
        [inventory.date, inventory.zhucheng, inventory.xiaoshan, inventory.yuhang, inventory.fuyang, inventory.dajiangdong, inventory.total]
    );
}