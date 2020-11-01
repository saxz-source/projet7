CREATE TABLE IF NOT EXISTS `comments`  ( 
        `id` int NOT NULL AUTO_INCREMENT,
        `id_commentAuthor` int NOT NULL,
        `id_post` int NOT NULL,
        `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `comment_content` varchar(500) NOT NULL ,
        `visibility` TINYINT NOT NULL DEFAULT 1,
        PRIMARY KEY (`id`)
        )