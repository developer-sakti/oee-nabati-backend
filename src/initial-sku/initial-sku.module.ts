import { Module } from '@nestjs/common';
import { InitialSkuService } from './initial-sku.service';
import { InitialSkuController } from './initial-sku.controller';
import { InitialShift } from '@app/initial-shift/initial-shift.entity';
import { InitialSku } from './initial-sku.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [InitialSkuService],
  controllers: [InitialSkuController],
  imports: [TypeOrmModule.forFeature([InitialSku])],
  exports: [InitialSkuService],
})
export class InitialSkuModule {}
