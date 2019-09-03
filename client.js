const fetch = require('node-fetch')
const crypto = require('crypto')
const qs = require('qs')
const assert = require('assert')

module.exports = ({ key, secret, baseURL = 'https://api.bybit.com' }) => {
  assert(key, 'api key required.')
  assert(secret, 'api secret required.')
  assert(baseURL, 'baseURL required.')

  const call = function(method, endpoint, params = {}) {
    params.api_key = key
    params.timestamp = Date.now()

    const paramString = qs.stringify(params)

    params.sign = crypto
      .createHmac('sha256', secret)
      .update(paramString)
      .digest('hex')

    const signedParams = qs.stringify(params)

    // console.log(signedParams)

    let query = ''
    let postBody = null

    if (method === 'GET') query = '?' + signedParams
    else postBody = JSON.stringify(params)

    const url = baseURL + '/open-api' + endpoint + query

    const headers = {
      'content-type': 'application/json',
      accept: 'application/json',
    }

    return fetch(url, {
      method,
      headers,
      body: postBody,
    })
      .then(r => r.json())
      .then(
        r => {
          // if ('error' in r) throw new Error(r.error.message)
          return r.result
        },
        e => console.error('Network error', e)
      )
  }

  call.post = (endpoint, params) => {
    return call('POST', endpoint, params)
  }

  call.get = (endpoint, params) => {
    return call('GET', endpoint, params)
  }

  const createOrder = ({
    side = 'Buy',
    symbol = 'BTCUSD',
    order_type = 'Limit',
    time_in_force = 'GoodTillCancel',
    price = null,
    qty = null,
  }) => {
    assert(price, 'price required.')
    assert(qty, 'qty required.')

    return call.get('/order/create', params)
  }

  return {
    ...call,
    listOrders(params) {
      //TODO
      return call.get('/order/list', params)
    },
    getOrder(id) {
      assert(id, 'id required')

      return call.get('/order/list', {
        order_id: id, 
        order_link_id: id
      }).then(r => {
        assert(r.data[0], 'invalid order id')
        return r.data[0]
      })
    },
    cancelOrder(id) {
      assert(id, 'id required')

      return call.post('/order/cancel', {
        order_id: id
      })
    },
    createOrder,
    limitBuy(price, qty, options = {}) {
      return createOrder({
        price,
        qty,
        ...options,
        side = 'Buy',
        order_type = 'Limit',
      })
    },
    limitSell(price, qty, options = {}) {
      return createOrder({
        price,
        qty,
        ...options,
        side = 'Sell',
        order_type = 'Limit',
      })
    },
    marketBuy(qty, options ={}) {
      return createOrder({
        // price,
        qty,
        ...options,
        side = 'Buy',
        order_type = 'Market',
      })
    },
    marketSell(qty, options={}) {
      return createOrder({
        // price,
        qty,
        ...options,
        side = 'Sell',
        order_type = 'Market',
      })
    },
  }
}
