const axios = require('axios');
const logger = require('./config/winston');

const serverUrl = 'http://localhost:3010';

describe('Test whether we can communicate with the server', () => {
  test('It should respond with success on a request to the root', () => axios.get(serverUrl).then((response) => {
    expect(response.status).toBe(200);
  })
    .catch((error) => logger.error(error)));

  test('It should send back a list of 5 products', () => axios.get(`${serverUrl}/products`).then((response) => {
    expect(response.status).toBe(200);
    expect(response.data).toHaveLength(5);
  })
    .catch((error) => logger.error(error)));

  test('It should send back additional information on a single product', () => axios.get(`${serverUrl}/products/1`).then((response) => {
    expect(response.status).toBe(200);
    expect(response.data).toContainKey('features');
  }));

  test('It should send back information about styles', () => axios.get(`${serverUrl}/products/99/styles`).then((response) => {
    expect(response.status).toBe(200);
    expect(response.data).toContainKeys(['results', 'product_id']);
    expect(response.data.results[0]).toContainKeys(['style_id', 'name', 'photos', 'skus']);
  }));

  test('It should send back information about products related to the current product', () => axios.get(`${serverUrl}/products/123/related`).then((response) => {
    expect(response.status).toBe(200);
    expect(response.data).toBeArray();
  }));
});
