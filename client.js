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
      .then(response => response.json())
      .then(
        response => {
          if ('error' in response) throw new Error(response.error.message)
          return response
        },
        error => console.error('Network error', error)
      )
  }

  call.post = (endpoint, params) => {
    return call('POST', endpoint, params)
  }

  call.get = (endpoint, params) => {
    return call('GET', endpoint, params)
  }

  
  return {
    ...call,
    listOpenPositions(params) {
      //TODO
      return call.get('/order/list', params)
    },
  }
}
