CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) COLLATE utf8mb4_bin NOT NULL,
  `pwd` varchar(64) COLLATE utf8mb4_bin NOT NULL,
  `head_img` varchar(255) COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
CREATE TABLE `course` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(20) COLLATE utf8mb4_bin NOT NULL,
  `title` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `del` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;