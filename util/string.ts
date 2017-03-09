import { Skill } from '../model';

export const stringToNum = (str: string) => {
    str = str.replace(/[,\s]/g, '');
    return Number(str);
}

export const skillToCsv = (skill: Skill) => {
    const name = skill.name.replace(/,/g, ' ');
    return `${skill.type},${skill.name},${skill.count},${skill.star}\n`;
}