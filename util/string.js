"use strict";
exports.__esModule = true;
exports.stringToNum = function (str) {
    if (!str)
        return 0;
    str = str.replace(/[,\s]/g, '');
    return Number(str);
};
exports.parenToNum = function (str) {
    str = str.replace(/[\(\),\s]/g, '');
    return Number(str);
};
