import { Module, HttpModule } from '@nestjs/common';
import { SchedulerSkuService } from './scheduler-sku.service';
import { InitialSkuService } from '../initial-sku/initial-sku.service';
import { InitialSkuModule } from '../initial-sku/initial-sku.module';

@Module({
  providers: [SchedulerSkuService],
  imports: [InitialSkuModule, HttpModule],
})
export class SchedulerSkuModule {}
