import * as cheerio from 'cheerio';
import { host, dailyPath } from '../config';
import { request, stringToNum } from '../util';
import { DayDeal } from '../model';

const getDayPagePath = (date: string) => {
    return `${dailyPath}/${date}/esf.html`;
}

export const getDayDetail = (date: string) => {
    return new Promise<DayDeal>((resolve, reject) => {
        request({
            host: host,
            path: getDayPagePath(date)
        }).then(html => {
            const $ = cheerio.load(html);
            // 第1个表格里
            const tableRows = $('table').eq(0).find('tr');
            // 最后一行 
            const row = tableRows.last();
            // 2, 4 列
            let allDealCnt = row.find('td').eq(1).text();
            let houseCnt = row.find('td').eq(3).text();
            houseCnt = stringToNum(houseCnt);
            allDealCnt = stringToNum(allDealCnt);
            console.log(`date: ${date}, oldHouseCnt: ${houseCnt}, allDealCnt: ${allDealCnt}`);
            resolve({
                allDealCnt: allDealCnt,
                houseCnt: houseCnt
            });
        })
    })
}