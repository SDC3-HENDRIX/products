const axios = require('axios');

const serverUrl = 'http://localhost:3000'
describe('Test whether we can communicate with the server', () => {
  test('It should respond with success on a request to the root', () => {
    return axios.get(serverUrl).then((response) => {
      expect(response.status).toBe(200);
    })
    .catch((error) => console.error(error));
  });
});
