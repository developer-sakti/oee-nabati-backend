import { Module } from '@nestjs/common';
import { OeeLineService } from './oee-line.service';
import { OeeLineController } from './oee-line.controller';

@Module({
  providers: [OeeLineService],
  controllers: [OeeLineController]
})
export class OeeLineModule {}
