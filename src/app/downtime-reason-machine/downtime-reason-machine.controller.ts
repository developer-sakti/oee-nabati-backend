import { Controller, Post, HttpStatus, Body } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { DowntimeReasonMachineService } from './downtime-reason-machine.service';
import { GetDowntimeReasonMachineDto } from './dto/get-downtime-reason-machine.dto';
import { DowntimeReasonMachineCmd } from './cmd/downtime-reason-machine.command';
import { DowntimeReasonMachine } from './downtime-reason-machine.entity';
import { Crud, CrudController } from '@nestjsx/crud';

@Crud({
    model: {
        type: DowntimeReasonMachine,
    },
})

@ApiUseTags('downtime-reason-per-machine')
@ApiBearerAuth()
@Controller('api/v1/downtime-reason-machine')
export class DowntimeReasonMachineController implements CrudController<DowntimeReasonMachine> {
    constructor(public service: DowntimeReasonMachineService) {}
    
    @Post('find')
    @ApiResponse({ status: HttpStatus.OK, type: GetDowntimeReasonMachineDto, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'DowntimeReasonMachine not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiOperation({ title: 'Get DowntimeReasonMachine profile', description: 'Get DowntimeReasonMachine profile from JWT payload.' })
    async find(@Body() req: DowntimeReasonMachineCmd): Promise<GetDowntimeReasonMachineDto[]> {
        console.log(req);
        return await this.service.findSomeDowntimeReason(req);
    }
}
