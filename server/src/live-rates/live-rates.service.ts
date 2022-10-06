import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { delay, from, interval, map, startWith } from 'rxjs';

const TICK_INTERVAL_MS = 200;

interface Stock {
  symbol: string;
  open: number;
  last: number;
  high: number;
  low: number;
}

const stocks: Stock[] = [
  { symbol: 'GM', open: 38.87 },
  { symbol: 'GE', open: 25.4 },
  { symbol: 'MCD', open: 97.05 },
  { symbol: 'UAL', open: 69.45 },
  { symbol: 'WMT', open: 83.24 },
  { symbol: 'AAL', open: 55.76 },
  { symbol: 'LLY', open: 76.12 },
  { symbol: 'JPM', open: 61.75 },
  { symbol: 'BAC', open: 15.84 },
  { symbol: 'BA', open: 154.5 },
].map((stock) => ({
  ...stock,
  last: stock.open,
  high: stock.open,
  low: stock.open,
  close: stock.open,
}));

const simulateChange = () => {
  const index = Math.floor(Math.random() * stocks.length);
  const stock = stocks[index];

  const maxChange = stock.open * 0.005;

  let change = maxChange - Math.random() * maxChange * 2;
  change = Math.round(change * 100) / 100 || 0.01;

  let last = stock.last + change;
  if (last > stock.open * 1.15 || last < stock.open * 0.85) {
    change = -change;
    last = stock.last + change;
  }

  stock.last = Math.round(last * 100) / 100;
  if (stock.last > stock.high) {
    stock.high = stock.last;
  }
  if (stock.last < stock.low) {
    stock.low = stock.last;
  }

  return stock;
};

@WebSocketGateway({
  path: '/live-rates',
})
export class LiveRatesService {
  @SubscribeMessage('stock-updates')
  handleEvent() {
    return interval(TICK_INTERVAL_MS).pipe(
      map(() => ({
        event: 'stock-update',
        data: simulateChange(),
      })),
      startWith({
        type: 'stocks-snapshot',
        data: stocks,
      }),
    );
  }
}
