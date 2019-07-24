import { Controller, Get, HttpStatus, Req } from '@nestjs/common';
import { InitialShiftService } from '@app/initial-shift/initial-shift.service';
import { ApiResponse, ApiOperation, ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { GetInitialSkuDto } from './dto/get-initial-sku.dto';
import { InitialSkuService } from './initial-sku.service';

@ApiUseTags('initialShift')
@ApiBearerAuth()
@Controller('initial-sku')
export class InitialSkuController {
    constructor(private readonly initialSkuService: InitialSkuService) {}

    @Get()
    @ApiResponse({ status: HttpStatus.OK, type: GetInitialSkuDto, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'InitialSku not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiOperation({ title: 'Get InitialSku', description: 'Get InitialSku from JWT payload.' })
    async findAll(@Req() req): Promise<GetInitialSkuDto[]> {
        const initialSkuList = (await this.initialSkuService.findAll()).map(initialSku => new GetInitialSkuDto(initialSku));
        return Promise.resolve(initialSkuList);
    }
}
