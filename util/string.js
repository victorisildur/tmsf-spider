"use strict";
exports.__esModule = true;
exports.stringToNum = function (str) {
    str = str.replace(/[,\s]/g, '');
    return Number(str);
};
exports.skillToCsv = function (skill) {
    var name = skill.name.replace(/,/g, ' ');
    return skill.type + "," + skill.name + "," + skill.count + "," + skill.star + "\n";
};
