import { Stock, StockMap } from './stocks'

interface LiveRatesEventBase extends MessageEvent {
  event: string
  data: any
}

export interface LiveRatesSOW extends LiveRatesEventBase {
  event: 'stocks-snapshot'
  data: StockMap
}

interface LiveRatesUpdate extends LiveRatesEventBase {
  event: 'stock-update'
  data: Stock
}

export type LiveRatesEvent = LiveRatesSOW | LiveRatesUpdate
