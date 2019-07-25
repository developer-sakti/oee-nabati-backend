import { Module } from '@nestjs/common';
import { DowntimeService } from './downtime.service';
import { DowntimeController } from './downtime.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Downtime } from './downtime.entity';

@Module({
  providers: [DowntimeService],
  controllers: [DowntimeController],
  imports: [TypeOrmModule.forFeature([Downtime])],
  exports: [DowntimeService],
})
export class DowntimeModule {}
