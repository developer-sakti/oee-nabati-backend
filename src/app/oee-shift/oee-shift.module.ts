import { Module } from '@nestjs/common';
import { OeeShiftService } from './oee-shift.service';
import { OeeShiftController } from './oee-shift.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OeeShift } from './oee-shift.entity';
import { RencanaProduksiService } from '../rencana-produksi/rencana-produksi.service';
import { RencanaProduksi } from '../rencana-produksi/rencana-produksi.entity';
import { DowntimeService } from '../downtime/downtime.service';
import { BadstockTimbanganService } from '../badstock-timbangan/badstock-timbangan.service';
import { BadstockTimbangan } from '../badstock-timbangan/badstock-timbangan.entity';
import { Downtime } from '../downtime/downtime.entity';
// import { ScheduleModule } from 'nest-schedule';

@Module({
  providers: [
    OeeShiftService,
    RencanaProduksiService,
    DowntimeService,
    BadstockTimbanganService
  ],
  controllers: [OeeShiftController],
  imports: [
    TypeOrmModule.forFeature([
      OeeShift,
      RencanaProduksi,
      Downtime,
      BadstockTimbangan,
    ]
  )],
  exports: [
    OeeShiftService,
    RencanaProduksiService,
    DowntimeService,
    BadstockTimbanganService
  ],
})
export class OeeShiftModule {}
