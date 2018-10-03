CREATE DATABASE IF NOT EXISTS scores;

USE scores;

CREATE TABLE IF NOT EXISTS scoreresource(
    id_score INT unsigned NOT NULL AUTO_INCREMENT,
    score INT unsigned NOT NULL,
    user_id INT unsigned NOT NULL,
    service_id INT unsigned NOT NULL,
    service VARCHAR(100),
    PRIMARY KEY (id_score)
);

DESCRIBE scoreresource;