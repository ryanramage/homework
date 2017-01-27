#!/usr/bin/env node
var web = require('../')
var config = require('rc')('homework', require('../lib/options'))
var mockPubnub = require('../test/mock/pubnub')
var createSend = require('../lib/state')(config, mockPubnub)
var send = createSend('web', false)
web(config, send)

// var media = {
//   // Here you can plug an URL to any mp4, webm, mp3 or jpg file with the proper contentType.
//   contentId: config.contentId,
//   contentType: config.contentType,
//   streamType: config.streamType
// }
//
// say(config.host, media, (err) => {
//   console.log('done', err)
// })

// var wink = require('../lib/wink')
// wink.login(config.wink, (err, token) => {
//   if (err) return console.log(err)
//   wink.devices(token, (err, devices) => {
//     if (err) console.log(err)
//     var subscriptions = wink.subscriptions(devices)
//     var pubnub = wink.subscribe(subscriptions)
//     var send = require('./lib/state')(pubnub)
//   })
// })
