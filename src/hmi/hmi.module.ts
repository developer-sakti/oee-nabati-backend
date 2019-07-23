import { Module } from '@nestjs/common';
import { HmiService } from './hmi.service';
import { HmiController } from './hmi.controller';

@Module({
  providers: [HmiService],
  controllers: [HmiController]
})
export class HmiModule {}
