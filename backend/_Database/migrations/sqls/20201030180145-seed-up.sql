CREATE TABLE IF NOT EXISTS `users` ( 
        `id` int NOT NULL AUTO_INCREMENT,
        `email` varchar(50) NOT NULL,
        `firstName` varchar(20) NOT NULL,
        `lastName` varchar(30) NOT NULL,
        `password` varchar(100) NOT NULL,
        `fullName` varchar(51) NOT NULL,
        `role` varchar(5),
        PRIMARY KEY (`id`)
        )

