import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { RencanaProduksiService } from '../rencana-produksi/rencana-produksi.service';
import { OeeShiftService } from '../oee-shift/oee-shift.service';
import { BadstockTimbanganService } from '../badstock-timbangan/badstock-timbangan.service';
import { DowntimeService } from '../downtime/downtime.service';
import { ApiUseTags, ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { AnalysisTimePeriodicCmd } from './cmd/analysis-time-periodic.command';
import { Utils } from '@app/shared/utils';

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
    async getAnalysisProduction(@Query() query : AnalysisTimePeriodicCmd): Promise<any> {
        let production  = await this.rencanaProduksiService.findByTimePeriodic(query);
        let oee         = await this.oeeShiftService.findByTimePeriodic(query);
        
        return {
            production  : production,
            oee         : oee
        }
    }
}
