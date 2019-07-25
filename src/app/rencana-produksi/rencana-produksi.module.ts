import { Module } from '@nestjs/common';
import { RencanaProduksiService } from './rencana-produksi.service';
import { RencanaProduksiController } from './rencana-produksi.controller';
import { RencanaProduksi } from './rencana-produksi.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [RencanaProduksiService],
  controllers: [RencanaProduksiController],
  imports: [TypeOrmModule.forFeature([RencanaProduksi])],
  exports: [RencanaProduksiService],
})
export class RencanaProduksiModule {}
