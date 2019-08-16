import { Module } from '@nestjs/common';
import { BadstockTimbanganService } from './badstock-timbangan.service';
import { BadstockTimbanganController } from './badstock-timbangan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BadstockTimbangan } from './badstock-timbangan.entity';
import { RencanaProduksiService } from '../rencana-produksi/rencana-produksi.service';
import { RencanaProduksi } from '../rencana-produksi/rencana-produksi.entity';
import { OeeShiftService } from '../oee-shift/oee-shift.service';
import { OeeShift } from '../oee-shift/oee-shift.entity';

@Module({
  providers: [
    BadstockTimbanganService,
    RencanaProduksiService,
    OeeShiftService
  ],
  controllers: [
    BadstockTimbanganController
  ],
  imports: [TypeOrmModule.forFeature([
    BadstockTimbangan,
    RencanaProduksi,
    OeeShift
  ])],
  exports: [
    BadstockTimbanganService,
    RencanaProduksiService,
    OeeShiftService
  ],
})
export class BadstockTimbanganModule {}
