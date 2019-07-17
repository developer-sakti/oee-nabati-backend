import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InitialSkuModule } from './initial-data/initial-sku/initial-sku.module';

@Module({
  imports: [InitialSkuModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
