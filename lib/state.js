const barracks = require('barracks')
var requireDirectory = require('require-directory')

module.exports = function (config, pubnub) {
  const store = barracks()

  const subscriptions = requireDirectory(module, './subscriptions')
  subscriptions.wink = subscriptions.wink.bind(null, pubnub)

  const reducers = requireDirectory(module, './reducers')
  reducers.timer = reducers.timer.bind(null, config)

  store.model({
    state: require('./initialState'),
    effects: requireDirectory(module, './effects'),
    reducers: reducers,
    subscriptions: subscriptions
  })
  return store.start()
}
