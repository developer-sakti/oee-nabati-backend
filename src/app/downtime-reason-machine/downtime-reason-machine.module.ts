import { Module } from '@nestjs/common';
import { DowntimeReasonMachineService } from './downtime-reason-machine.service';
import { DowntimeReasonMachineController } from './downtime-reason-machine.controller';
import { DowntimeReasonMachine } from './downtime-reason-machine.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [DowntimeReasonMachineService],
  controllers: [DowntimeReasonMachineController],
  imports: [TypeOrmModule.forFeature([DowntimeReasonMachine])],
  exports: [DowntimeReasonMachineService],
})
export class DowntimeReasonMachineModule {}
