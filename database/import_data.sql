USE sdcProduct;
--Import product data
LOAD DATA LOCAL INFILE '/home/kodjoz/hackreactor/sdc-products/data/product.csv' REPLACE INTO TABLE sdcProduct.Products FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' IGNORE 1 LINES (product_id, name, slogan, description, category, default_price);
-- -- Import Features
LOAD DATA LOCAL INFILE '/home/kodjoz/hackreactor/sdc-products/data/features.csv' REPLACE INTO TABLE sdcProduct.Features FIELDS TERMINATED BY ',' ENCLOSED BY '"' (feature_id, product_id, feature, value);
-- Import styles
LOAD DATA LOCAL INFILE '/home/kodjoz/hackreactor/sdc-products/data/styles.csv' REPLACE INTO TABLE sdcProduct.Styles FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' IGNORE 1 LINES (style_id, product_id, name, sale_price, original_price, default_style);
-- Import photos
LOAD DATA LOCAL INFILE '/home/kodjoz/hackreactor/sdc-products/data/photos-005.csv' REPLACE INTO TABLE sdcProduct.Photos FIELDS TERMINATED BY ',' IGNORE 1 LINES (photo_id, style_id, url, thumbnail_url);
-- Import related
LOAD DATA LOCAL INFILE '/home/kodjoz/hackreactor/sdc-products/data/related.csv' REPLACE INTO TABLE sdcProduct.Relateds FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' IGNORE 1 LINES (related_id, current_product_id, related_product_id);
-- Import SKUs
LOAD DATA LOCAL INFILE '/home/kodjoz/hackreactor/SDC-API/data/skus.csv' REPLACE INTO TABLE sdcProduct.SKUs FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' IGNORE 1 LINES (sku_id, style_id, size, quantity);


