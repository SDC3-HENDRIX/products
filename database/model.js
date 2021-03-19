const { Sequelize, DataTypes } = require('sequelize');
// connect to database
const dbName = 'sdcProduct';
const dbUser = 'student';
const dbPass = 'student';

exports.database = new Sequelize(dbName, dbUser, dbPass, {
  host: 'localhost',
  dialect: 'mariadb',
});

exports.database.authenticate()
  .then(() => {
    console.log(`Connection to ${dbName} successful`);
  })
  .catch((error) => {
    console.error(`Failed to connect to ${dbName}`, error);
  });

exports.database.sync({ alter: true })
  .catch((error) => console.error(error));
// Model for each table
exports.Product = exports.database.define('Product', {
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
});

// Features
exports.Feature = exports.database.define('Feature', {
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
});
// Foreign key reference to product
exports.Feature.belongsTo(exports.Product, {
  foreignKey: 'product_id',
});

exports.Style = exports.database.define('Style', {
  style_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(128),
  },
  original_price: {
    type: DataTypes.INTEGER,
  },
  sale_price: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  default_style: {
    type: DataTypes.BOOLEAN,
  },
});
// Foreign reference to products
exports.Style.belongsTo(exports.Product, {
  foreignKey: 'product_id',
});

exports.SKU = exports.database.define('SKU', {
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
});

exports.SKU.belongsTo(exports.Style, {
  foreignKey: 'style_id',
});

exports.Photo = exports.database.define('Photo', {
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
});

exports.Photo.belongsTo(exports.Style, {
  foreignKey: 'style_id',
});

exports.Related = exports.database.define('Related', {
  related_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  related_product_id: {
    type: DataTypes.INTEGER,
  },
});

exports.Related.belongsTo(exports.Product, {
  foreignKey: 'current_product_id',
});
