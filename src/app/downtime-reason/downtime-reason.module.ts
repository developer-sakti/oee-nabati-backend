import { Module } from '@nestjs/common';
import { DowntimeReasonService } from './downtime-reason.service';
import { DowntimeReasonController } from './downtime-reason.controller';
import { DowntimeReason } from './downtime-reason.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [DowntimeReasonService],
  controllers: [DowntimeReasonController],
  imports: [TypeOrmModule.forFeature([DowntimeReason])],
  exports: [DowntimeReasonService],
})
export class DowntimeReasonModule {}
