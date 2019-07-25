import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiOperation, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { GetHmiDto } from './dto/get-hmi.dto';
import { HmiService } from './hmi.service';
import { GetHmiLineDto } from './dto/get-hmi-line.dto';
import { GetHmiLineMachineDto } from './dto/get-hmi-line-machine.dto';

@ApiUseTags('hmi')
@ApiBearerAuth()
@Controller('api/v1/hmi')
export class HmiController {

    constructor(private readonly hmiService: HmiService) {}

    @Get()
    @ApiResponse({ status: HttpStatus.OK, type: GetHmiDto, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Hmi not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiOperation({ title: 'Get hmi', description: 'Get get hmi from JWT payload.' })
    async findAll(@Req() req): Promise<GetHmiDto[]> {
        const hmiList = (await this.hmiService.findAll()).map(hmi => new GetHmiDto(hmi));
        return Promise.resolve(hmiList);
    }

    @Get('lines')
    @ApiResponse({ status: HttpStatus.OK, type: GetHmiDto, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Hmi not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiOperation({ title: 'Get hmi', description: 'Get get hmi from JWT payload.' })
    async findHmiLines(@Req() req): Promise<GetHmiLineDto[]> {
        const hmiList = (await this.hmiService.findAll()).map(hmiline => new GetHmiLineDto(hmiline));
        return Promise.resolve(hmiList);
    }

    @Get('lines/machines')
    @ApiResponse({ status: HttpStatus.OK, type: GetHmiDto, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Hmi not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiOperation({ title: 'Get hmi', description: 'Get get hmi from JWT payload.' })
    async findHmiLinesMachines(@Req() req): Promise<GetHmiLineMachineDto[]> {
        const hmiList = (await this.hmiService.findAll()).map(hmilineamachine => new GetHmiLineMachineDto(hmilineamachine));
        return Promise.resolve(hmiList);
    }
}
