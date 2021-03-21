# SDC Products Endpoint

## About
This is the Products endpoint for the System Design Capstone project I did as part of HackReactor. This endpoint is written with Node.js, it is one of three parts that service data to the Front End Capstone project

## Setup
Clone the package with `git clone https://github.com/SDC3-HENDRIX/sdc-products`

Change into the project directory and run `npm install`

Start the API with `npm start`

## Endpoints
`GET /products` provides a list of products in an array of JSON objects. The default is 5 products. Clients can do http queries on `page` and `count`

`GET /products/:product_id` returns more details about a single product.

`GET /products/:product_id/styles` returns all the styles associated with a given product. This endpoint also returns photos for each style for this product, and the specific skus for the product. The SKU information includes the sku ID and the size and quantity available for purchase

`GET /products/:product_id/related` returns an array of related products based on ID for the current product.

`POST /interactions` TBD - This will eventually log data when a client clicks on the DOM

`/cart` TBD - this will store a user's cart