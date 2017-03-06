import * as cheerio from 'cheerio';
import { awsHost as host } from '../config';
import { request, stringToNum } from '../util';
import { Skill } from '../model';

export const getSkills = (path: string) => {
    return new Promise<Skill>((resolve, reject) => {
        request({
            host: host,
            path: path
        }).then(html => {
            const $ = cheerio.load(html);
            // 表格
            console.log(html);
            const table = $('#s-results-list-atf');
            const rows = table.find('li');
            let skills = rows.map((i, elem) => {
                const li = $(this);
                const name = li.find('h2').text();
                const count = li.find('.a-size-small.a-link-normal.a-text-normal').text();
                const star = 0;
                console.log(`name: ${name}`);
                console.log(`count: ${count}`);
                return {
                    name: name,
                    star: 0,
                    count: count
                };
            })
            console.dir(skills);
            resolve(skills);
        })
    })
}