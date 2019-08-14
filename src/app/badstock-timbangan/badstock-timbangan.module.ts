import { Module } from '@nestjs/common';
import { BadstockTimbanganService } from './badstock-timbangan.service';
import { BadstockTimbanganController } from './badstock-timbangan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BadstockTimbangan } from './badstock-timbangan.entity';
import { RencanaProduksiService } from '../rencana-produksi/rencana-produksi.service';
import { RencanaProduksi } from '../rencana-produksi/rencana-produksi.entity';

@Module({
  providers: [
    BadstockTimbanganService,
    RencanaProduksiService
  ],
  controllers: [
    BadstockTimbanganController
  ],
  imports: [TypeOrmModule.forFeature([
    BadstockTimbangan,
    RencanaProduksi
  ])],
  exports: [
    BadstockTimbanganService,
    RencanaProduksiService
  ],
})
export class BadstockTimbanganModule {}
