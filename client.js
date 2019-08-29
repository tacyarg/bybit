const fetch = require('node-fetch')
const crypto = require('crypto')
const qs = require('qs')
const assert = require('assert')

module.exports = ({ key, secret }) => {
  assert(key, 'api key required.')
  assert(secret, 'api secret required.')

  const call = function(verb, endpoint, params) {

    const options = {
      //TODO: prepare request
    }

    return fetch(url, options)
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
    listOpenPositions() {
      //TODO
    },
  }
}
