import { getDayDetail } from '../module/oldHouse';
import * as moment from 'moment';
import { writeSecondDeal } from '../storage';

export default (date: moment.Moment) => {
    return getDayDetail(date.format('YYYYMMDD')).then(detail => {
        return writeSecondDeal({
            date: date.format('YYYY-MM-DD'),
            houseCnt: detail.houseCnt,
            allDealCnt: detail.allDealCnt
        });
    });
}