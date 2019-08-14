import { Controller, Post, HttpStatus, Body, Get, Query } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { DowntimeReasonMachineService } from './downtime-reason-machine.service';
import { GetDowntimeReasonMachineDto } from './dto/get-downtime-reason-machine.dto';
import { DowntimeReasonMachineCmd } from './cmd/downtime-reason-machine.command';
import { DowntimeReasonMachine } from './downtime-reason-machine.entity';
import { Crud, CrudController } from '@nestjsx/crud';
import { DowntimeReasonService } from '../downtime-reason/downtime-reason.service';
import { DowntimeReason } from '../downtime-reason/downtime-reason.entity';
import { DowntimeReasonMachineCreateCmd } from './cmd/downtime-reason-machine-create.command';
import { DowntimeReasonCmd } from '../downtime-reason/cmd/downtime-reason-create.command';
import { DowntimeReasonMachinePostCmd } from './cmd/downtime-reason-machine-post.command';
import { Utils } from '@app/shared/utils';

@Crud({
    model: {
        type: DowntimeReasonMachine,
    },
})

@ApiUseTags('downtime-reason-per-machine')
@ApiBearerAuth()
@Controller('api/v1/downtime-reason-machine')
export class DowntimeReasonMachineController implements CrudController<DowntimeReasonMachine> {
    constructor(public service: DowntimeReasonMachineService, public downtimeReasonService: DowntimeReasonService) {}
    
    @Get('find')
    @ApiResponse({ status: HttpStatus.OK, type: GetDowntimeReasonMachineDto, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'DowntimeReasonMachine not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiOperation({ title: 'Get DowntimeReasonMachine profile', description: 'Get DowntimeReasonMachine profile from JWT payload.' })
    async find(@Query() req: DowntimeReasonMachineCmd): Promise<GetDowntimeReasonMachineDto[]> {
        return await this.service.findSomeDowntimeReason(req);
    }

    @Get('category')
    @ApiResponse({ status: HttpStatus.OK, type: GetDowntimeReasonMachineDto, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'DowntimeReasonMachine not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiOperation({ title: 'Get DowntimeReasonMachine ', description: 'Get DowntimeReasonMachine from JWT payload.' })
    async findPlannedDowntime(@Query() req: DowntimeReasonMachineCmd): Promise<GetDowntimeReasonMachineDto[]> {
        return await this.service.findDowntimeReasonByCategory(req);
    }
    
    @Get('all')
    @ApiResponse({ status: HttpStatus.OK, type: GetDowntimeReasonMachineDto, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'DowntimeReasonMachine not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiOperation({ title: 'Get DowntimeReasonMachine profile', description: 'Get DowntimeReasonMachine profile from JWT payload.' })
    async findAll(): Promise<GetDowntimeReasonMachineDto[]> {
        return await this.service.findAllDowntimeReason();
    }
    
    @Post('create')
    @ApiResponse({ status: HttpStatus.OK, type: GetDowntimeReasonMachineDto, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'DowntimeReasonMachine not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiOperation({ title: 'Get DowntimeReasonMachine profile', description: 'Get DowntimeReasonMachine profile from JWT payload.' })
    async create(@Body() req: DowntimeReasonMachineCreateCmd): Promise<any> {
        let reasonCmd = new DowntimeReasonCmd();
        reasonCmd.reason = req.reason;
        let reason = await this.downtimeReasonService.create(reasonCmd);
        console.log(reason.id);
        
        let model = new DowntimeReasonMachinePostCmd();
        model.downtimeReasonId = reason.id;
        model.downtimeCategoryId = req.downtimeCategoryId;
        model.machineId = req.machineId;
        
        let process = await this.service.create(new DowntimeReasonMachine(model));

        if (!process) {
            return Utils.sendResponseSaveFailed("Downtime")
        }
        return Utils.sendResponseSaveSuccess(process);
    }
}
