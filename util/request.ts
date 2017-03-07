import * as https from 'https';
import * as zlib from 'zlib';

const clientHeaders = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, sdch, br',
    'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Host': 'www.alexaskillstore.com',
    'Pragma': 'no-cache',
    'Upgrade-Insecure-Requests': 1,
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
}

interface Option {
    host: string;
    path: string;
}

export const request = (option: Option) => {
    return new Promise<string>((resolve, reject) => {
        https.get({
            host: option.host,
            path: option.path,
            headers: clientHeaders
        }, res => {
            const gunzip = zlib.createGunzip();
            res.pipe(gunzip);
            let buffer = [];
            gunzip
                .on('data', data => {
                    buffer.push(data.toString());
                })
                .on('end', data => {
                    const ret = buffer.join('');
                    resolve(ret);
                })
                .on('error', e => {
                    console.error(`requesting url ${option.host}${option.path} fail`);
                    reject(e);
                });
            res.on('error', e => {
                console.error(`requesting url ${option.host}${option.path} fail`);
                reject(e);
            });
        }).on('error', e => {
            reject(e);
        });
    });
}