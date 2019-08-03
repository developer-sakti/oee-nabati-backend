import { Module } from '@nestjs/common';
import { ReworkLineService } from './rework-line.service';
import { ReworkLineController } from './rework-line.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReworkLine } from './rework-line.entity';

@Module({
  providers: [ReworkLineService],
  controllers: [ReworkLineController],
  imports: [TypeOrmModule.forFeature([ReworkLine])],
  exports: [ReworkLineService],
})
export class ReworkLineModule {}
