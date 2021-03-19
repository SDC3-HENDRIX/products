const { Sequelize, DataTypes } = require('sequelize');
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

exports.database.sync({ alter: true })
  .catch((error) => console.error(error));
// Model for each table
exports.Product = exports.database.define('product', {
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    underscored: true,
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
  underscored: true,
  timestamp: false,
});

// Features
exports.Feature = exports.database.define('feature', {
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
  underscored: true,
  timestamp: false,
});
// Foreign key reference to product
exports.Product.hasMany(exports.Feature, {
  foreignKey: 'product_id',
});
exports.Feature.belongsTo(exports.Product, {
  foreignKey: 'product_id',
});

exports.Style = exports.database.define('style', {
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
    as: 'default?',
  },
}, {
  underscored: true,
  timestamp: false,
});
// Foreign reference to products
exports.Product.hasMany(exports.Style, {
  foreignKey: 'product_id',
});
exports.Style.belongsTo(exports.Product, {
  foreignKey: 'product_id',
});

exports.SKU = exports.database.define('sku', {
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
  tableName: 'skus',
  underscored: true,
  timestamp: false,
});

exports.Style.hasMany(exports.SKU, {
  foreignKey: 'style_id',
});
exports.SKU.belongsTo(exports.Style, {
  foreignKey: 'style_id',
});

exports.Photo = exports.database.define('photo', {
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
  underscored: true,
  timestamp: false,
});

exports.Style.hasMany(exports.Photo, {
  foreignKey: 'style_id',
});
exports.Photo.belongsTo(exports.Style, {
  foreignKey: 'style_id',
});

exports.Related = exports.database.define('related', {
  related_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  related_product_id: {
    type: DataTypes.INTEGER,
  },
}, {
  freezeTableName: true,
  underscored: true,
  timestamp: false,
});

exports.Product.hasMany(exports.Related, {
  foreignKey: 'current_product_id',
});
exports.Related.belongsTo(exports.Product, {
  foreignKey: 'current_product_id',
});
