import { Module } from '@nestjs/common';
import { LakbanFinishgoodService } from './lakban-finishgood.service';
import { LakbanFinishgoodController } from './lakban-finishgood.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LakbanFinishgood } from './lakban-finishgood.entity';
import { RencanaProduksiService } from '../rencana-produksi/rencana-produksi.service';
import { RencanaProduksi } from '../rencana-produksi/rencana-produksi.entity';
import { OeeShiftService } from '../oee-shift/oee-shift.service';
import { OeeShift } from '../oee-shift/oee-shift.entity';

@Module({
  providers: [
    LakbanFinishgoodService, 
    RencanaProduksiService,
    OeeShiftService
  ],
  controllers: [LakbanFinishgoodController],
  imports: [TypeOrmModule.forFeature([
    LakbanFinishgood, 
    RencanaProduksi,
    OeeShift
  ])],
  exports: [
    LakbanFinishgoodService, 
    RencanaProduksiService,
    OeeShiftService
  ],
})
export class LakbanFinishgoodModule {}
