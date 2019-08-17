import { Controller, Get, Post, Query, Body, Response } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ReportService } from './report.service';
import { RencanaProduksiService } from '../rencana-produksi/rencana-produksi.service';
import { OeeShiftService } from '../oee-shift/oee-shift.service';
import { DowntimeService } from '../downtime/downtime.service';
import { BadstockTimbanganService } from '../badstock-timbangan/badstock-timbangan.service';
import { ReportTimePeriodicCmd } from './cmd/report-time-periodic.command';

import * as excel from 'exceljs';
import { saveAs } from 'file-saver';

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
    @ApiOperation({ title: 'Get Report', description: 'Get Report Production from JWT payload.' })
    async getAnalysisProduction(@Body() body : ReportTimePeriodicCmd, @Response() res): Promise<any> {
        let file_name   : string;
        
        if (body.format == "xlsx") file_name = "Report.xlsx";
        else file_name = "Report.ods"

        let workbook    = new excel.Workbook();

        // let data_po_oee = await this.oeeShiftService.findByLineDateShift();
        
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

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=' + file_name);
			
        return workbook.xlsx.write(res)
                .then(function() {
                    res.status(200).end();
                });
    }
}
