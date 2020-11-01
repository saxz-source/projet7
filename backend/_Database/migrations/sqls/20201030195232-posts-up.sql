CREATE TABLE IF NOT EXISTS `posts` ( 
        `id` int NOT NULL AUTO_INCREMENT,
        `id_author` int NOT NULL,
        `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `title` TINYTEXT NOT NULL,
        `category` varchar(15) NOT NULL,
        `content` TEXT,
        `media` varchar(100),
        `comments_number` int DEFAULT 0,
        `visibility` TINYINT NOT NULL DEFAULT 1,
        PRIMARY KEY (`id`)
        )