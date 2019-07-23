import { Controller, Get, HttpStatus, Req } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import { GetHmiDto } from './dto/get-hmi.dto';
import { HmiService } from './hmi.service';

@Controller('hmi')
export class HmiController {

    constructor(private readonly hmiService: HmiService) {}

    @Get()
    @ApiResponse({ status: HttpStatus.OK, type: GetHmiDto, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiOperation({ title: 'Get hmi', description: 'Get get user profile from JWT payload.' })

    async getProfile(@Req() req): Promise<GetHmiDto> {
        return null;
    }
}
