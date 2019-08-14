import { Module } from '@nestjs/common';
import { OeeShiftService } from './oee-shift.service';
import { OeeShiftController } from './oee-shift.controller';

@Module({
  providers: [OeeShiftService],
  controllers: [OeeShiftController]
})
export class OeeShiftModule {}
