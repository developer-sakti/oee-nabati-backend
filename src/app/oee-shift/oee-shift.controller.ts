import { Controller, Get, HttpStatus, Query, Param } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { GetOeeShiftDto } from './dto/get-oee-shift.dto';
import { OeeShiftDateShiftCmd } from './cmd/oee-shift-date-shift.command';
import { RencanaProduksiService } from '../rencana-produksi/rencana-produksi.service';
import { OeeShiftService } from './oee-shift.service';
import { DowntimeService } from '../downtime/downtime.service';
import { BadstockTimbangan } from '../badstock-timbangan/badstock-timbangan.entity';
import { BadstockTimbanganService } from '../badstock-timbangan/badstock-timbangan.service';
import { Utils } from '@app/shared/utils';

@ApiUseTags('OEE Shift')
@ApiBearerAuth()
@Controller('oee-shift')
export class OeeShiftController {
    constructor(
        private readonly rencanaProduksiService: RencanaProduksiService,
        private readonly oeeShiftService: OeeShiftService,
        private readonly downtimeService: DowntimeService,
        private readonly bsService: BadstockTimbanganService,
    ) {}

    @Get('bydate-shift')
    @ApiResponse({ status: HttpStatus.OK, type: GetOeeShiftDto, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Oee Shift not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiOperation({ title: 'Get Oee Shift List', description: 'Get Oee Shift List from JWT payload.' })
    async findByDateShift(@Query() req: OeeShiftDateShiftCmd): Promise<any> {
        return await this.oeeShiftService.findByDateShift(req);
    }

    @Get('bydate-shift/details/:line_id')
    @ApiResponse({ status: HttpStatus.OK, type: GetOeeShiftDto, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Oee Shift not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiOperation({ title: 'Get Oee Shift List', description: 'Get Oee Shift List from JWT payload.' })
    async findByDateShiftDetails(@Param("line_id") line_id : number, @Query() req: OeeShiftDateShiftCmd): Promise<any> {
        let oeeshift = await this.oeeShiftService.findByDateShiftDetails(line_id, req);
        let downtime = await this.downtimeService.findByDateShiftLine(line_id, req);

        if (oeeshift == null && downtime.length == 0) return Utils.NULL_RETURN;

        return {
            oee_shift   : oeeshift,
            downtime    : downtime
        }
    }
}
