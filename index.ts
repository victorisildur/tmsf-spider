import collectNew from './app/collectDayNewHouse';
import collectOld from './app/collectDayOldHouse';
import * as moment from 'moment';

const days = 3650;

for (let i = 0; i < days; i++) {
    let date = moment().subtract(i + 1, 'days');
    setTimeout(() => {
        if (date.isAfter('2013-01-13')) {
            // new house statistic
            collectNew(date);
            // old house statistic
            collectOld(date);
        }
    }, i * 30);
}
