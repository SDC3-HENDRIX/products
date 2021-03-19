-- Run as root
CREATE DATABASE IF NOT EXISTS sdcProduct;

USE DATABASE sdcProduct;

GRANT ALL PRIVILEGES ON sdcProduct.* TO student@localhost;