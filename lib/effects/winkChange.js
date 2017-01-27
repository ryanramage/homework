module.exports = (state, data) => {
  state.wink[data.channel] = data.message.last_reading
  return state
}
