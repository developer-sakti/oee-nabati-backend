import { Controller, Get, Post, Query, Body, Response, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ReportService } from './report.service';
import { RencanaProduksiService } from '../rencana-produksi/rencana-produksi.service';
import { OeeShiftService } from '../oee-shift/oee-shift.service';
import { DowntimeService } from '../downtime/downtime.service';
import { BadstockTimbanganService } from '../badstock-timbangan/badstock-timbangan.service';
import { ReportTimePeriodicCmd } from './cmd/report-time-periodic.command';

import * as excel from 'exceljs';
import { saveAs } from 'file-saver';
import { AuthGuard } from '@nestjs/passport';
import { DowntimeGetbylineShiftDateCmd } from '../downtime/cmd/downtime-getbyline-shift-date.command';

@ApiUseTags('Report')
@ApiBearerAuth()
@Controller('api/v1/report')
export class ReportController {
    constructor(
        private readonly reportService: ReportService,
        private readonly rencanaProduksiService: RencanaProduksiService,
        private readonly oeeShiftService: OeeShiftService,
        private readonly downtimeService: DowntimeService,
        private readonly bsService: BadstockTimbanganService,
    ) {}

    @Post('excel')
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ title: 'Get Report', description: 'Get Report Production from JWT payload.' })
    async getAnalysisProduction(@Body() body : ReportTimePeriodicCmd, @Response() res): Promise<any> {
        let file_name   : string;

        let dtCmd = new DowntimeGetbylineShiftDateCmd();
        dtCmd.line_id = body.line_id;
        dtCmd.shift_id = body.shift_id;
        dtCmd.from_date = body.from_date;
        dtCmd.to_date = body.to_date;

        let data_unplanned_dt       = await this.downtimeService.findByCategoryForReport(2, dtCmd);
        let data_performance_loss   = await this.downtimeService.findByCategoryForReport(3, dtCmd);
        let data_badstock_defect    = await this.bsService.getForReport(dtCmd);
        
        // return res.json(data_badstock_defect);

        if (body.format == "xlsx") file_name = "Report.xlsx";
        else file_name = "Report.ods"
        let workbook    = new excel.Workbook();
        
        let worksheet_po   = workbook.addWorksheet('Production_Plan_KPI');
        worksheet_po.columns = [
            { header : 'Production_Plan_(PRO)', key : 'id' },
            { header : 'Start', key : 'id' },
            { header : 'End', key : 'id' },
            { header : 'Target', key : 'id' },
            { header : 'SKU', key : 'id' },
            { header : 'Line', key : 'id' },
            { header : 'OEE', key : 'id' },
            { header : 'Availability', key : 'id' },
            { header : 'Performance', key : 'id' },
            { header : 'Quality', key : 'id' },
            { header : 'Good', key : 'id' },
            { header : 'Defect', key : 'id' },
            { header : 'Total', key : 'id' },
            { header : 'Rework', key : 'id' },
            { header : 'Available_Time', key : 'id' },
            { header : 'Loading_Time', key : 'id' },
            { header : 'Planned_Downtime', key : 'id' },
            { header : 'Operating_Time', key : 'id' },
            { header : 'Unplanned_Downtime', key : 'id' },
            { header : 'Net_Operating_Time', key : 'id' },
            { header : 'Performance Loss', key : 'id' },
            { header : 'Value Adding', key : 'id' },
            { header : 'MTTR', key : 'id' },
            { header : 'MTBF', key : 'id' },
            { header : 'MTTF', key : 'id' }
        ];
        // worksheet_po.addRows();

        let worksheet_availability   = workbook.addWorksheet('Events_(Availability)');
        worksheet_availability.columns = [
            { header : 'No.', key : 'n' },
            { header : 'Submit_Date', key : 'submit_date', width: 20 },
            { header : 'Date', key : 'date', width: 20 },
            { header : 'Event', key : 'category', width: 30 },
            { header : 'Reason', key : 'reason', width: 30 },
            { header : 'Duration', key : 'duration', width: 15 },
        ];
        worksheet_availability.addRows(data_unplanned_dt);

        let worksheet_performance   = workbook.addWorksheet('Events_(Performance)');
        worksheet_performance.columns = [
            { header : 'No.', key : 'n' },
            { header : 'Submit_Date', key : 'submit_date', width: 20 },
            { header : 'Date', key : 'date', width: 20 },
            { header : 'Event', key : 'category', width: 30 },
            { header : 'Reason', key : 'reason', width: 30 },
            { header : 'Duration', key : 'duration', width: 15 },
        ];
        worksheet_performance.addRows(data_performance_loss);

        let worksheet_badstock_defect   = workbook.addWorksheet('Defect_(Badstock)');
        worksheet_badstock_defect.columns = [
            { header : 'No.', key : 'n' },
            { header : 'Submit_Date', key : 'submit_date', width: 20 },
            { header : 'Date', key : 'date', width: 20 },
            { header : 'Machine', key : 'machine', width: 30 },
            { header : 'Reason', key : 'reason', width: 30 },
            { header : 'Kg', key : 'kg', width: 15 },
            { header : 'Karton', key : 'karton', width: 15 },
        ];
        worksheet_badstock_defect.addRows(data_badstock_defect);

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=' + file_name);
			
        return workbook.xlsx.write(res)
                .then(function() {
                    res.status(200).end();
                });
    }
}
