import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { ProfileModule } from './profile/profile.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'user/user.module';
import { HmiModule } from './hmi/hmi.module';
import { LineModule } from './line/line.module';
import { MachineModule } from './machine/machine.module';
import { InitialShiftModule } from './initial-shift/initial-shift.module';
import { InitialSkuModule } from './initial-sku/initial-sku.module';
import { RencanaProduksiModule } from './rencana-produksi/rencana-produksi.module';
import { DowntimeModule } from './downtime/downtime.module';
import { DowntimeCategoryModule } from './downtime-category/downtime-category.module';
import { DowntimeReasonModule } from './downtime-reason/downtime-reason.module';
import { DowntimeReasonMachineModule } from './downtime-reason-machine/downtime-reason-machine.module';

@Module({
  imports: [AuthModule, UserModule, ProfileModule, TypeOrmModule.forRoot(), HmiModule, LineModule, MachineModule, InitialShiftModule, InitialSkuModule, RencanaProduksiModule, DowntimeModule, DowntimeCategoryModule, DowntimeReasonModule, DowntimeReasonMachineModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  
}
