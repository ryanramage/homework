module.exports = {
  status: 'home', // 'home', 'softAway', 'arming', 'alarmOn', 'tripped', 'klaxon'
  lastArmedAt: 0,
  lastTrippedAt: 0,
  lastHouseActivity: new Date().getTime(),
  lastHouseOccupantEvent: new Date().getTime(),
  wink: {},
  chromcasts: {},
  computers: {}
}
