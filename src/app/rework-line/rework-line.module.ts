import { Module } from '@nestjs/common';
import { ReworkLineService } from './rework-line.service';
import { ReworkLineController } from './rework-line.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReworkLine } from './rework-line.entity';
import { RencanaProduksiService } from '../rencana-produksi/rencana-produksi.service';
import { RencanaProduksi } from '../rencana-produksi/rencana-produksi.entity';

@Module({
  providers: [
    ReworkLineService,
    RencanaProduksiService
  ],
  controllers: [ReworkLineController],
  imports: [TypeOrmModule.forFeature([
    ReworkLine,
    RencanaProduksi
  ])],
  exports: [
    ReworkLineService,
    RencanaProduksiService
  ],
})
export class ReworkLineModule {}
