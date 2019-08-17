import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { OeeShiftService } from '../oee-shift/oee-shift.service';
import { RencanaProduksiService } from '../rencana-produksi/rencana-produksi.service';
import { BadstockTimbanganService } from '../badstock-timbangan/badstock-timbangan.service';
import { DowntimeService } from '../downtime/downtime.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OeeShift } from '../oee-shift/oee-shift.entity';
import { RencanaProduksi } from '../rencana-produksi/rencana-produksi.entity';
import { Downtime } from '../downtime/downtime.entity';
import { BadstockTimbangan } from '../badstock-timbangan/badstock-timbangan.entity';

@Module({
    providers: [
        ReportService,
        OeeShiftService,
        RencanaProduksiService,
        DowntimeService,
        BadstockTimbanganService
    ],
    controllers: [ReportController],
    imports: [
        TypeOrmModule.forFeature([
            OeeShift,
            RencanaProduksi,
            Downtime,
            BadstockTimbangan,
        ]
    )],
    exports: [
        ReportService,
        OeeShiftService,
        RencanaProduksiService,
        DowntimeService,
        BadstockTimbanganService
    ],
})
export class ReportModule {}
