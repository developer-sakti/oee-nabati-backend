import { Module } from '@nestjs/common';
import { InitialShiftService } from './initial-shift.service';
import { InitialShiftController } from './initial-shift.controller';
import { InitialShift } from './initial-shift.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [InitialShiftService],
  controllers: [InitialShiftController],
  imports: [TypeOrmModule.forFeature([InitialShift])],
  exports: [InitialShiftService],
})
export class InitialShiftModule {}
