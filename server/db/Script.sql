DROP DATABASE if EXISTS db_test;
CREATE DATABASE if NOT EXISTS db_test CHARACTER SET utf8;
USE db_test;

-- =========================================================================
-- Tables
-- =========================================================================
CREATE TABLE if NOT EXISTS user(
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    firstnametransform VARCHAR(255),
    birthday DATE NOT NULL,
    dead DATE,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    sex VARCHAR(255) NOT NULL,
    password_user VARCHAR(255) NOT NULL,
    confirm_password_user VARCHAR(255) NOT NULL,
    status_user VARCHAR(255) NOT NULL
);

CREATE TABLE if NOT EXISTS subscription(
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    price BIGINT NOT NULL,
    sold BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE if NOT EXISTS benefit(
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    avantage VARCHAR(255) NOT NULL,
    id_subscription INT UNSIGNED NOT NULL
);

-- =========================================================================
-- Foreign key
-- =========================================================================

ALTER TABLE benefit ADD CONSTRAINT fk_benefit_subscription FOREIGN KEY(id_subscription)
	REFERENCES subscription(id);

-- =========================================================================
-- Index Unique
-- =========================================================================
CREATE UNIQUE INDEX index_email
ON user(email);

-- INSERT INTO subscription(price, sold) 
-- VALUES
--     (50,null),
--     (25,null),
--     (30,null);

-- INSERT INTO benefit(avantage, id_subscription) 
-- VALUES
--     ("Ceation du site web", 1),
--     ("Ajout Photo", 1),
--     ("Ajout Videos", 1),
--     ("Creation de site web", 3),
--     ("Ajout Photo", 3),
--     ("Ajout video", 2);


-- INSERT INTO user(lastname, firstname, firstnametransform, birthday, dead, email, phone, sex, password_user, confirm_password_user, status_user) 
-- VALUES
-- 	("Salerno", "Sylvetsre", "", "2023-01-14", "2023-01-15", "ss@gmail.com", "0472/252525","man", "123", "123", "dead"),
--     ("Zanga", "Aurélia", "", "2023-01-17", "2023-01-18", "sa@gmail.com", "0472/252525","woman", "123", "123", "dead"),
--     ("Zalga", "Aurélia", "", "2023-01-17", "2023-01-18", "saa@gmail.com", "0472/252525","woman", "123", "123", "dead");
--     ("Salerno", "Scùdy", "", "2023-01-14", "sq@gmail.com", "0472/252525","femme", "123", "123"),
--     ("Salerno", "Aurélia", "", "2023-01-14", "ss@gmail.com", "0472/252525","femme", "123", "123"),
--     ("Salerno", "Marceline", "", "2023-01-14", "sss@gmail.com", "0472/252525","femme", "123", "123"),
--     ("Rical", "Josiane", "", "2023-01-14", "ssss@gmail.com", "0472/252525","femme", "123", "123"),
--     ("Salerno", "Vincent", "", "2023-01-14", "sssss@gmail.com", "0472/252525","femme", "123", "123"),
--     ("D'heur", "Gisèle", "", "2023-01-14", "ssssss@gmail.com", "0472/252525","femme", "123", "123"),
--     ("Baltus", "Damien", "", "2023-01-14", "sssssss@gmail.com", "0472/252525","femme", "123", "123"),
--     ("Zanga", "Samuel", "", "2023-01-14", "ssssssss@gmail.com", "0472/252525","femme", "123", "123"),
--     ("Salerno", "Sylvetsre", "", "2023-01-14", "a@gmail.com", "0472/252525","femme", "123", "123"),
--     ("Salerno", "Aurélia", "", "2023-01-14", "aa@gmail.com", "0472/252525","femme", "123", "123"),
--     ("Salerno", "Marceline", "", "2023-01-14", "aaa@gmail.com", "0472/252525","femme", "123", "123"),
--     ("Rical", "Josiane", "", "2023-01-14", "ssssa@gmail.com", "0472/252525","femme", "123", "123"),
--     ("Salerno", "Vincent", "", "2023-01-14", "sssssa@gmail.com", "0472/252525","femme", "123", "123"),
--     ("D'heur", "Gisèle", "", "2023-01-14", "ssssssa@gmail.com", "0472/252525","femme", "123", "123"),
--     ("Baltus", "Damien", "", "2023-01-14", "ssssssas@gmail.com", "0472/252525","femme", "123", "123"),
--     ("Zanga", "Samuel", "", "2023-01-14", "sssssssas@gmail.com", "0472/252525","femme", "123", "123"),
--     ("Salerno", "Sylvetsre", "", "2023-01-14", "sz@gmail.com", "0472/252525","femme", "123", "123"),
--     ("Salerno", "Aurélia", "", "2023-01-14", "ssz@gmail.com", "0472/252525","femme", "123", "123"),
--     ("Salerno", "Marceline", "", "2023-01-14", "szss@gmail.com", "0472/252525","femme", "123", "123"),
--     ("Rical", "Josiane", "", "2023-01-14", "ssszs@gmail.com", "0472/252525","femme", "123", "123"),
--     ("Salerno", "Vincent", "", "2023-01-14", "szssss@gmail.com", "0472/252525","femme", "123", "123"),
--     ("D'heur", "Gisèle", "", "2023-01-14", "ssszsss@gmail.com", "0472/252525","femme", "123", "123"),
--     ("Baltus", "Damien", "", "2023-01-14", "ssssesss@gmail.com", "0472/252525","femme", "123", "123"),
--     ("Zanga", "Samuel", "", "2023-01-14", "sssssrsss@gmail.com", "0472/252525","femme", "123", "123"),
--     ("Salerno", "Sylvetsre", "", "2023-01-14", "srr@gmail.com", "0472/252525","femme", "123", "123"),
--     ("Salerno", "Aurélia", "", "2023-01-14", "ssrrrr@gmail.com", "0472/252525","femme", "123", "123"),
--     ("Salerno", "Marceline", "", "2023-01-14", "srrrss@gmail.com", "0472/252525","femme", "123", "123"),
--     ("Rical", "Josiane", "", "2023-01-14", "sssstt@gmail.com", "0472/252525","femme", "123", "123"),
--     ("Salerno", "Vincent", "", "2023-01-14", "ssstttss@gmail.com", "0472/252525","femme", "123", "123"),
--     ("D'heur", "Gisèle", "", "2023-01-14", "ssssstttts@gmail.com", "0472/252525","femme", "123", "123"),
--     ("Baltus", "Damien", "", "2023-01-14", "ssssssts@gmail.com", "0472/252525","femme", "123", "123"),
--     ("Zanga", "Samuel", "", "2023-01-14", "sstssssss@gmail.com", "0472/252525","femme", "123", "123"),
--     ("Salerno", "Sylvetsre", "", "2023-01-14", "sy@gmail.com", "0472/252525","femme", "123", "123"),
--     ("Salerno", "Aurélia", "", "2023-01-14", "syys@gmail.com", "0472/252525","femme", "123", "123"),
--     ("Salerno", "Marceline", "", "2023-01-14", "ssyyys@gmail.com", "0472/252525","femme", "123", "123"),
--     ("Rical", "Josiane", "", "2023-01-14", "sssyyyyys@gmail.com", "0472/252525","femme", "123", "123"),
--     ("Salerno", "Vincent", "", "2023-01-14", "ssssuus@gmail.com", "0472/252525","femme", "123", "123"),
--     ("D'heur", "Gisèle", "", "2023-01-14", "sssssus@gmail.com", "0472/252525","femme", "123", "123"),
--     ("Baltus", "Damien", "", "2023-01-14", "sssssuuuuss@gmail.com", "0472/252525","femme", "123", "123"),
--     ("Zanga", "Samuel", "", "2023-01-14", "sssssssuuuuus@gmail.com", "0472/252525","femme", "123", "123"),
--     ("Salerno", "Sylvetsre", "", "2023-01-14", "si@gmail.com", "0472/252525","femme", "123", "123"),
--     ("Salerno", "Aurélia", "", "2023-01-14", "siis@gmail.com", "0472/252525","femme", "123", "123"),
--     ("Salerno", "Marceline", "", "2023-01-14", "siiss@gmail.com", "0472/252525","femme", "123", "123"),
--     ("Rical", "Josiane", "", "2023-01-14", "sssiiiis@gmail.com", "0472/252525","femme", "123", "123"),
--     ("Salerno", "Vincent", "", "2023-01-14", "sssiiiiiiss@gmail.com", "0472/252525","femme", "123", "123"),
--     ("D'heur", "Gisèle", "", "2023-01-14", "sssssoooos@gmail.com", "0472/252525","femme", "123", "123"),
--     ("Baltus", "Damien", "", "2023-01-14", "ssssssos@gmail.com", "0472/252525","femme", "123", "123"),
--     ("Zanga", "Samuel", "", "2023-01-14", "sssssssos@gmail.com", "0472/252525","femme", "123", "123");