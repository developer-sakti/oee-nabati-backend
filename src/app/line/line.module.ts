import { Module } from '@nestjs/common';
import { LineController } from './line.controller';
import { LineService } from './line.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Line } from './line.entity';

@Module({
  controllers: [LineController],
  providers: [LineService],
  imports: [TypeOrmModule.forFeature([Line])],
  exports: [LineService],
})
export class LineModule {}
