import { Module } from '@nestjs/common';
import { RencanaProduksiService } from './rencana-produksi.service';
import { RencanaProduksiController } from './rencana-produksi.controller';
import { RencanaProduksi } from './rencana-produksi.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OeeShiftService } from '../oee-shift/oee-shift.service';
import { OeeShift } from '../oee-shift/oee-shift.entity';

@Module({
  providers: [
    RencanaProduksiService,
    OeeShiftService
  ],
  controllers: [RencanaProduksiController],
  imports: [TypeOrmModule.forFeature([
    RencanaProduksi,
    OeeShift
  ])],
  exports: [
    RencanaProduksiService,
    OeeShiftService
  ],
})
export class RencanaProduksiModule {}
