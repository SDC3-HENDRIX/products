const {
  Product, Feature, Related, Style, SKU, Photo,
} = require('./model.js');

// create a query
// get products by page and count
exports.getProducts = (page, count) => {

  return Product.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    offset: page,
    limit: count,
  })
    .catch((error) => console.error('Error when querying products', error));
};

exports.getOneProduct = (productId) => Product.findOne({
  attributes: { exclude: ['createdAt', 'updatedAt'] },
  where: {
    product_id: productId,
  },
  include: {
    model: Feature,
    attributes: ['feature', 'value'],
  },
});

exports.getRelatedProducts = (productId) => Related.findAll({
  attributes: ['related_product_id'],
  where: {
    current_product_id: productId,
  },
  order: ['related_product_id'],
});

exports.getProductStyles = (productId) => Style.findAll({
  where: { product_id: productId },
  attributes: { exclude: ['createdAt', 'updatedAt', 'product_id'] },
  include: [{
    model: Photo,
    attributes: ['thumbnail_url', 'url'],
  }, {
    model: SKU,
    attributes: ['quantity', 'size'],
  }],
});
