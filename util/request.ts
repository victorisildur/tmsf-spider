import * as http from 'http';

const clientHeaders = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.117 Safari/537.36'
}

interface Option {
    host: string;
    path: string;
}

export const request = (option: Option) => {
    return new Promise<string>((resolve, reject) => {
        http.get({
            host: option.host,
            path: option.path,
            port: 80,
            headers: clientHeaders
        }, res => {
            let html = '';
            res.on('data', data => {
                html += data;
            });
            res.on('end', data => {
                resolve(html);
            });
            res.on('error', e => {
                console.error(`requesting url ${option.host}${option.path} fail`);
                reject(e);
            });
        });
    });
}