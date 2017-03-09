import * as qs from 'qs';

export const getTypePath1 = (num: number) => {
    const param = {
        fst: 'as:off',
        rh: 'n:13727921011,n:!13727922011,n:14284851011',
        bbn: 13727922011,
        ie: 'UTF8',
        qid: 1489066103,
        rnid: 13727922011
    }
    return `/s/ref=lp_13727921011_nr_n_${num}?${qs.stringify(param)}`;
}

export const getTypePath = (url: string) => {
    return url.replace('https://www.amazon.com', '');
}