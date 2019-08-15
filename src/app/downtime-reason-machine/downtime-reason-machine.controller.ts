import { Controller, Post, HttpStatus, Body, Get, Query, Patch, Param } from '@nestjs/common';
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
        
        let model = new DowntimeReasonMachinePostCmd();
        model.downtimeReasonId = reason.id;
        model.downtimeCategoryId = req.downtimeCategoryId;
        model.machineId = req.machineId;
        
        let process = await this.service.create(new DowntimeReasonMachine(model));

        if (!reason && !process) {
            return Utils.sendResponseSaveFailed("Downtime")
        }
        return Utils.sendResponseSaveSuccess(process);
    }

    @Patch('update/:id')
    @ApiResponse({ status: HttpStatus.OK, type: GetDowntimeReasonMachineDto, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'DowntimeReasonMachine not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiOperation({ title: 'Get DowntimeReasonMachine profile', description: 'Get DowntimeReasonMachine profile from JWT payload.' })
    async update(@Param("id") id : number, @Body() req: DowntimeReasonMachineCreateCmd): Promise<any> {
        let downtimeReasonMachine        = await this.service.findOne(id);
        let updateDowntimeReasonMachine = await this.service.update(id, req);
        if (!updateDowntimeReasonMachine) return Utils.sendResponseUpdateFailed("Downtime Reason Machine")

        let downtimeReasonCmd   = new DowntimeReasonCmd();
        downtimeReasonCmd.reason= req.reason; 

        let reason          = await this.downtimeReasonService.updateCustom(
            downtimeReasonMachine.downtimeReasonId, downtimeReasonCmd);
        if (!reason) return Utils.sendResponseUpdateFailed("Downtime Reason")

        return Utils.sendResponseUpdateSuccess(downtimeReasonMachine);
    }
}
