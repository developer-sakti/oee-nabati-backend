import { Module } from '@nestjs/common';
import { LakbanReworkService } from './lakban-rework.service';
import { LakbanReworkController } from './lakban-rework.controller';
import { LakbanRework } from './lakban-rework.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RencanaProduksiService } from '../rencana-produksi/rencana-produksi.service';
import { RencanaProduksi } from '../rencana-produksi/rencana-produksi.entity';

@Module({
  providers: [
    LakbanReworkService,
    RencanaProduksiService
  ],
  controllers: [LakbanReworkController],
  imports: [TypeOrmModule.forFeature([
    LakbanRework,
    RencanaProduksi
  ])],
  exports: [
    LakbanReworkService,
    RencanaProduksiService
  ],
})
export class LakbanReworkModule {}
