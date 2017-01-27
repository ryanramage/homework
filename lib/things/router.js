var request = require('request')

module.exports = function (config, done) {
  request.post({
    url: 'http://hitronhub.home/goform/login',
    form: {
      user: config.router.username,
      pwd: config.router.password
    }
  }, function(err, response, body) {
    if (err) return done(err)
    var userid = /userid=([0-9]+)/.exec(response.headers['set-cookie'])[1]
    var cookie = `userName=${config.router.username}; password=${config.router.password}; userid=${userid}`
    request.get({
      url: `http://hitronhub.home/data/getConnectInfo.asp?_=${new Date().getTime()}`,
      headers: {
        'Cookie': cookie
      }
    }, (err, resp, body) => {
      if (err) return done(err)
      var clients = JSON.parse(body)
      done(null, clients)
    })
  })
}
