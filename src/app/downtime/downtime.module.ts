import { Module } from '@nestjs/common';
import { DowntimeService } from './downtime.service';
import { DowntimeController } from './downtime.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Downtime } from './downtime.entity';
import { OeeShift } from '../oee-shift/oee-shift.entity';
import { OeeShiftService } from '../oee-shift/oee-shift.service';
import { BadstockTimbanganService } from '../badstock-timbangan/badstock-timbangan.service';
import { BadstockTimbangan } from '../badstock-timbangan/badstock-timbangan.entity';

@Module({
  providers: [
    DowntimeService,
    OeeShiftService,
  ],
  controllers: [DowntimeController],
  imports: [TypeOrmModule.forFeature([
    Downtime,
    OeeShift,
  ])],
  exports: [
    DowntimeService,
    OeeShiftService,
  ],
})
export class DowntimeModule {}
