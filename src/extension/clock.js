export function clock (nodecg) {
  let offset = 0

  function tick() {
    nodecg.sendMessage('tick', new Date().getTime() + offset)
  }

  function receiveUpdate(newOffset) {
    offset = newOffset
    tick()
  }

  setInterval(tick, 1000)
  nodecg.listenFor('updateTimeOffset', receiveUpdate)
}