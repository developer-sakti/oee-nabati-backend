import { Controller, Get, HttpStatus, Req } from '@nestjs/common';
import { MachineService } from './machine.service';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import { GetMachineDto } from './dto/get-machine.dto';

@Controller('api/v1/machine')
export class MachineController {
    constructor(private readonly machineService: MachineService) {}

    @Get()
    @ApiResponse({ status: HttpStatus.OK, type: GetMachineDto, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Machine not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiOperation({ title: 'Get Machine', description: 'Get machine from JWT payload.' })
    async findAll(@Req() req): Promise<GetMachineDto[]> {
        const machineList = (await this.machineService.findAll()).map(machine => new GetMachineDto(machine));
        return Promise.resolve(machineList);
    }
}
