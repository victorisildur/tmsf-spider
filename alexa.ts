import { getSkills } from './module/getAlexaSkill';
import { Skill } from './model';
import { getTypePath } from './util/url';
import { skillToCsv } from './util/string';
import * as fs from 'fs';
import { PATH_MAP } from './config';

const date = new Date();
const FILENAME = `alexa_skills_${date.getHours()}_${date.getMinutes()}.csv`;

if (!fs.existsSync(FILENAME)) {
    fs.appendFile(FILENAME, '类别,名称,数量,星级\n');
}

let cnt = 0;

const fetchSkillPage = (path: string, type: string) => {
    getSkills(
        path,
        type
    ).then((ret) => {
        ret.skills.forEach(skill => {
            cnt++;
            fs.appendFile(FILENAME, skillToCsv(skill));
        })
        console.log(`total cnt: ${cnt}`);
        if (ret.nextPath) {
            fetchSkillPage(ret.nextPath, type);
        }
    }, (e) => {
        console.error(`err at page ${type}, ${path}:\n\t${e}`);
        setTimeout(() => {
            fetchSkillPage(path, type);
        }, 1000);
    });
}


Object.keys(PATH_MAP).forEach((type, idx) => {
    fetchSkillPage(getTypePath(PATH_MAP[type].path), type);
});