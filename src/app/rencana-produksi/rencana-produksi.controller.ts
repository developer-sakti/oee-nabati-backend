import { Controller, Get, Req, HttpStatus, Post, Body } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { RencanaProduksiService } from './rencana-produksi.service';
import { GetRencanaProduksiDto } from './dto/get-rencana-produksi.dto';
import { Raw } from 'typeorm';
import { RencanaProduksiCmd } from './cmd/rencana-produksi.command';

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
    @ApiOperation({ title: 'Get RencanaProduksi profile', description: 'Get get RencanaProduksi profile from JWT payload.' })
    async findActivePO(@Body() req: RencanaProduksiCmd): Promise<any> {
        return await this.rencanaProduksiService.findOne(req);
    }
}
