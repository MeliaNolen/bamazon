DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100),
	price DECIMAL(10, 2) NOT NULL,
	stock_quantity INT(10),
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('hairbrush', 'beauty', 7.00, 10),
('backpack', 'bags', 39.99, 4),
('black suede booties', 'shoes', 35.00, 70),
('lamp', 'home decor', 59.99, 20),
('sandals', 'shoes', 25.00, 80),
('cross body sachel', 'bags', 29.99, 25),
('wireless mouse', 'tech', 39.99, 30),
('guitar', 'instruments', 99.99, 12);