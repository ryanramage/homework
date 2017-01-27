var merry = require('merry')
var pump = require('pump')
var http = require('http')

var notFound = merry.notFound
var error = merry.error
var middleware = merry.middleware
var app = merry()

module.exports = (config, send) => {
  var route = loadModule.bind(null, send)
  app.router([
    [ '/error', errorPath ],
    ['/webhook/hJRXth119j/mode/away', route('./lib/paths/awayMode')],
    ['/webhook/hJRXth119j/mode/home', route('./lib/paths/homeMode')],
    [ '/404', notFound() ]
  ])
  var server = http.createServer(app.start())
  server.listen(config.port)
}

function loadModule(send, route) {
  return middleware([bindSend.bind(null, send), require(route)])
}

function bindSend(send, req, res, ctx, done) {
  ctx.send = send
  done()
}


function errorPath (req, res, ctx, done) {
  done(null, {error: 'an error occured'})
}
