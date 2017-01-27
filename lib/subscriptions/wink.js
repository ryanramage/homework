module.exports = function (pubnub, send, done) {
  pubnub.addListener({
    message: (message) => {
      var payload = {
        channel: message.subscribedChannel,
        message: JSON.parse(message.message)
      }
      send('winkChange', payload, done)
    }
  })
}
