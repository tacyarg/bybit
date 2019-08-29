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
- `key`
- `secret`

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
