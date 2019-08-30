# Bybit

Simple and easy to use bybit.com client.

## Initialize & Use

Below is a short guide on how to use the root client.

### Register your APIKEY

- `testnet`: https://testnet.bybit.com/user/api-management
- `mainnet`: https://www.bybit.com/app/user/api-management

### Configure/Init Client

- `baseURL.testnet`: https://api-testnet.bybit.com
- `baseURL.mainnet`: https://api.bybit.com
- `key`: APIKey
- `secret`: Private Key

```js
const client = require('bybit')({
  baseURL: 'https://api.bybit.com',
  key: '',
  secret: '',
})
```

### Call Something

```js
client
  .get('/order/list', params)
  .then(console.log)
  .catch(console.error)
```

## Interface

Methods provided by the client.

### listOrders

> List your orders.

```js
client
  .listOrders()
  .then(console.log)
  .catch(console.error)
```

### getOrder

> Get a previously created order.

```js
client
  .etOrder('order_id')
  .then(console.log)
  .catch(console.error)
```

### cancelOrder

> Canel a previously created order.

```js
client
  .cancelOrder('order_id')
  .then(console.log)
  .catch(console.error)
```

### createOrder

> Create a new order.

```js
client
  .createOrder({
    side: 'Buy',
    symbol: 'BTCUSD',
    order_type: 'Limit',
    time_in_force: 'GoodTillCancel',
    price: 10000,
    qty: 100000,
  })
  .then(console.log)
  .catch(console.error)
```

### limitBuy

> Create a limit buy order.

- `price` - Order Price
- `qty` - Number of Contracts

```js
client
  .limitBuy(price, qty)
  .then(console.log)
  .catch(console.error)
```

### limitSell

> Create a limit sell order.

- `price` - Order Price
- `qty` - Number of Contracts

```js
client
  .limitSell(price, qty)
  .then(console.log)
  .catch(console.error)
```

### marketBuy

> Create a market buy order.

- `price` - Order Price
- `qty` - Number of Contracts

```js
client
  .marketBuy(price, qty)
  .then(console.log)
  .catch(console.error)
```

### marketSell

> Create a market sell order.

- `price` - Order Price
- `qty` - Number of Contracts

```js
client
  .marketSell(price, qty)
  .then(console.log)
  .catch(console.error)
```
