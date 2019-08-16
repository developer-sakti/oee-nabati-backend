import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { RencanaProduksiService } from '../rencana-produksi/rencana-produksi.service';
import { OeeShiftService } from '../oee-shift/oee-shift.service';
import { BadstockTimbanganService } from '../badstock-timbangan/badstock-timbangan.service';
import { DowntimeService } from '../downtime/downtime.service';
import { ApiUseTags, ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { RencanaProduksiTimePeriodicCmd } from '../rencana-produksi/cmd/rencana-produksi-time-periodic.command';

@ApiUseTags('Analysis')
@ApiBearerAuth()
@Controller('api/v1/analysis')
export class AnalysisController {
    constructor(
        private readonly analysiService: AnalysisService,
        private readonly rencanaProduksiService: RencanaProduksiService,
        private readonly oeeShiftService: OeeShiftService,
        private readonly downtimeService: DowntimeService,
        private readonly bsService: BadstockTimbanganService,
    ) {}

    @Get('production')
    @ApiOperation({ title: 'Get Production', description: 'Get Analysis Production from JWT payload.' })
    async getAnalysisProduction(@Query() query : RencanaProduksiTimePeriodicCmd): Promise<any> {
        let po = await this.rencanaProduksiService.findByTimePeriodic(query);
        return po;

        // if (oeeshift == null && downtime.length == 0) return Utils.NULL_RETURN;

        // return {
        //     oee_shift   : oeeshift,
        //     downtime    : downtime
        // }
    }
}
