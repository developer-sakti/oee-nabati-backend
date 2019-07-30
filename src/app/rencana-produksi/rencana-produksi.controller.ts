import { Controller, Get, Req, HttpStatus, Post, Body, Query } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { RencanaProduksiService } from './rencana-produksi.service';
import { GetRencanaProduksiDto } from './dto/get-rencana-produksi.dto';
import { Raw } from 'typeorm';
import { RencanaProduksiCmd } from './cmd/rencana-produksi.command';
import { RencanaProduksiFindCmd } from './cmd/rencana-produksi-find.command';

@ApiUseTags('rencanaProduksi')
@ApiBearerAuth()
@Controller('api/v1/rencana-produksi')
export class RencanaProduksiController {
    constructor(private readonly rencanaProduksiService: RencanaProduksiService) {}

    @Get()
    @ApiResponse({ status: HttpStatus.OK, type: GetRencanaProduksiDto, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'RencanaProduksi not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiOperation({ title: 'Get RencanaProduksi', description: 'Get RencanaProduksi from JWT payload.' })
    async findAll(@Req() req): Promise<GetRencanaProduksiDto[]> {
        const rencanaProduksiList = (await this.rencanaProduksiService.findAll()).map(rencanaProduksi => new GetRencanaProduksiDto(rencanaProduksi));
        return Promise.resolve(rencanaProduksiList);
    }

    @Post('active')
    @ApiResponse({ status: HttpStatus.OK, type: GetRencanaProduksiDto, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'RencanaProduksi not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiOperation({ title: 'Get RencanaProduksi ', description: 'Get get RencanaProduksi  from JWT payload.' })
    async findActivePO(@Body() req: RencanaProduksiCmd): Promise<any> {
        return await this.rencanaProduksiService.findOne(req);
    }

    @Get('find')
    @ApiResponse({ status: HttpStatus.OK, type: GetRencanaProduksiDto, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'RencanaProduksi not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiOperation({ title: 'Get RencanaProduksi List', description: 'Get get RencanaProduksi List from JWT payload.' })
    async findListPO(@Query() req: RencanaProduksiFindCmd): Promise<any> {
        return await this.rencanaProduksiService.findByLineDate(req);
    }
}
