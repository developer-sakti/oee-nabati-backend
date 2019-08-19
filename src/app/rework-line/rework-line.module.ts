import { Module } from '@nestjs/common';
import { ReworkLineService } from './rework-line.service';
import { ReworkLineController } from './rework-line.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReworkLine } from './rework-line.entity';
import { RencanaProduksiService } from '../rencana-produksi/rencana-produksi.service';
import { RencanaProduksi } from '../rencana-produksi/rencana-produksi.entity';
import { OeeShiftService } from '../oee-shift/oee-shift.service';
import { OeeShift } from '../oee-shift/oee-shift.entity';

@Module({
  providers: [
    ReworkLineService,
    RencanaProduksiService,
    OeeShiftService
  ],
  controllers: [ReworkLineController],
  imports: [TypeOrmModule.forFeature([
    ReworkLine,
    RencanaProduksi,
    OeeShift
  ])],
  exports: [
    ReworkLineService,
    RencanaProduksiService,
    OeeShiftService
  ],
})
export class ReworkLineModule {}
