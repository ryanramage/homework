module.exports = (state, data) => {
  if (data.away) {
    state.status = 'arming' // 'off', 'arming', 'on'
    state.lastArmedAt = data.now
  } else {
    state.status = 'home' // 'home', 'softAway', 'arming', 'alarmOn', 'tripped', 'klaxon'
  }
  return state
}
