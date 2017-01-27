module.exports = {
  port: 8080,
  wink: {
    devices: "https://api.wink.com/users/me/wink_devices",
    api: "https://api.wink.com/oauth2/token",
    client_id: "",
    client_secret: "",
    username: "",
    grant_type: "password"
  },
  chromecast: {
    // Here you can plug an URL to any mp4, webm, mp3 or jpg file with the proper contentType.
    contentId: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/big_buck_bunny_1080p.mp4',
    contentType: 'audo/mp3',
    streamType: 'BUFFERED',
    host: '192.168.0.13'
  },
  router: {
    username: '',
    password: ''
  },
  armingDuration: 59000,
  trippedDuration: 1000 * 20 * 2, // two minutes?
  setAwayAfterIdle: 1000 * 60 * 60 // one hour?
}
