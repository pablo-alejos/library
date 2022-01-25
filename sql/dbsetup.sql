ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'toor';
flush privileges;
DROP DATABASE IF EXISTS library;
CREATE DATABASE library;
USE library;

DROP TABLE IF EXISTS genre;
CREATE TABLE `library`.`genre` (
  `id` VARCHAR(2) NOT NULL,
  `desc` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));
INSERT INTO `library`.`genre` (`id`, `desc`) VALUES ('DR', 'Drama');
INSERT INTO `library`.`genre` (`id`, `desc`) VALUES ('CF', 'Ciencia Ficcion');
INSERT INTO `library`.`genre` (`id`, `desc`) VALUES ('RO', 'Romance');
INSERT INTO `library`.`genre` (`id`, `desc`) VALUES ('DI', 'Didactico');
INSERT INTO `library`.`genre` (`id`, `desc`) VALUES ('IN', 'Infantil');
INSERT INTO `library`.`genre` (`id`, `desc`) VALUES ('SU', 'Suspenso');

DROP TABLE IF EXISTS corridor;
CREATE TABLE `library`.`corridor` (
`id` VARCHAR(3) NOT NULL,
  PRIMARY KEY (`id`));

DROP TABLE IF EXISTS bookStatus;
CREATE TABLE `library`.`bookStatus` (
`id` INT NOT NULL,
`desc` VARCHAR(20) NOT NULL,
PRIMARY KEY (`id`));
INSERT INTO `library`.`bookStatus` (`id`, `desc`) VALUES (1, 'Préstamo');
INSERT INTO `library`.`bookStatus` (`id`, `desc`) VALUES (2, 'Disponible');
INSERT INTO `library`.`bookStatus` (`id`, `desc`) VALUES (3, 'Baja');

DROP TABLE IF EXISTS book;
CREATE TABLE `library`.`book` (
`genre` VARCHAR(2) NOT NULL,
`corridor` VARCHAR(2) NOT NULL,
`id` VARCHAR(8) NOT NULL,
`author` VARCHAR(80) NOT NULL,
`title` VARCHAR(80) NOT NULL,
`pubDate` VARCHAR(10) NOT NULL,
`status` VARCHAR(8) NOT NULL,
  PRIMARY KEY (`id`));

DROP TABLE IF EXISTS user;
CREATE TABLE `library`.`user` (
`name` VARCHAR(80) NOT NULL,
`captureDate` VARCHAR(10) NOT NULL,
`id` VARCHAR(9) NOT NULL,
  PRIMARY KEY (`id`));
  
  DROP TABLE IF EXISTS borrow;
CREATE TABLE `library`.`borrow` (
`user` VARCHAR(80) NOT NULL,
`book` VARCHAR(8) NOT NULL,
`id` INT auto_increment NOT NULL,
  PRIMARY KEY (`id`));
  
###CONSTRAINTS###
ALTER TABLE `library`.`book` ADD INDEX fk_genre_idx (genre ASC) VISIBLE;
ALTER TABLE `library`.`book` 
ADD CONSTRAINT fk_genre
  FOREIGN KEY (genre)
  REFERENCES `library`.`genre` (id)
  ON DELETE RESTRICT
  ON UPDATE CASCADE; 

ALTER TABLE `library`.`book` ADD INDEX fk_corridor_idx (corridor ASC) VISIBLE;
ALTER TABLE `library`.`book` 
ADD CONSTRAINT fk_corridor
  FOREIGN KEY (corridor)
  REFERENCES `library`.`corridor` (id)
  ON DELETE RESTRICT
  ON UPDATE CASCADE; 
  
ALTER TABLE `library`.`borrow` ADD INDEX fk_book_idx (book ASC) VISIBLE;
ALTER TABLE `library`.`borrow` 
ADD CONSTRAINT fk_book
  FOREIGN KEY (book)
  REFERENCES `library`.`book` (id)
  ON DELETE RESTRICT
  ON UPDATE CASCADE; 
  
ALTER TABLE `library`.`borrow` ADD INDEX fk_user_idx (user ASC) VISIBLE;
ALTER TABLE `library`.`borrow` 
ADD CONSTRAINT fk_user
  FOREIGN KEY (user)
  REFERENCES `library`.`user` (id)
  ON DELETE RESTRICT
  ON UPDATE CASCADE; 