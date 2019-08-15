import { Module } from '@nestjs/common';
import { OeeShiftService } from './oee-shift.service';
import { OeeShiftController } from './oee-shift.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OeeShift } from './oee-shift.entity';
// import { ScheduleModule } from 'nest-schedule';

@Module({
  providers: [OeeShiftService],
  controllers: [OeeShiftController],
  imports: [
    TypeOrmModule.forFeature([
      OeeShift
    ]
  )],
  exports: [
    OeeShiftService
  ],
})
export class OeeShiftModule {}
