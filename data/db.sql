-- --------------------------------------------------------
-- Host:                         remotemysql.com
-- Versión del servidor:         8.0.13-4 - Percona Server (GPL), Release '4', Revision 'f0a32b8'
-- SO del servidor:              debian-linux-gnu
-- HeidiSQL Versión:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para bM90APIyMv
CREATE DATABASE IF NOT EXISTS `bM90APIyMv` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `bM90APIyMv`;

-- Volcando estructura para tabla bM90APIyMv.community
CREATE TABLE IF NOT EXISTS `community` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla bM90APIyMv.ejemplos
CREATE TABLE IF NOT EXISTS `ejemplos` (
  `col1` tinyint(4) DEFAULT NULL,
  `col2` smallint(6) DEFAULT NULL,
  `col3` mediumint(9) DEFAULT NULL,
  `col4` int(11) DEFAULT NULL,
  `col5` bigint(20) DEFAULT NULL,
  `col6` bit(1) DEFAULT NULL,
  `col7` float DEFAULT NULL,
  `col8` double DEFAULT NULL,
  `col9` decimal(10,0) DEFAULT NULL,
  `col10` char(1) COLLATE utf8_unicode_ci DEFAULT NULL,
  `col11` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `col12` tinytext COLLATE utf8_unicode_ci,
  `col13` mediumtext COLLATE utf8_unicode_ci,
  `col14` longtext COLLATE utf8_unicode_ci,
  `col15` json DEFAULT NULL,
  `col18` tinyblob,
  `col19` blob,
  `col20` mediumblob,
  `col21` longblob,
  `col22` date DEFAULT NULL,
  `col23` time DEFAULT NULL,
  `col24` year(4) DEFAULT NULL,
  `col25` datetime DEFAULT NULL,
  `col26` timestamp NULL DEFAULT NULL,
  `col30` geometry DEFAULT NULL,
  `col36` enum('a','b','c') COLLATE utf8_unicode_ci DEFAULT NULL,
  `col38` set('a','b','c') COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla bM90APIyMv.membership
CREATE TABLE IF NOT EXISTS `membership` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_user` int(10) unsigned NOT NULL,
  `id_community` int(10) unsigned NOT NULL,
  `id_role` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE_user_per_community` (`id_user`,`id_community`),
  KEY `FK_membership_role` (`id_role`),
  KEY `FK_membership_community` (`id_community`),
  CONSTRAINT `FK_membership_community` FOREIGN KEY (`id_community`) REFERENCES `community` (`id`),
  CONSTRAINT `FK_membership_role` FOREIGN KEY (`id_role`) REFERENCES `role` (`id`),
  CONSTRAINT `FK_membership_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla bM90APIyMv.permission
CREATE TABLE IF NOT EXISTS `permission` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_community` int(10) unsigned NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE_permission_name_community` (`name`,`id_community`),
  KEY `FK_permission_community` (`id_community`),
  CONSTRAINT `FK_permission_community` FOREIGN KEY (`id_community`) REFERENCES `community` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla bM90APIyMv.permission_per_role
CREATE TABLE IF NOT EXISTS `permission_per_role` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_permission` int(10) unsigned NOT NULL,
  `id_role` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE_permission_per_role` (`id_permission`,`id_role`),
  KEY `FK_permission_per_role_permission` (`id_permission`),
  KEY `FK_permission_per_role_role` (`id_role`),
  CONSTRAINT `FK_permission_per_role_permission` FOREIGN KEY (`id_permission`) REFERENCES `permission` (`id`),
  CONSTRAINT `FK_permission_per_role_role` FOREIGN KEY (`id_role`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla bM90APIyMv.role
CREATE TABLE IF NOT EXISTS `role` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_community` int(10) unsigned NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE_role_name_community` (`name`,`id_community`),
  KEY `FK_role_community` (`id_community`),
  CONSTRAINT `FK_role_community` FOREIGN KEY (`id_community`) REFERENCES `community` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla bM90APIyMv.session
CREATE TABLE IF NOT EXISTS `session` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_user` int(10) unsigned NOT NULL,
  `secret_token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `recovery_token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE_user_per_session` (`id_user`),
  CONSTRAINT `FK__user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla bM90APIyMv.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE_user_name` (`name`),
  UNIQUE KEY `UNIQUE_user_mail` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- La exportación de datos fue deseleccionada.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
