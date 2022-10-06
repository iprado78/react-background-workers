export interface Stock {
  symbol: string
  open: number
  last: number
  high: number
  low: number
}

export type StockMap = Record<Stock['symbol'], Stock>
