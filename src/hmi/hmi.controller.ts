import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiOperation, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { GetHmiDto } from './dto/get-hmi.dto';
import { HmiService } from './hmi.service';

@ApiUseTags('hmi')
@ApiBearerAuth()
@Controller('v1/api/hmi')
export class HmiController {

    constructor(private readonly hmiService: HmiService) {}

    @Get()
    @ApiResponse({ status: HttpStatus.OK, type: GetHmiDto, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiOperation({ title: 'Get hmi', description: 'Get get hmi from JWT payload.' })
    async findAll(@Req() req): Promise<GetHmiDto[]> {
        const hmiList = (await this.hmiService.findAll()).map(hmi => new GetHmiDto(hmi));
        return Promise.resolve(hmiList);
    }
}
