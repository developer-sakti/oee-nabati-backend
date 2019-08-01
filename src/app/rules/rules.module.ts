import { Module } from '@nestjs/common';
import { RulesService } from './rules.service';
import { RulesController } from './rules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rules } from './rules.entity';

@Module({
  providers: [RulesService],
  controllers: [RulesController],
  imports: [TypeOrmModule.forFeature([Rules])],
  exports: [RulesService],
})
export class RulesModule {}
  