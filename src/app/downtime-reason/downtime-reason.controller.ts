import { Controller, Get, HttpStatus, Req } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { DowntimeReasonService } from './downtime-reason.service';
import { GetDowntimeReasonDto } from './dto/get-downtime-reason.dto';

@ApiUseTags('downtime')
@ApiBearerAuth()
@Controller('api/v1/downtime-reason')
export class DowntimeReasonController {
    constructor(private readonly downtimeReasonService: DowntimeReasonService) {}

    @Get()
    @ApiResponse({ status: HttpStatus.OK, type: GetDowntimeReasonDto, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'DowntimeReason not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiOperation({ title: 'Get DowntimeReason', description: 'Get DowntimeReason from JWT payload.' })
    async findAll(@Req() req): Promise<GetDowntimeReasonDto[]> {
        const downtimeReasonList = (await this.downtimeReasonService.findAll()).map(downtimeReason => new GetDowntimeReasonDto(downtimeReason));
        return Promise.resolve(downtimeReasonList);
    }
}
