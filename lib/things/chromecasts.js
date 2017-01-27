var mdns = require('mdns')
var castv2 = require('castv2-client')
var Client = castv2.Client
var MediaController = castv2.MediaController
var DefaultMediaReceiver  = castv2.DefaultMediaReceiver


exports.discover = () => {
  var browser = mdns.createBrowser(mdns.tcp('googlecast'))
  browser.on('serviceUp', function(service) {
    console.log('found device service', service)
    exports.connect(service)
  })
  browser.on('serviceDown', function(service) {
    console.log("service down: ", service)
  })
  browser.start()
}

exports.connect = (service) => {
  var host = service.addresses[0]
  var client = new Client()
  client.connect(host, (err) => {
    if (err) console.log('error connecting client', err)
    // we should return the client to controll
    //client.setVolume(volume)
    client.getStatus((err, status) => {
      console.log('status', err, JSON.stringify(status))
      client.on('status', (status) => {
        console.log('pulsed status', status)
      })
      // if (status.applications) {
      //   var app = status.applications[0]
      //   console.log(app.displayName, service.txtRecord.fn)
      //   if (app.displayName !== 'Google Play Music') return
      //   client.launch(MediaController, (err, receiver) => {
      //     if (err) return console.log(err, service.txtRecord.fn)
      //     receiver.on('status', function(status) {
      //       console.log('status', service.txtRecord.fn, status);
      //     })
      //   })
      // }
    })
  })
}
