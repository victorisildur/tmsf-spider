"use strict";
exports.__esModule = true;
exports.stringToNum = function (str) {
    str = str.replace(/[,\s]/g, '');
    return Number(str);
};
