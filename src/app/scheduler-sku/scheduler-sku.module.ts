import { Module } from '@nestjs/common';
import { SchedulerSkuService } from './scheduler-sku.service';

@Module({
  providers: [SchedulerSkuService]
})
export class SchedulerSkuModule {}
