USE sdcProduct;
-- Import product data
LOAD DATA LOCAL INFILE '/home/kodjoz/hackreactor/sdc-products/data/product.csv' REPLACE INTO TABLE sdcProduct.Products FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' IGNORE 1 LINES (productId, name, slogan, description, category, defaultPrice);
-- -- Import Features
LOAD DATA LOCAL INFILE '/home/kodjoz/hackreactor/sdc-products/data/features.csv' REPLACE INTO TABLE sdcProduct.Features FIELDS TERMINATED BY ',' ENCLOSED BY '"' (featureId, productId, feature, value);
-- Import styles
LOAD DATA LOCAL INFILE '/home/kodjoz/hackreactor/sdc-products/data/styles.csv' REPLACE INTO TABLE sdcProduct.Styles FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' IGNORE 1 LINES (styleId, productId, name, salePrice, originalPrice, defaultStyle);
-- Import photos
LOAD DATA LOCAL INFILE '/home/kodjoz/hackreactor/sdc-products/data/photos-005.csv' REPLACE INTO TABLE sdcProduct.Photos FIELDS TERMINATED BY ',' IGNORE 1 LINES (photoId, styleId, url, thumbnailUrl);
-- Import related
LOAD DATA LOCAL INFILE '/home/kodjoz/hackreactor/sdc-products/data/related.csv' REPLACE INTO TABLE sdcProduct.Related FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' IGNORE 1 LINES (relatedid, currentProductId, relatedProductId);
-- Import SKUs
LOAD DATA LOCAL INFILE ‘/home/kodjoz/hackreactor/SDC-API/data/skus.csv’ REPLACE INTO TABLE sdcProduct.SKUs FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' IGNORE 1 LINES (skuId, styleId, size, quantity);


