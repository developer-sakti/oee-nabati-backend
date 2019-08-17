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
        let production      = await this.rencanaProduksiService.findByTimePeriodic(query);
        let production_stats= await this.rencanaProduksiService.getStatisticTimePeriodic(query);

        let oee       = await this.oeeShiftService.findByTimePeriodic(query);
        let oee_stats = await this.oeeShiftService.getStatisticTimePeriodic(query);

        let availability_loss   = await this.downtimeService.findParetoDowntimeLoss(2, query);
        let availability_stats  = await this.downtimeService.getStatisticTimePeriodic(2, query);

        let performance_loss   = await this.downtimeService.findParetoDowntimeLoss(3, query);
        let performance_stats  = await this.downtimeService.getStatisticTimePeriodic(3, query);

        let quality_loss    = await this.bsService.findParetoQualityLoss(query);
        let quality_stats   = await this.bsService.getStatisticTimePeriodic(query);

        return {
            production  : {
                data        : production,
                statistic   : production_stats
            },
            oee         : {
                data        : oee,
                statistic   : oee_stats
            },
            availability_loss : {
                data        : availability_loss,
                statistic   : availability_stats
            },
            performance_loss : {
                data        : performance_loss,
                statistic   : performance_stats
            },
            quality_loss : {
                data        : quality_loss,
                statistic   : quality_stats
            }
        }
    }
}
