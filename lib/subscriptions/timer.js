const tenseconds = 1000 * 10

module.exports = (send, done) => {
  setInterval(() => send('timer', { now: new Date().getTime() }, done), tenseconds)
}
