import { Module } from '@nestjs/common';
import { DowntimeService } from './downtime.service';
import { DowntimeController } from './downtime.controller';

@Module({
  providers: [DowntimeService],
  controllers: [DowntimeController]
})
export class DowntimeModule {}
