export const stringToNum = (str: string) => {
    if (!str) return 0;
    str = str.replace(/[,\s]/g, '');
    return Number(str);
}

export const parenToNum = (str: string) => {
    str = str.replace(/[\(\),\s]/g, '');
    return Number(str);
}