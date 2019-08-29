# Bybit

Simple and easy to use bybit.com client.

## Initialize

### Register your API KEY

- `testnet`: https://testnet.bybit.com/user/api-management
- `mainnet`: https://www.bybit.com/app/user/api-management

### Create your nodejs client

```js
const client = require('bybit')({
  key: '',
  secret: '',
})

// do work.
client
  .get('/order/list', params)
  .then(console.log)
  .catch(console.error)
```
