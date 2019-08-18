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

        let data_oee                = await this.oeeShiftService.getForReport(dtCmd);
        let data_unplanned_dt       = await this.downtimeService.findByCategoryForReport(2, dtCmd);
        let data_performance_loss   = await this.downtimeService.findByCategoryForReport(3, dtCmd);
        let data_badstock_defect    = await this.bsService.getForReport(dtCmd);
        
        // return res.json(data_badstock_defect);

        if (body.format == "xlsx") file_name = "Report.xlsx";
        else file_name = "Report.ods"
        let workbook    = new excel.Workbook();
        
        let worksheet_oee   = workbook.addWorksheet('Production_Plan_KPI');
        worksheet_oee.columns = [
            { header : 'No.', key : 'n' },
            // { header : 'Production_Plan_(PRO)', key : 'id' },
            // { header : 'Start', key : 'id' },
            // { header : 'End', key : 'id' },
            // { header : 'SKU', key : 'id' },
            { header : 'Date', key : 'date', width: 20  },
            { header : 'Target', key : 'total_target_produksi', width: 20  },
            { header : 'Shift', key : 'shift_name', width: 20  },
            { header : 'Line', key : 'name', width: 20  },
            { header : 'OEE', key : 'line_oee', width: 20  },
            { header : 'Availability', key : 'availablity', width: 20  },
            { header : 'Performance', key : 'performance_rate', width: 20  },
            { header : 'Quality', key : 'quality_product_rate', width: 20  },
            { header : 'Good', key : 'b_finishgood_shift', width: 20  },
            { header : 'Defect', key : 'd_total_defect_qty_karton', width: 20  },
            // { header : 'Total', key : 'id' },
            { header : 'Rework', key : 'e_total_rework_qty_karton', width: 20  },
            { header : 'Available_Time', key : 'available_time', width: 20  },
            { header : 'Loading_Time', key : 'l_loading_hours', width: 20  },
            { header : 'Planned_Downtime', key : 'k_total_planned_dt_losses', width: 20  },
            { header : 'Operating_Time', key : 'n_operating_hours', width: 20  },
            { header : 'Unplanned_Downtime', key : 'm_total_unplanned_dt', width: 20  },
            { header : 'Net_Operating_Time(Running_Time)', key : 'p_running_time', width: 20  },
            { header : 'Performance Loss', key : 'o_total_performance_losses', width: 20  },
            { header : 'Value Adding', key : 'r_value_added_hours', width: 20  },
            { header : 'MTTR', key : 'mttr_y1', width: 20  },
            { header : 'MTBF', key : 'mtbf_x1', width: 20  },
            { header : 'MTTF', key : 'mttf_z1', width: 20  }
        ];
        worksheet_oee.addRows(data_oee);

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
