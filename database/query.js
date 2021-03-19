const { Product, Feature, Related } = require('./model.js');

// create a query
// get products by page and count
exports.getProducts = (page, count) => {
  let pageOffset;

  if (page > 1) {
    pageOffset = page * count;
  } else {
    pageOffset = 0;
  }
  return Product.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'], },
    offset: pageOffset,
    limit: count,
  })
    .catch((error) => console.error('Error when querying products', error));
};

exports.getOneProduct = (productId) => {
  return Product.findOne({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    where: {
      product_id: productId,
    },
    include: {
      model: Feature,
      attributes: ['feature', 'value'],
    },
  });
}

exports.getRelatedProducts = (productId) => Related.findAll({
  attributes: ['related_product_id'],
  where: {
    current_product_id: productId,
  },
  order: ['related_product_id'],
});