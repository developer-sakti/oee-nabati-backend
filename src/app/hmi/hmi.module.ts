import { Module } from '@nestjs/common';
import { HmiService } from './hmi.service';
import { HmiController } from './hmi.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hmi } from './hmi.entity';

@Module({
  providers: [HmiService],
  controllers: [HmiController],
  imports: [TypeOrmModule.forFeature([Hmi])],
  exports: [HmiService],
})
export class HmiModule {}
