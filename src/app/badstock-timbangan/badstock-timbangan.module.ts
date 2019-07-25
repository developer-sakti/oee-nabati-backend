import { Module } from '@nestjs/common';
import { BadstockTimbanganService } from './badstock-timbangan.service';
import { BadstockTimbanganController } from './badstock-timbangan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BadstockTimbangan } from './badstock-timbangan.entity';

@Module({
  providers: [BadstockTimbanganService],
  controllers: [BadstockTimbanganController],
  imports: [TypeOrmModule.forFeature([BadstockTimbangan])],
  exports: [BadstockTimbanganService],
})
export class BadstockTimbanganModule {}
