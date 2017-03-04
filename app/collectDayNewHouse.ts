import { getDayDetail } from '../module/newHouse';
import * as moment from 'moment';
import { writeDeal } from '../storage';

export default (date: moment.Moment) => {
    return getDayDetail(date.format('YYYYMMDD')).then(detail => {
        return writeDeal({
            date: date.format('YYYY-MM-DD'),
            houseCnt: detail.houseCnt,
            allDealCnt: detail.allDealCnt
        });
    });
}