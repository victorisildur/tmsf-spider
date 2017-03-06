import * as https from 'https';
import * as zlib from 'zlib';

const clientHeaders = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, sdch, br',
    'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Host': 'www.amazon.com',
    'Pragma': 'no-cache',
    'Referer': 'https://www.amazon.com/alexa-skills/b/ref=topnav_storetab_a2s?ie=UTF8&node=13727921011',
    'Upgrade-Insecure-Requests': 1,
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
    'Cookie': 'aws-session-id=155-9835504-7769250; aws-session-id-time=2119075641l; aws-session-token="yB5k/ODQr6fBDy6r9qQXrQ4+W0m3OefcTrIhMmN/A/HNXzZ0tViy/hiU4NN22RLc7bbc8dUgm6hcCab87ygdvYTAAT+GlzTBme1lX9Tu8yyX5fr2j/NsYgcPFshoD6VwKlI83tUhJIALUW75WYM5r6Ds2x7pPxt2FK2I1gyuMGccRvmx8zq9R7oN2ioUrLIX1UnFnZX6XqpbRrNT6FkxmA=="; __utma=194891197.1720748589.1488355644.1488424159.1488770523.3; __utmc=194891197; __utmz=194891197.1488770523.3.3.utmccn=(referral)|utmcsr=console.aws.amazon.com|utmcct=/iot/home|utmcmd=referral; aws-ubid-main=155-1076684-6432812; aws-target-static-id=1488770555327-402110; aws-mkto-trk=id%3A112-TZM-766%26token%3A_mch-aws.amazon.com-1488770556493-52287; aws-target-visitor-id=1488770555330-970453.24_11; aws-target-data=%7B%22support%22%3A%221%22%7D; s_vn=1520306556105%26vn%3D2; regStatus=pre-register; JSESSIONID=DB0A64CAFEF8C12C12D557DC05A39793; s_vnum=1490976000195%26vn%3D1; appstore-devportal-locale=en_US; s_fid=44F33CAF42550CF5-23FA999457928E74; session-token="Ci08eGFN2eg296RLSzJLvM2UFEGO6oQbeDYRdBXyxQ/aY8dTFt1s8HW8DXt4k6uJej+zVa8q9CU+GYJ7ZTswQmsFLAhK6b+QFuFzXFIwXI+x/svTNw+yUbmwS90PVRbBdOA6jYcUDbEX+k7injEJpPDKPEmNDhqXd/AzA5CZdEUf1P1peBiA1VmZGjOWo5UAfMByazPlc+Y97qO2IIa4feq8hzkm4qhAtIjZzA0kKn3fci6qrZ0OWHR4YJXOguAFjSGJa+c+RFT9dUx64niUiw=="; x-main=E9jsVy1IWIMQEQ4UzuEFWJZaMoRVlG9xrTI7GUDentJxfHfN4im4V4rv0dCdUN9T; at-main=Atza|IwEBICjt15379Ege5VWFX5Q9HIlp_2cRPsntpBfGdlmlZNs0peabdp92VdiXzjL4rAw69PNPchrcI56MLLSAIL--1_djoNgzHzACtgBp8YUEt1dW3LPPu9N0km693ZtLacEXZJNxO-GgWtgkgF13K0ZrGIK2_FRl7nGoR2clw17SKKAviVs-YZwjpcbiP-821FmaCy_37jmEqlYb3AB6nXQA7ImDCYxZGgumpakt5r7QeY7VFx1byX0T1asatqS9Ch7d9AwPiU7oggJDF24no_MgsTo-7fQSoJ3CgbYrNRlLYuiaFZzPGc7Tft0dEfgCint6X-prB6GYpvg0Vp9dgKu0GeVejAF3ckGM0RyUV2QIEn3aORDGmmiSC187qvGb4tCMK2UqpPCzK46Wo1d6V_0ul6kg; sess-at-main="iYFs7P5392YIXrg97rbDmdgNypxGSdwtpSTe65+9w9k="; x-wl-uid=1JDrQ6TMpxUzo4q4gwJJJwULNxrVsgiQCo6R5cGl+XnbZ7/Pm/c1VS7Y/es+Z6C7anCLBEOruaUATlSviwy23piHXpR+x7aYba6pPmkOWWVQHSQ7N64L1wlR1VVks6iLYGF8X/9yW0bA=; s_cc=true; s_nr=1488791395838-Repeat; s_dslv=1488791395840; s_sq=%5B%5BB%5D%5D; s_ppv=39; lc-main=en_US; csm-hit=9CJMZZH0H3F4XSGD61KR+s-9CJMZZH0H3F4XSGD61KR|1488801261176; session-id-time=2082787201l; session-id=155-8419246-2886542; ubid-main=154-5836841-8158832'
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
        });
    });
}