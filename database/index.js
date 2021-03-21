const { Op } = require('sequelize');
const db = require('./connection');
const logger = require('../config/winston');
const {
  Product, Feature, Related, Style, SKU, Photo,
} = require('./models.js');

db.authenticate()
  .then(() => logger.info('Successfully connected to database'))
  .catch((err) => logger.error(`Error connecting to database ${err}`));

// create a query
// get products by page and count
exports.getProducts = (page, count) => Product.findAll({
  attributes: { exclude: ['createdAt', 'updatedAt'] },
  where: {
    product_id: {
      [Op.gt]: page,
    },
  },
  limit: count,
})
  .catch((error) => logger.error('Error when querying products', error));

exports.getOneProduct = (productId) => Product.findOne({
  attributes: { exclude: ['createdAt', 'updatedAt'] },
  where: {
    product_id: productId,
  },
  include: {
    model: Feature,
    attributes: ['feature', 'value'],
    required: true,
  },
});

exports.getRelatedProducts = (productId) => Related.findAll({
  attributes: ['related_product_id'],
  where: {
    current_product_id: productId,
  },
  order: ['related_product_id'],
})
  .catch((error) => { logger.error('Error on querying related products', error); });

exports.getProductStyles = (productId) => Style.findAll({
  where: { product_id: productId },
  attributes: { exclude: ['createdAt', 'updatedAt', 'product_id'] },
  include: [{
    model: Photo,
    attributes: ['thumbnail_url', 'url'],
    required: true,
  }, {
    model: SKU,
    attributes: ['sku_id', 'quantity', 'size'],
    required: true,
  }],
})
  .catch((error) => { logger.error('Error on querying product styles', error); });
