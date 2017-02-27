import { getDayDetail } from '../module/newHouse';
import * as moment from 'moment';
import { writeDeal } from '../storage/deal';

export default (date: moment.Moment) => {
    getDayDetail(date.format('YYYYMMDD')).then(detail => {
        writeDeal({
            date: date.format('YYYY-MM-DD'),
            houseCnt: detail.houseCnt,
            allDealCnt: detail.allDealCnt
        });
    });
}