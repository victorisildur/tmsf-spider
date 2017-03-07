"use strict";
exports.__esModule = true;
var cheerio = require("cheerio");
var config_1 = require("../config");
var util_1 = require("../util");
exports.getSkills = function (type, page) {
    if (page === void 0) { page = 1; }
    return new Promise(function (resolve, reject) {
        util_1.request({
            host: config_1.alexaHost,
            path: "/" + type + "/?page=" + page
        }).then(function (html) {
            var $ = cheerio.load(html);
            var skills = [];
            // 表格
            var rows = $('.list-group-item');
            rows.each(function (i, elem) {
                var li = $(this);
                var name = li.find('.media-heading').text().trim(), count = 0, star = 0;
                var countStar = li.find('.col-md-3.col-lg-3').contents();
                if (countStar.length > 2) {
                    count = util_1.parenToNum(countStar.first().text());
                    star = util_1.stringToNum(li.find('input.rating').attr('value'));
                }
                var skill = {
                    name: name,
                    star: star,
                    count: count,
                    type: type
                };
                if (skill.name !== '') {
                    skills.push(skill);
                }
            });
            resolve(skills);
        }, function (e) {
            reject(e);
        });
    });
};
