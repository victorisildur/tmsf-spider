export interface Skill {
    type?: string;
    name: string;
    star: number;
    count: number;
}

export const skillToString = (skill: Skill) => {
    return `count: ${skill.count}, star: ${skill.star}, type: ${skill.type}, name: ${skill.name}`;
}

export const extractStar = (text: string) => {
    if (!text) return 0;
    const reg = /([\d\.]+)\sout\sof/g
    const m = reg.exec(text);
    if (m && m.length > 1)
        return Number(m[1]);
    else
        return 0;
}