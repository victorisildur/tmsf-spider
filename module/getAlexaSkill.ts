import * as cheerio from 'cheerio';
import { alexaHost as host } from '../config';
import { request, stringToNum, parenToNum } from '../util';
import { Skill } from '../model';

export const getSkills = (type: string, page = 1) => {
    return new Promise<Skill[]>((resolve, reject) => {
        request({
            host: host,
            path: `/${type}/?page=${page}`
        }).then(html => {
            const $ = cheerio.load(html);
            let skills = [];
            // 表格
            const rows = $('.list-group-item');
            rows.each(function (i, elem) {
                const li = $(this);
                let name = li.find('.media-heading').text().trim(),
                    count = 0,
                    star = 0;
                const countStar = li.find('.col-md-3.col-lg-3').contents();
                if (countStar.length > 2) {
                    count = parenToNum(countStar.first().text());
                    star = stringToNum(li.find('input.rating').attr('value'));
                }
                const skill = {
                    name,
                    star,
                    count,
                    type
                };
                if (skill.name !== '') {
                    skills.push(skill);
                }
            });
            resolve(skills);
        }, e => {
            reject(e);
        })
    })
}