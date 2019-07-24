import { Controller, Get, HttpStatus, Req } from '@nestjs/common';
import { InitialShiftService } from './initial-shift.service';
import { ApiResponse, ApiOperation, ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { GetInitialShiftDto } from './dto/get-initial-shift.dto';

@ApiUseTags('initialSku')
@ApiBearerAuth()
@Controller('api/v1/initial-shift')
export class InitialShiftController {
    constructor(private readonly initialShiftService: InitialShiftService) {}

    @Get()
    @ApiResponse({ status: HttpStatus.OK, type: GetInitialShiftDto, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'InitialShift not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiOperation({ title: 'Get InitialShift', description: 'Get InitialShift from JWT payload.' })
    async findAll(@Req() req): Promise<GetInitialShiftDto[]> {
        const initialShiftList = (await this.initialShiftService.findAll()).map(initialShift => new GetInitialShiftDto(initialShift));
        return Promise.resolve(initialShiftList);
    }
}
