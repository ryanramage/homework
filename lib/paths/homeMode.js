module.exports = (req, res, ctx, done) => {
  var data = {
    now: new Date().getTime(),
    away: false
  }
  if (ctx.send) ctx.send('setAwayState', data, ()=> {})
  done(null, {ok: true})
}
