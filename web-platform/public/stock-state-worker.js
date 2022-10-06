const ws = new WebSocket(`ws://${self.location.host}/live-rates`)

let stocks = {}

let ship = true

ws.onopen = () => {
  ws.send(
    JSON.stringify({
      event: 'stock-updates',
      data: 'subscribe',
    })
  )
}

ws.onmessage = (e) => {
  const { event, data } = JSON.parse(e.data)
  if (event === 'stocks-snapshot') {
    stocks = data
  } else if (event === 'stock-update') {
    stocks = {
      ...stocks,
      [data.symbol]: data,
    }
  }
  if (ship) {
    postMessage(
      JSON.stringify({
        event: 'stocks-snapshot',
        data: stocks,
      })
    )
  }
}

ws.onerror = (error) => {
  console.error(error)
}

ws.onclose = () => {
  console.log('closed')
}

onmessage = (e) => {
  const message = e.data
  if (message === 'pause') {
    ship = false
  } else if (message === 'resume') {
    ship = true
  }
}
