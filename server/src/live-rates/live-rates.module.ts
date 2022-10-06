import { Module } from '@nestjs/common';
import { LiveRatesService } from './live-rates.service';

@Module({
  providers: [LiveRatesService],
})
export class LiveRatesModule {}
