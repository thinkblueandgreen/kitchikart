DROP DATABASE IF EXISTS kitchenitems_db;
-- Creates the "blogger" database --
CREATE DATABASE kitchenitems_db;

CREATE TABLE kitchenitems
(
	id int NOT NULL AUTO_INCREMENT,
	category varchar(255) NOT NULL,
	productName TEXT NOT NULL,
    picurl TEXT NOT NULL,
    productDescription TEXT NOT NULL,
    quantity INTEGER NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO kitchenitems (category, productName, picurl, productDescription, quantity) VALUES ("cookware", "pots", "adafa", "cook food", 5), ("cookware", "pans", "adafa", "cook food", 5), ("cookware", "sauce pan", "adafa", "cook food", 5);

INSERT INTO kitchenitems (category, productName, picurl, productDescription, quantity) VALUES ("misc", "scrubber", "adafa", "cook food", 5), ("misc", "knife", "adafa", "cook food", 5), ("misc", "cutting board", "adafa", "cook food", 5);

INSERT INTO kitchenitems (category, productName, picurl, productDescription, quantity) VALUES ("small appliances", "coffee maker", "adafa", "cook food", 5), ("small appliances", "toaster", "adafa", "cook food", 5), ("small appliances", "rice cooker", "adafa", "cook food", 5);