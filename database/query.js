const { Product } = require('./model.js');

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
    attributes: ['product_id', 'name', 'slogan', 'description', 'category', 'default_price'],
    offset: pageOffset,
    limit: count,
  })
    .catch((error) => console.error('Error when querying products', error));
};

exports.getOneProduct = (productId) => Product.findAll({
  attributes: ['product_id', 'name', 'slogan', 'description', 'category', 'default_price'],
  include: [{ model: 'Feature', where: 'product_id' }],
})
  .catch((error) => console.error(`Error when querying ${productId}`, error));
