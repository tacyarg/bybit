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

    const url = baseURL + endpoint + query

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
    price = null, // execution price
    qty = null, // max 1M
  }) => {
    assert(price, 'price required.')
    assert(qty, 'qty required.')

    return call.get('/open-api/order/create', params)
  }

  const createConditionalOrder = ({
    side = 'Buy',
    symbol = 'BTCUSD',
    order_type = 'Limit',
    time_in_force = 'GoodTillCancel',
    price = null, // Execution price
    qty = null, // max 1M
    base_price = null, // current market price
    stop_px = null, // Trigger price
  }) => {
    assert(price, 'price required.')
    assert(qty, 'qty required.')
    assert(base_price, 'base_price required.')
    assert(stop_px, 'stop_px required.')

    return call.get('/open-api/stop-order/create', params)
  }

  return {
    ...call,
    listActiveOrders(params) {
      //TODO
      return call.get('/open-api/order/list', params)
    },
    getActiveOrder(id, options = {}) {
      assert(id, 'id required')

      return call
        .get('/open-api/order/list', {
          order_id: id,
          order_link_id: id,
          ...options,
        })
        .then(r => {
          assert(r.data[0], 'invalid order id')
          return r.data[0]
        })
    },
    cancelActiveOrder(id) {
      assert(id, 'id required')

      return call.post('/open-api/order/cancel', {
        order_id: id,
      })
    },
    createOrder,
    limitBuy(price, qty, options = {}) {
      return createOrder({
        price,
        qty,
        ...options,
        side: 'Buy',
        order_type: 'Limit',
      })
    },
    limitSell(price, qty, options = {}) {
      return createOrder({
        price,
        qty,
        ...options,
        side: 'Sell',
        order_type: 'Limit',
      })
    },
    marketBuy(qty, options = {}) {
      return createOrder({
        // price,
        qty,
        ...options,
        side: 'Buy',
        order_type: 'Market',
      })
    },
    marketSell(qty, options = {}) {
      return createOrder({
        // price,
        qty,
        ...options,
        side: 'Sell',
        order_type: 'Market',
      })
    },
    createConditionalOrder,
    listConditionalOrders(params) {
      return call.get('/open-api/stop-order/list', params)
    },
    getConditionalOrder(id, options = {}) {
      assert(id, 'id required')

      return call
        .get('/open-api/stop-order/list', {
          order_id: id,
          order_link_id: id,
          ...options,
        })
        .then(r => {
          assert(r.data[0], 'invalid order id')
          return r.data[0]
        })
    },
    cancelConditionalOrder(id) {
      assert(id, 'id required')

      return call.post('/open-api/stop-order/cancel', {
        stop_order_id: id,
      })
    },
    listMyLeverage() {
      return call.get('/user/leverage')
    },
    setMyLeverage(symbol, leverage) {
      assert(symbol, 'symbol required.')
      assert(leverage, 'leverage required.')

      return call.post('/user/leverage/save', {
        symbol,
        leverage,
      })
    },
    listMyPositions() {
      return call.get('/position/list')
    },
    updatePositionMargin(symbol, margin) {
      assert(symbol, 'symbol required.')
      assert(margin, 'margin required.')

      return call.post('/position/change-position-margin', {
        symbol,
        margin,
      })
    },
    getFundingRate(symbol = 'BTCUSD') {
      assert(symbol, 'symbol required.')
      return call.get('/open-api/funding/prev-funding-rate', { symbol })
    },
    getMyFundingFee(symbol = 'BTCUSD') {
      assert(symbol, 'symbol required.')
      return call.get('/open-api/funding/prev-funding', { symbol })
    },
    getMyPredictedFunding(symbol = 'BTCUSD') {
      assert(symbol, 'symbol required.')
      return call.get('/open-api/funding/predicted-funding', { symbol })
    },
    listOrderTrades(id) {
      assert(id, 'id required')

      return call.get('/v2/private/execution/list', { order_id: id })
    },
    getOrderbookSnapshot(symbol = 'BTCUSD') {
      assert(symbol, 'symbol required.')
      return call.get('/v2/public/orderBook/L2', {
        symbol,
      })
    },
    listTickers() {
      return call.get('/v2/public/tickers')
    },
    getTicker(symbol = 'BTCUSD') {
      assert(symbol, 'symbol required')

      return call.get('/v2/public/tickers').then(r => {
        return r.find(d => d.symbol === symbol)
      })
    },
  }
}
