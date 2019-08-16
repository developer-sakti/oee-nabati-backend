import { Module } from '@nestjs/common';
import { LakbanReworkService } from './lakban-rework.service';
import { LakbanReworkController } from './lakban-rework.controller';
import { LakbanRework } from './lakban-rework.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RencanaProduksiService } from '../rencana-produksi/rencana-produksi.service';
import { RencanaProduksi } from '../rencana-produksi/rencana-produksi.entity';
import { OeeShift } from '../oee-shift/oee-shift.entity';
import { OeeShiftService } from '../oee-shift/oee-shift.service';

@Module({
  providers: [
    LakbanReworkService,
    RencanaProduksiService,
    OeeShiftService
  ],
  controllers: [LakbanReworkController],
  imports: [TypeOrmModule.forFeature([
    LakbanRework,
    RencanaProduksi,
    OeeShift
  ])],
  exports: [
    LakbanReworkService,
    RencanaProduksiService,
    OeeShiftService
  ],
})
export class LakbanReworkModule {}
