import { Module } from '@nestjs/common';
import { InitialSkuService } from './initial-sku.service';
import { InitialSkuController } from './initial-sku.controller';

@Module({
  providers: [InitialSkuService],
  controllers: [InitialSkuController]
})
export class InitialSkuModule {}
