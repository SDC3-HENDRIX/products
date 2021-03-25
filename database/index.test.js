require('dotenv').config();
const db = require('./connection');
const {
  getProducts, getOneProduct, getRelatedProducts, getProductStyles,
} = require('./index');
const logger = require('../config/winston');

let randomProduct = 1;

beforeAll(() => db.authenticate().then(() => {
  logger.debug(`Connected to ${process.env.DBNAME} for testing`);
})
  .catch((err) => logger.error(`Failed to connect to ${process.env.DBNAME} for testing, this was the error ${err}`)));

beforeEach(() => {
  randomProduct = Math.floor(Math.random() * 1000011);
});

describe('It should be able to query products', () => {
  test('It should be able to get a list of products', () => {
    expect.assertions(2);
    return getProducts(1, 5).then((results) => {
      const product = results[0].dataValues;
      expect(results).toBeArray();
      expect(product).toContainAllKeys(['product_id', 'category', 'name', 'slogan', 'description', 'default_price']);
    });
  });

  test('It should be able to get products quickly', () => {
    expect.assertions(1);
    // get five results from a random place in the database
    const numPages = Math.floor((Math.random() * 1000011) / 5);
    return getProducts(numPages, 5).then((results) => {
      expect(results).toBeArray();
    });
  }, 50);
});

describe('It should be able to get information on one product', () => {
  test('It should contain additional information about a product', () => {
    expect.assertions(2);
    // get a random product
    return getOneProduct(randomProduct).then((results) => {
      expect(results).toBeObject();
      expect(results).toContainKey('features');
    });
  }, 50);

  test('It should get the styles related to a product', () => {
    expect.assertions(2);
    return getProductStyles(randomProduct).then((results) => {
      expect(results).toBeArray();
      expect(results[0].dataValues).toContainAllKeys(['style_id', 'photos', 'name', 'original_price', 'sale_price', 'default?', 'skus']);
    });
  }, 50);

  test('It should get information on related products', () => {
    expect.assertions(2);
    return getRelatedProducts(randomProduct).then((results) => {
      expect(results).toBeArray();
      expect(results[0].dataValues).toContainKey('related_product_id');
    });
  }, 50);
});
