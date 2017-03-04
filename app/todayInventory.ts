import * as moment from 'moment';
import { writeInventory } from '../storage';
import { getTodayInventory } from '../module/getInventory';

export default (date: moment.Moment) => {
    getTodayInventory(date.format('YYYYMMDD')).then(inventory => {
        console.dir(inventory);
        return writeInventory({
            date: date.format('YYYY-MM-DD'),
            zhucheng: inventory.zhucheng,
            xiaoshan: inventory.xiaoshan,
            yuhang: inventory.yuhang,
            fuyang: inventory.fuyang,
            dajiangdong: inventory.dajiangdong,
            total: inventory.total
        });
    }).then(() => {
        process.exit(0);
    })
}