import { Module } from '@nestjs/common';
import { HmiService } from './hmi.service';
import { HmiController } from './hmi.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hmi } from './hmi.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hmi])],
  providers: [HmiService],
  controllers: [HmiController],
  exports: [HmiService],
})
export class HmiModule {}
