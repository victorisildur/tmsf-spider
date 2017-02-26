import { getDayDetail } from '../module/newHouse';
import * as moment from 'moment';

export default () => {
    const date = moment().subtract(2, 'days').format('YYYYMMDD');
    getDayDetail(date).then(detail => {
        console.dir(detail);
    });
}