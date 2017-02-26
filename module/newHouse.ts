import * as cheerio from 'cheerio';
import { host, dailyPath } from '../config/index';
import { request, stringToNum } from '../util';

const getDayPagePath = (date: string) => {
    return `${dailyPath}/${date}/xf.html`;
}

interface DayDeal {
    allDealCnt: number;
    houseCnt: number;
}

export const getDayDetail = (date: string) => {
    return new Promise<DayDeal>((resolve, reject) => {
        request({
            host: host,
            path: getDayPagePath(date)
        }).then(html => {
            const $ = cheerio.load(html);
            const tableRows = $('table').first().find('tr');
            let houseCnt = tableRows.eq(1).find('td').eq(1).text();
            let allDealCnt = tableRows.eq(5).find('td').eq(1).text();
            houseCnt = stringToNum(houseCnt);
            allDealCnt = stringToNum(allDealCnt);
            console.log(`${date} newHouseCnt: ${houseCnt}, allDealCnt: ${allDealCnt}`);
            resolve({
                allDealCnt: allDealCnt,
                houseCnt: houseCnt
            });
        })
    })
}