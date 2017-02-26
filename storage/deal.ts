import * as mysql from 'mysql';
import { DayDeal } from '../model';

const pool = mysql.createPool({
    connectionLimit: 10000,
    host: 'localhost',
    user: 'root',
    password: '1111',
    database: 'tmsf'
})

let timeout = 0;

export const writeDeal = (deal: DayDeal) => {
    pool.getConnection((err, conn) => {
        if (err) {
            console.error(err);
            setTimeout(() => {
                writeDeal(deal);
            }, 100 * (++timeout));
            return;
        }
        conn.query('INSERT INTO deal (`date`, `houseCnt`, `allCnt`) values(?, ?, ?)', [deal.date, deal.houseCnt, deal.allDealCnt], (err, ret) => {
            conn.release();
        });
    })
}

export const writeSecondDeal = (deal: DayDeal) => {
    pool.getConnection((err, conn) => {
        if (err) {
            console.error(err);
            setTimeout(() => {
                writeSecondDeal(deal);
            }, 100 * (++timeout));
            return;
        }
        conn.query('INSERT INTO secondDeal (`date`, `houseCnt`, `allCnt`) values(?, ?, ?)', [deal.date, deal.houseCnt, deal.allDealCnt], (err, ret) => {
            conn.release();
        });
    })
}