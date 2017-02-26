"use strict";
exports.__esModule = true;
var http = require("http");
var clientHeaders = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.117 Safari/537.36'
};
exports.request = function (option) {
    return new Promise(function (resolve, reject) {
        http.get({
            host: option.host,
            path: option.path,
            port: 80,
            headers: clientHeaders
        }, function (res) {
            var html = '';
            res.on('data', function (data) {
                html += data;
            });
            res.on('end', function (data) {
                resolve(html);
            });
            res.on('error', function (e) {
                console.error("requesting url " + option.host + option.path + " fail");
                reject(e);
            });
        });
    });
};
