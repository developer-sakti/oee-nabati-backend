import { Module } from '@nestjs/common';
import { LakbanFinishgoodService } from './lakban-finishgood.service';
import { LakbanFinishgoodController } from './lakban-finishgood.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LakbanFinishgood } from './lakban-finishgood.entity';

@Module({
  providers: [LakbanFinishgoodService],
  controllers: [LakbanFinishgoodController],
  imports: [TypeOrmModule.forFeature([LakbanFinishgood])],
  exports: [LakbanFinishgoodService],
})
export class LakbanFinishgoodModule {}
