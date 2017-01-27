module.exports = (config, state, data) => {

  // 'home', 'softAway', 'arming', 'alarmOn', 'tripped', 'klaxon'
  if (state.status === 'home') {
    console.log(data.now, state.lastHouseOccupantEvent + config.setAwayAfterIdle)
    if (data.now > (state.lastHouseOccupantEvent + config.setAwayAfterIdle)) {
      state.status = 'softAway'
    }
  } else if (state.status === 'softAway') {
    if (state.lastHouseOccupantEvent > data.now) {
      state.status = 'home'
    }
  } else if (state.status === 'arming') {
    if (data.now > (state.lastArmedAt + config.armingDuration)) {
      state.status = 'alarmOn'
    }
  } else if (state.status === 'alarmOn') {
    if (state.lastHouseOccupantEvent > (state.lastArmedAt + config.armingDuration)) {
      state.status = 'tripped'
      state.lastTrippedAt = data.now
    }
  } else if (state.status === 'tripped') {
    if (data.now > (state.lastTrippedAt + config.trippedDuration)) {
      state.status = 'klaxon'
      state.home = false
    }
  }
  console.log(state)
  return state
}
