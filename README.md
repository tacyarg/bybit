# Bybit

Simple and easy to use bybit API abstraction defined using the official documentation.

> Official API Documentation: https://github.com/bybit-exchange/bybit-official-api-docs/blob/master/en/rest_api.md

## Initialize & Use

Below is a short guide on how to use the client.

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

### listActiveOrders

> List your Active orders.

- `options` - Optional api params

```js
client
  .listOrders([options])
  .then(console.log)
  .catch(console.error)
```

### getActiveOrder

> Get a previously created Active order.

- `id` - Order ID. The unique order ID returned to you when the corresponding order was created.
- `options` - Optional api params

```js
client
  .getOrder(id, [options])
  .then(console.log)
  .catch(console.error)
```

### cancelActiveOrder

> Canel a previously created Active order.

- `id` - Order ID. The unique order ID returned to you when the corresponding order was created.

```js
client
  .cancelOrder(id)
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
- `options` - Optional api params

```js
client
  .limitBuy(price, qty, [options])
  .then(console.log)
  .catch(console.error)
```

### limitSell

> Create a limit sell order.

- `price` - Order Price
- `qty` - Number of Contracts
- `options` - Optional api params

```js
client
  .limitSell(price, qty, [options])
  .then(console.log)
  .catch(console.error)
```

### marketBuy

> Create a market buy order.

- `qty` - Number of Contracts
- `options` - Optional api params

```js
client
  .marketBuy(qty, [options])
  .then(console.log)
  .catch(console.error)
```

### marketSell

> Create a market sell order.

- `qty` - Number of Contracts
- `options` - Optional api params

```js
client
  .marketSell(qty, [options])
  .then(console.log)
  .catch(console.error)
```

### createConditionalOrder

> Create a new order.

- `options` - Optional api params

```js
client
  .createConditionalOrder([options])
  .then(console.log)
  .catch(console.error)
```

### listConditionalOrders

> List conditional orders.

- `options` - Optional api params

```js
client
  .listConditionalOrders([options])
  .then(console.log)
  .catch(console.error)
```

### getConditionalOrder

> Get a previously created Conditional order.

- `options` - Optional api params

```js
client
  .getOrder('order_id', [options])
  .then(console.log)
  .catch(console.error)
```

### cancelConditionalOrder

> Canel a previously created Conditional order.

- `id` - Order ID. The unique order ID returned to you when the corresponding order was created.

```js
client
  .cancelOrder(id)
  .then(console.log)
  .catch(console.error)
```

### listMyLeverage

> List symbol leverage settings.

```js
client
  .listMyLeverage()
  .then(console.log)
  .catch(console.error)
```

### setMyLeverage

> Set symbol leverage setting.

- `symbol` - Contract type
- `leverage` - Leverage value

```js
client
  .setMyLeverage(symbol, leverage)
  .then(console.log)
  .catch(console.error)
```

### listMyPositions
> List your positions.

```js
client
  .listMyPositions()
  .then(console.log)
  .catch(console.error)
```

### updatePoisitionMargin
> Update position margin allocation.

- `symbol` - Contract type
- `margin` - margin value

```js
client
  .updatePoisitionMargin(symbol, margin)
  .then(console.log)
  .catch(console.error)
```

### getFundingRate
> Get the current funding rate.
> Funding settlement occurs every 8 hours at 00:00 UTC, 08:00 UTC and 16:00 UTC

- `symbol` - Contract type

```js
client
  .getFundingRate(symbol)
  .then(console.log)
  .catch(console.error)
```

### getMyFundingFee
> Get the provious funding fee.
> Funding settlement occurs every 8 hours at 00:00 UTC, 08:00 UTC and 16:00 UTC

- `symbol` - Contract type

```js
client
  .getMyFundingFee(symbol)
  .then(console.log)
  .catch(console.error)
```

### getMyPredictedFunding
> Get your predictied funding rate and fee.

- `symbol` - Contract type

```js
client
  .getMyPredictedFunding(symbol)
  .then(console.log)
  .catch(console.error)
```

### listOrderTrades
> List trades placed to fill and order.

- `id` - order id

```js
client
  .listOrderTrades(symbol)
  .then(console.log)
  .catch(console.error)
```

### getOrderbookSnapshot
> Get the current state of the orderbook.

- `symbol` - Contract type

```js
client
  .getOrderbookSnapshot(symbol)
  .then(console.log)
  .catch(console.error)
```

### listTickers
> List all available ticker data. ( price, ect... )

```js
client
  .listTickers()
  .then(console.log)
  .catch(console.error)
```

### getTicker
> get current ticker data.

- `symbol` - Contract type

```js
client
  .listTickers(symbol)
  .then(console.log)
  .catch(console.error)
```
