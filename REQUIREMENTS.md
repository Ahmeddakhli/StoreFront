
# API
`GET /` - homepage

`POST /users/register` - CREATE user\
`POST /users/login` - LOGIN user\
`GET /users` - READ all users\
`GET /users/:username` - READ  user by username\
`DELETE /users` - DELETE  user by username

`POST /products` - CREATE product\
`GET /products` - READ all products\
`GET /products/:productName` - READ  product by product name\
`DELETE /products` - DELETE product by product id


`POST /orders` - CREATE order\
`POST /orders/products` - CREATE order with product quantity and product id\
`GET /orders` - READ all orders\
`GET /orders/:userId` - READ orders by user id\
`DELETE /orders` - DELETE order by order id\
`DELETE /orders/products` - DELETE order product by order product id

