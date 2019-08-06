import { Module } from '@nestjs/common';
import { LakbanFinishgoodService } from './lakban-finishgood.service';
import { LakbanFinishgoodController } from './lakban-finishgood.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LakbanFinishgood } from './lakban-finishgood.entity';
import { RencanaProduksiService } from '../rencana-produksi/rencana-produksi.service';
import { RencanaProduksi } from '../rencana-produksi/rencana-produksi.entity';

@Module({
  providers: [
    LakbanFinishgoodService, 
    RencanaProduksiService
  ],
  controllers: [LakbanFinishgoodController],
  imports: [TypeOrmModule.forFeature([
    LakbanFinishgood, 
    RencanaProduksi
  ])],
  exports: [
    LakbanFinishgoodService, 
    RencanaProduksiService
  ],
})
export class LakbanFinishgoodModule {}
