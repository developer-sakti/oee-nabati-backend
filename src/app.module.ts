import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './app/auth/auth.module';
import { Module } from '@nestjs/common';
import { ProfileModule } from './app/profile/profile.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@app/app/user/user.module';
import { HmiModule } from './app/hmi/hmi.module';
import { LineModule } from './app/line/line.module';
import { MachineModule } from './app/machine/machine.module';
import { InitialShiftModule } from './app/initial-shift/initial-shift.module';
import { InitialSkuModule } from './app/initial-sku/initial-sku.module';
import { RencanaProduksiModule } from './app/rencana-produksi/rencana-produksi.module';
import { DowntimeModule } from './app/downtime/downtime.module';
import { DowntimeCategoryModule } from './app/downtime-category/downtime-category.module';
import { DowntimeReasonModule } from './app/downtime-reason/downtime-reason.module';
import { DowntimeReasonMachineModule } from './app/downtime-reason-machine/downtime-reason-machine.module';
import { BadstockTimbanganModule } from './app/badstock-timbangan/badstock-timbangan.module';
import { BadstockCategoryModule } from './app/badstock-category/badstock-category.module';
import { LakbanFinishgoodModule } from './app/lakban-finishgood/lakban-finishgood.module';
import { LakbanReworkModule } from './app/lakban-rework/lakban-rework.module';
import { ReworkLineModule } from './app/rework-line/rework-line.module';
import { RoleModule } from './app/role/role.module';
import { OeeShiftModule } from './app/oee-shift/oee-shift.module';
import { AnalysisModule } from './app/analysis/analysis.module';
import { ReportModule } from './app/report/report.module';
import { ScheduleModule } from 'nest-schedule';
import { SchedulerSkuModule } from './app/scheduler-sku/scheduler-sku.module';
import { SeederModule } from './app/database/seeder/seeder.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ProfileModule,
    TypeOrmModule.forRoot(),
    ScheduleModule.register(),
    HmiModule,
    LineModule,
    MachineModule,
    InitialShiftModule,
    InitialSkuModule,
    RencanaProduksiModule,
    DowntimeModule,
    DowntimeCategoryModule,
    DowntimeReasonModule,
    DowntimeReasonMachineModule,
    BadstockTimbanganModule,
    BadstockCategoryModule,
    LakbanFinishgoodModule,
    LakbanReworkModule,
    RoleModule,
    ReworkLineModule,
    OeeShiftModule,
    AnalysisModule,
    ReportModule,
    SchedulerSkuModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
