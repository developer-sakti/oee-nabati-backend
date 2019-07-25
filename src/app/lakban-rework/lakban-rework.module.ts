import { Module } from '@nestjs/common';
import { LakbanReworkService } from './lakban-rework.service';
import { LakbanReworkController } from './lakban-rework.controller';
import { LakbanRework } from './lakban-rework.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [LakbanReworkService],
  controllers: [LakbanReworkController],
  imports: [TypeOrmModule.forFeature([LakbanRework])],
  exports: [LakbanReworkService],
})
export class LakbanReworkModule {}
