import { getSkills } from '../module/getAlexaSkill';
import { Skill } from '../model';
import * as fs from 'fs';
import { interval } from '../config';

if (!fs.existsSync('skills.csv')) {
    fs.appendFile('skills.csv', '类别,名称,数量,星级\n');
}

const skillToCsv = (skill: Skill) => {
    return `${skill.type},${skill.name},${skill.count},${skill.star}\n`;
}

export const fetchSkills = (type: string, pages: number) => {
    for (let i = 1; i <= pages; i++) {
        setTimeout(() => {
            console.log(`fetching type: ${type}, page: ${i}...`);
            getSkills(type, i).then(skills => {
                skills.forEach(skill => {
                    console.dir(skill);
                    fs.appendFile('skills.csv', skillToCsv(skill))
                })
            }, e => {
                console.error(e);
            });
        }, i * interval);
    }
}