-- Run as root
DROP DATABASE sdcProduct;
CREATE DATABASE IF NOT EXISTS sdcProduct;

USE sdcProduct;

GRANT ALL PRIVILEGES ON sdcProduct.* TO student@localhost;