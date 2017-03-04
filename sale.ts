import collectNew from './app/collectDayNewHouse';
import collectOld from './app/collectDayOldHouse';
import * as moment from 'moment';

const date = moment().subtract(1, 'days');

Promise.all([collectNew(date), collectOld(date)]).then(() => {
    process.exit(0);
})