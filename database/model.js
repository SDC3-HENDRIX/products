const { Sequelize, DataTypes, Model } = require('sequelize');
const logger = require('../config/winston');

// connect to database
const dbName = 'sdcProduct';
const dbUser = 'student';
const dbPass = 'student';

// Database setup
const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: 'localhost',
  dialect: 'mariadb',
  logging: (msg) => logger.debug(msg),
});

sequelize.authenticate()
  .then(() => {
    logger.log('info', `Connection to ${dbName} successful`);
  })
  .catch((error) => {
    logger.error(`Failed to connect to ${dbName}`, error);
  });

sequelize.sync({ alter: true })
  .catch((error) => logger.error(`Error while syncing ${error}`));

// Model for each table
class Product extends Model {}
class Feature extends Model {}
class Style extends Model {}
class SKU extends Model {}
class Photo extends Model {}
class Related extends Model {}

// Class instantiation for the models
Product.init({
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(128),
  },
  slogan: {
    type: DataTypes.TEXT,
  },
  description: {
    type: DataTypes.TEXT,
  },
  category: {
    type: DataTypes.STRING(64),
  },
  default_price: {
    type: DataTypes.INTEGER,
  },
}, {
  sequelize,
  modelName: 'product',
  underscored: true,
});

Feature.init({
  feature_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  feature: {
    type: DataTypes.STRING(64),
  },
  value: {
    type: DataTypes.STRING(64),
  },
}, {
  sequelize,
  modelName: 'feature',
  underscored: true,
  indexes: [{ fields: ['product_id'] }],
});

Style.init({
  style_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
  },
  original_price: {
    type: DataTypes.INTEGER,
  },
  sale_price: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  'default?': {
    type: DataTypes.BOOLEAN,
  },
}, {
  sequelize,
  modelName: 'style',
  underscored: true,
  indexes: [{ fields: ['product_id'] }],
});

SKU.init({
  sku_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
  size: {
    type: DataTypes.STRING(16),
  },
}, {
  sequelize,
  modelName: 'sku',
  underscored: true,
  indexes: [{ fields: ['style_id'] }],
});

Photo.init({
  photo_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  thumbnail_url: {
    type: DataTypes.TEXT,
  },
  url: {
    type: DataTypes.TEXT,
  },
}, {
  sequelize,
  modelName: 'photo',
  underscored: true,
  indexes: [{ fields: ['style_id'] }],
});

Related.init({
  related_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  related_product_id: {
    type: DataTypes.INTEGER,
  },
}, {
  sequelize,
  modelName: 'related',
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
