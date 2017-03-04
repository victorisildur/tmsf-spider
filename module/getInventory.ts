import * as cheerio from 'cheerio';
import { host } from '../config';
import { request, stringToNum } from '../util';
import { Inventory } from '../model';

export const getTodayInventory = (date: string) => {
    return new Promise<Inventory>((resolve, reject) => {
        request({
            host: host,
            path: '/index.jsp'
        }).then(html => {
            const $ = cheerio.load(html);
            // 表格#myCont5里
            const table = $('#myCont5').find('table');
            const rows = table.find('tr')
            // 第2->6行
            const zhucheng = rows.eq(1).find('td').eq(3).text(),
                xiaoshan = rows.eq(2).find('td').eq(3).text(),
                yuhang = rows.eq(3).find('td').eq(3).text(),
                fuyang = rows.eq(4).find('td').eq(3).text(),
                dajiangdong = rows.eq(5).find('td').eq(3).text(),
                total = rows.eq(6).find('td').eq(3).text();

            resolve({
                date,
                zhucheng: stringToNum(zhucheng),
                xiaoshan: stringToNum(xiaoshan),
                yuhang: stringToNum(yuhang),
                fuyang: stringToNum(fuyang),
                dajiangdong: stringToNum(dajiangdong),
                total: stringToNum(total)
            });
        })
    })
}