import { Module } from '@nestjs/common';
import { DowntimeReasonMachineService } from './downtime-reason-machine.service';
import { DowntimeReasonMachineController } from './downtime-reason-machine.controller';
import { DowntimeReasonMachine } from './downtime-reason-machine.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DowntimeReasonService } from '../downtime-reason/downtime-reason.service';
import { DowntimeReason } from '../downtime-reason/downtime-reason.entity';

@Module({
  providers: [DowntimeReasonMachineService, DowntimeReasonService],
  controllers: [DowntimeReasonMachineController],
  imports: [TypeOrmModule.forFeature([
    DowntimeReasonMachine,
    DowntimeReason
  ])],
  exports: [DowntimeReasonMachineService, DowntimeReasonService],
})
export class DowntimeReasonMachineModule {}
