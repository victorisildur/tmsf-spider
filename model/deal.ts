export interface DayDeal {
    date?: string; //YYYYMMDD
    allDealCnt: number;
    houseCnt: number;
}


export interface Inventory {
    date?: string; //YYYYMMDD
    zhucheng: number;
    xiaoshan: number;
    yuhang: number;
    fuyang: number;
    dajiangdong: number;
    total: number;
}

export interface Skill {
    name: string;
    star: number;
    count: number;
}