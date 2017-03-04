drop table if exists `secondDeal`;
create table if not exists `secondDeal` (
    `id` int(10) NOT NULL auto_increment,
    `houseCnt` int(10) NOT NULL,
    `allCnt` int(10) NOT NULL,
    `date` date NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

drop table if exists `deal`;
create table if not exists `deal` (
    `id` int(10) NOT NULL auto_increment,
    `houseCnt` int(10) NOT NULL,
    `allCnt` int(10) NOT NULL,
    `date` date NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

drop table if exists `inventory`;
create table if not exists `inventory` (
    `id` int(10) NOT NULL auto_increment,
    `date` date NOT NULL,
    `zhucheng` int(10) NOT NULL,
    `xiaoshan` int(10) NOT NULL,
    `yuhang` int(10) NOT NULL,
    `fuyang` int(10) NOT NULL,
    `dajiangdong` int(10) NOT NULL,
    `total` int(10) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;