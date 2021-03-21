const { DataTypes } = require('sequelize');
const db = require('./connection');

const Product = db.define('product', {
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING(128),
  slogan: DataTypes.TEXT,
  description: DataTypes.TEXT,
  category: DataTypes.STRING(64),
  default_price: DataTypes.INTEGER,
}, {
  underscored: true,
});

const Feature = db.define('feature', {
  feature_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  feature: DataTypes.STRING(64),
  value: DataTypes.STRING(64),
}, {
  underscored: true,
  indexes: [{ fields: ['product_id'] }],
});

const Style = db.define('style', {
  style_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING(255),
  original_price: DataTypes.INTEGER,
  sale_price: DataTypes.INTEGER,
  'default?': DataTypes.BOOLEAN,
}, {
  underscored: true,
  indexes: [{ fields: ['product_id'] }],
});

const SKU = db.define('sku', {
  sku_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: DataTypes.INTEGER,
  size: DataTypes.STRING(16),
}, {
  underscored: true,
  indexes: [{ fields: ['style_id'] }],
});

const Photo = db.define('photo', {
  photo_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  thumbnail_url: DataTypes.TEXT,
  url: DataTypes.TEXT,
}, {
  underscored: true,
  indexes: [{ fields: ['style_id'] }],
});

const Related = db.define('related', {
  related_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  related_product_id: DataTypes.INTEGER,
}, {
  freezeTableName: true,
  underscored: true,
  indexes: [{ fields: ['current_product_id', 'related_product_id'] }],
});

// Foreign key association
Product.hasMany(Feature, {
  foreignKey: 'product_id',
});
Product.hasMany(Style, {
  foreignKey: 'product_id',
});
Product.hasMany(Related, {
  foreignKey: 'current_product_id',
});

// Style
Style.hasMany(SKU, {
  foreignKey: 'style_id',
});
Style.hasMany(Photo, {
  foreignKey: 'style_id',
});
Style.belongsTo(Product, {
  foreignKey: 'product_id',
});

// Feature
Feature.belongsTo(Product, {
  foreignKey: 'product_id',
});

// SKU
SKU.belongsTo(Style, {
  foreignKey: 'style_id',
});

// Photo
Photo.belongsTo(Style, {
  foreignKey: 'style_id',
});

// Related
Related.belongsTo(Product, {
  foreignKey: 'current_product_id',
});

module.exports = {
  Product,
  Feature,
  Style,
  Photo,
  SKU,
  Related,
};
