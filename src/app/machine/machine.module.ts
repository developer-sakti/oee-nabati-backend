import { Module } from '@nestjs/common';
import { MachineService } from './machine.service';
import { MachineController } from './machine.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Machine } from './machine.entity';

@Module({
  providers: [MachineService],
  controllers: [MachineController],
  imports: [TypeOrmModule.forFeature([Machine])],
  exports: [MachineService],
})
export class MachineModule {}
