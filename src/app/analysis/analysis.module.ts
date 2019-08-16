import { Module } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { AnalysisController } from './analysis.controller';
import { BadstockTimbanganService } from '../badstock-timbangan/badstock-timbangan.service';
import { DowntimeService } from '../downtime/downtime.service';
import { RencanaProduksiService } from '../rencana-produksi/rencana-produksi.service';
import { OeeShiftService } from '../oee-shift/oee-shift.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OeeShift } from '../oee-shift/oee-shift.entity';
import { RencanaProduksi } from '../rencana-produksi/rencana-produksi.entity';
import { Downtime } from '../downtime/downtime.entity';
import { BadstockTimbangan } from '../badstock-timbangan/badstock-timbangan.entity';

@Module({
  providers: [
      AnalysisService,
      OeeShiftService,
      RencanaProduksiService,
      DowntimeService,
      BadstockTimbanganService],
  controllers: [AnalysisController],
  imports: [
    TypeOrmModule.forFeature([
      OeeShift,
      RencanaProduksi,
      Downtime,
      BadstockTimbangan,
    ]
  )],
  exports: [
    AnalysisService,
    OeeShiftService,
    RencanaProduksiService,
    DowntimeService,
    BadstockTimbanganService
  ],
})
export class AnalysisModule {}
