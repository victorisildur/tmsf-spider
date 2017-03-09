import * as cheerio from 'cheerio';
import { awsHost as host } from '../config';
import { request, stringToNum } from '../util';
import { Skill, skillToString, extractStar } from '../model';

interface FetchRet {
    skills: Skill[];
    nextPath: string;
}

export const getSkills = (path: string, type: string) => {
    console.log(`fetch type: ${type}, page: ${path}`);
    return new Promise<FetchRet>((resolve, reject) => {
        request({ host: host, path: path }).then(html => {
            const $ = cheerio.load(html);
            // 表格
            const rows = $('li.s-result-item'),
                nextPath = $('#pagnNextLink').attr('href');
            console.log(`\ttype: ${type}\tnextPath: ${nextPath}`);
            const skills = rows.map((i, elem) => {
                const li = $(elem),
                    name = li.find('h2.a-size-medium').text(),
                    count = li.find('a.a-size-small.a-link-normal.a-text-normal').text() || 0,
                    star = extractStar(li.find('.a-icon-alt').text());
                const skill = {
                    type,
                    name,
                    count,
                    star
                }
                console.log(`\ttype:${type}: ${skillToString(skill)}`);
                return skill;
            }).get();
            resolve({
                skills,
                nextPath
            });
        }, e => reject(e))
    })
}