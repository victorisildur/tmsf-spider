import * as cheerio from 'cheerio';
import { host, dailyPath } from '../config';
import { request, stringToNum } from '../util';
import { DayDeal } from '../model';

const getDayPagePath = (date: string) => {
    return `${dailyPath}/${date}/xf.html`;
}

export const getDayDetail = (date: string) => {
    return new Promise<DayDeal>((resolve, reject) => {
        request({
            host: host,
            path: getDayPagePath(date)
        }).then(html => {
            const $ = cheerio.load(html);
            // 第二个表格里
            const tableRows = $('table').eq(1).find('tr');
            // 第2,6行
            let houseCnt = tableRows.eq(1).find('td').eq(1).text();
            let allDealCnt = tableRows.eq(5).find('td').eq(1).text();
            houseCnt = stringToNum(houseCnt);
            allDealCnt = stringToNum(allDealCnt);
            console.log(`date: ${date}, newHouseCnt: ${houseCnt}, allDealCnt: ${allDealCnt}`);
            resolve({
                allDealCnt: allDealCnt,
                houseCnt: houseCnt
            });
        })
    })
}