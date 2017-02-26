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