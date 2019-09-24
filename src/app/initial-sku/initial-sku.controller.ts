import { Controller, Get, HttpStatus, Req } from '@nestjs/common';
import { InitialShiftService } from '@app/app/initial-shift/initial-shift.service';
import { ApiResponse, ApiOperation, ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { GetInitialSkuDto } from './dto/get-initial-sku.dto';
import { InitialSkuService } from './initial-sku.service';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { InitialSku } from './initial-sku.entity';

@Crud({
    model : {
        type: InitialSku,
    },
    routes : {
        only : [
            'getManyBase',
            'getOneBase'
        ]
    }
})

@ApiUseTags('initialSku')
@ApiBearerAuth()
@Controller('api/v1/initial-sku')
export class InitialSkuController implements CrudController<InitialSku>{
    constructor(public service: InitialSkuService) {
    }

    @Get()
    @Override('getManyBase')
    @ApiResponse({ status: HttpStatus.OK, type: GetInitialSkuDto, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'InitialSku not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiOperation({ title: 'Get InitialSku', description: 'Get InitialSku from JWT payload.' })
    async findAll(@Req() req): Promise<GetInitialSkuDto[]> {
        const initialSkuList = (await this.service.findAll()).map(initialSku => new GetInitialSkuDto(initialSku));
        return Promise.resolve(initialSkuList);
    }
}
