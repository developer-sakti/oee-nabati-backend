import { Controller, Get, Req, HttpStatus, Post, Body, Query } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { RencanaProduksiService } from './rencana-produksi.service';
import { GetRencanaProduksiDto } from './dto/get-rencana-produksi.dto';
import { Raw } from 'typeorm';
import { RencanaProduksiCmd } from './cmd/rencana-produksi.command';
import { RencanaProduksiFindCmd } from './cmd/rencana-produksi-find.command';
import { RencanaProduksi } from './rencana-produksi.entity';
import { RencanaProduksiCreateCmd } from './cmd/rencana-produksi-create.command';
import { Utils } from '@app/shared/utils';
import { RencanaProduksiWaitingListCmd } from './cmd/rencana-produksi-waiting-list.command';
import { RencanaProduksiFindShiftCmd } from './cmd/rencana-produksi-find-shift.command';
import { OeeShiftService } from '../oee-shift/oee-shift.service';
import { OeeShiftCreateCmd } from '../oee-shift/cmd/oee-shift-create.command';
import { concat } from 'rxjs';

@ApiUseTags('rencanaProduksi')
@ApiBearerAuth()
@Controller('api/v1/rencana-produksi')
export class RencanaProduksiController {
    constructor(
        private readonly rencanaProduksiService: RencanaProduksiService,
        private readonly oeeShiftService: OeeShiftService
    ) {}

    @Get()
    @ApiResponse({ status: HttpStatus.OK, type: GetRencanaProduksiDto, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'RencanaProduksi not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiOperation({ title: 'Get RencanaProduksi', description: 'Get RencanaProduksi from JWT payload.' })
    async findAll(@Req() req): Promise<GetRencanaProduksiDto[]> {
        const rencanaProduksiList = (await this.rencanaProduksiService.findAll()).map(rencanaProduksi => new GetRencanaProduksiDto(rencanaProduksi));
        return Promise.resolve(rencanaProduksiList);
    }

    @Get('active')
    @ApiResponse({ status: HttpStatus.OK, type: GetRencanaProduksiDto, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'RencanaProduksi not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiOperation({ title: 'Get RencanaProduksi ', description: 'Get RencanaProduksi  from JWT payload.' })
    async findActivePO(@Query() req: RencanaProduksiCmd): Promise<any> {
        return await this.rencanaProduksiService.findOne(req);
    }

    @Get('find')
    @ApiResponse({ status: HttpStatus.OK, type: GetRencanaProduksiDto, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'RencanaProduksi not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiOperation({ title: 'Get RencanaProduksi List', description: 'Get RencanaProduksi List from JWT payload.' })
    async findListPO(@Query() req: RencanaProduksiFindCmd): Promise<any> {
        return await this.rencanaProduksiService.findByLineDate(req);
    }

    @Get('find/shift')
    @ApiResponse({ status: HttpStatus.OK, type: GetRencanaProduksiDto, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'RencanaProduksi not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiOperation({ title: 'Get RencanaProduksi Find Shift List', description: 'Get RencanaProduksi List from JWT payload.' })
    async findPOByShift(@Query() req: RencanaProduksiFindShiftCmd): Promise<any> {
        return await this.rencanaProduksiService.findByLineDateShift(req);
    }

    @Get('waiting-list')
    @ApiResponse({ status: HttpStatus.OK, type: GetRencanaProduksiDto, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'RencanaProduksi not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiOperation({ title: 'Get RencanaProduksi Waiting List', description: 'Get RencanaProduksi List from JWT payload.' })
    async finWaitingList(@Query() req: RencanaProduksiWaitingListCmd): Promise<any> {
        return await this.rencanaProduksiService.findWaitingList(req);
    }

    @Post()
    @ApiResponse({ status: HttpStatus.OK, type: RencanaProduksi, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'RencanaProduksi not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiOperation({ title: 'Create RencanaProduksi ', description: 'Create RencanaProduksi from JWT payload.' })
    async store(@Body() body: RencanaProduksiCreateCmd): Promise<any> {
        let process = await this.rencanaProduksiService.create(body);
        if (!process) return Utils.sendResponseSaveFailed("Rencana produksi")

        let oeeShiftCmd     = new OeeShiftCreateCmd()
        oeeShiftCmd.lineId  = body.lineId;
        oeeShiftCmd.shiftId = body.shiftId;
        oeeShiftCmd.date    = body.date;
        oeeShiftCmd

        // let storeOeeShift   = await this.oeeShiftService.create();
        return Utils.sendResponseSaveSuccess(process);
    }
}
