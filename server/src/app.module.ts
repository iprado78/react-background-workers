import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LiveRatesModule } from './live-rates/live-rates.module';

@Module({
  imports: [LiveRatesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
