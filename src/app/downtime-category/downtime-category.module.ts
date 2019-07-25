import { Module } from '@nestjs/common';
import { DowntimeCategoryService } from './downtime-category.service';
import { DowntimeCategoryController } from './downtime-category.controller';
import { DowntimeCategory } from './downtime-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [DowntimeCategoryService],
  controllers: [DowntimeCategoryController],
  imports: [TypeOrmModule.forFeature([DowntimeCategory])],
  exports: [DowntimeCategoryService],
})
export class DowntimeCategoryModule {}
