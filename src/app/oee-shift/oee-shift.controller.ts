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

@ApiUseTags('OEE')
@ApiBearerAuth()
@Controller('api/v1/oee')
export class OeeShiftController {
    constructor(
        private readonly rencanaProduksiService: RencanaProduksiService,
        private readonly oeeShiftService: OeeShiftService,
        private readonly downtimeService: DowntimeService,
        private readonly bsService: BadstockTimbanganService,
    ) {}

    @Get('sector')
    @ApiResponse({ status: HttpStatus.OK, type: GetOeeShiftDto, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Oee Shift not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiOperation({ title: 'Get Oee Shift List', description: 'Get Oee Shift List from JWT payload.' })
    async getOeeSector(@Query() req: OeeShiftDateShiftCmd): Promise<any> {
        return await this.oeeShiftService.findOeeSector(req);
    }

    @Get('shift/bydate')
    @ApiResponse({ status: HttpStatus.OK, type: GetOeeShiftDto, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Oee Shift not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiOperation({ title: 'Get Oee Shift List', description: 'Get Oee Shift List from JWT payload.' })
    async getByDateShift(@Query() req: OeeShiftDateShiftCmd): Promise<any> {
        let oeeshift = await this.oeeShiftService.findByDateShift(req);
        let po = await this.rencanaProduksiService.findByDateShift(req);

        if (oeeshift == null && po.length == 0) return Utils.NULL_RETURN;

        return {
            date        : req.date,
            shift       : po[0].shift.shift_name,
            oee_shift   : oeeshift,
            po          : po
        }
    }

    @Get('shift/bydate/:line_id')
    @ApiResponse({ status: HttpStatus.OK, type: GetOeeShiftDto, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Oee Shift not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiOperation({ title: 'Get Oee Shift List', description: 'Get Oee Shift List from JWT payload.' })
    async getByDateShiftDetails(@Param("line_id") line_id : number, @Query() req: OeeShiftDateShiftCmd): Promise<any> {
        let oeeshift = await this.oeeShiftService.findByDateShiftDetails(line_id, req);
        let downtime = await this.downtimeService.findByDateShiftLine(line_id, req);

        if (oeeshift == null && downtime.length == 0) return Utils.NULL_RETURN;

        return {
            oee_shift   : oeeshift,
            downtime    : downtime
        }
    }
}
