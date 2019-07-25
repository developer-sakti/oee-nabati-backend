import { Module } from '@nestjs/common';
import { BadstockCategoryService } from './badstock-category.service';
import { BadstockCategoryController } from './badstock-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BadstockCategory } from './badstock-category.entity';

@Module({
  providers: [BadstockCategoryService],
  controllers: [BadstockCategoryController],
  imports: [TypeOrmModule.forFeature([BadstockCategory])],
  exports: [BadstockCategoryService],
})
export class BadstockCategoryModule {}
