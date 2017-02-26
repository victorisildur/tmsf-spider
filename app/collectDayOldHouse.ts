import { getDayDetail } from '../module/oldHouse';
import * as moment from 'moment';
import { writeSecondDeal } from '../storage/deal';

export default (date: moment.Moment) => {
    getDayDetail(date.format('YYYYMMDD')).then(detail => {
        console.dir(detail);
        writeSecondDeal({
            date: date.format('YYYY-MM-DD'),
            houseCnt: detail.houseCnt,
            allDealCnt: detail.allDealCnt
        });
    });
}