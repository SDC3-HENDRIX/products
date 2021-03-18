const { Sequelize, DataTypes, belongsTo } = require('sequelize');
const mariadb = require('mariadb');
// connect to database
const dbName = 'sdcProduct';
const dbUser = 'student';
const dbPass = 'student';

exports.database = new Sequelize(dbName, dbUser, dbPass, {
  host: 'localhost',
  dialect: 'mariadb',
  logging: console.log,
});

exports.database.authenticate()
  .then(() => {
    console.log(`Connection to ${dbName} successful`);
  })
  .catch((error) => {
    console.error(`Failed to connect to ${dbName}`, error);
  });

// Model for each table
exports.Product = exports.database.define('Product', {
  productId: {
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
  defaultPrice: {
    type: DataTypes.INTEGER,
  },
});

// Features
exports.Feature = exports.database.define('Feature', {
  featureId: {
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
});
// Foreign key reference to product
exports.Feature.belongsTo(exports.Product, {
  foreignKey: 'productId',
});

exports.Style = exports.database.define('Style', {
  styleId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(128),
  },
  originalPrice: {
    type: DataTypes.INTEGER,
  },
  salePrice: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  defaultStyle: {
    type: DataTypes.BOOLEAN,
  },
});
// Foreign reference to products
exports.Style.belongsTo(exports.Product, {
  foreignKey: 'productId',
});

exports.SKU = exports.database.define('SKU', {
  skuId: {
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
});

exports.SKU.belongsTo(exports.Style, {
  foreignKey: 'styleId',
});

exports.Photo = exports.database.define('Photo', {
  photoId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  thumbnailUrl: {
    type: DataTypes.TEXT,
  },
  url: {
    type: DataTypes.TEXT,
  },
});

exports.Photo.belongsTo(exports.Style, {
  foreignKey: 'styleId',
});

exports.Related = exports.database.define('Related', {
  relatedId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  relatedProductId: {
    type: DataTypes.INTEGER,
  },
});

exports.Related.belongsTo(exports.Product, {
  foreignKey: 'currentProductId',
});

exports.database.sync({alter: true});