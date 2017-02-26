export const stringToNum = (str: string) => {
    str = str.replace(/[,\s]/g, '');
    return Number(str);
}