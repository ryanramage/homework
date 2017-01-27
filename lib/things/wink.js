var request = require('request')
var get = require('lodash.get')
var PubNub = require('pubnub')

exports.login = function (config, done) {
  const body = {
    client_id: config.client_id,
    client_secret: config.client_secret,
    username: config.username,
    password: config.password,
    grant_type: config.grant_type
  }
  request({
    method: 'POST',
    url: config.api,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }, function (error, response, body) {
    done(error, JSON.parse(body).access_token)
  })
}

exports.devices = function (token, done) {
  request({
    url: 'https://api.wink.com/users/me/wink_devices',
    headers: {
      Authorization: `Bearer ${token}`
    },
    json: true
  }, function (error, response, body) {
    done(error, body)
  })
}

exports.subscriptions = function (devices) {
  return {
    subscribeKey: get(devices, 'data[0].subscription.pubnub.subscribe_key'),
    devices: devices.data.map(row => {
        return {
          uuid: row.uuid,
          name: row.name,
          channel: get(row, 'subscription.pubnub.channel')
        }
      })
  }
}

exports.subscribe = function (subscriptions) {
  pubnub = new PubNub({
    subscribeKey : subscriptions.subscribeKey
  })
  var channels = subscriptions.devices.map(row => row.channel)
  pubnub.subscribe({
    channels:channels
  })
  return pubnub
}
