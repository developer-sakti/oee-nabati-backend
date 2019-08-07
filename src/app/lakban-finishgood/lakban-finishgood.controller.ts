import { Controller, Post, HttpStatus, Body, Put, Patch } from '@nestjs/common';
import { LakbanFinishgoodService } from './lakban-finishgood.service';
import { ApiOperation, ApiResponse, ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { LakbanFinishgoodCmd } from './cmd/lakban-finishgood-request.command';
import { LakbanFinishgood } from './lakban-finishgood.entity';
import { Utils } from '@app/shared/utils';
import { RencanaProduksiService } from '../rencana-produksi/rencana-produksi.service';

@ApiUseTags('lakban')
@ApiBearerAuth()
@Controller('api/v1/lakban/finishgood')
export class LakbanFinishgoodController {
    constructor(private readonly lakbanFinishgoodService: LakbanFinishgoodService,
                private readonly rencanaProduksiService: RencanaProduksiService) {}
    
    @Post()
    @ApiOperation({ title: 'Post LakbanFinishgood', description: 'Save LakbanFinishgood.' })
    @ApiResponse({ description: 'Success!', status: HttpStatus.OK})
    @ApiResponse({ description: 'Bad request.', status: HttpStatus.BAD_REQUEST })
    public async post(@Body() req: LakbanFinishgoodCmd): Promise<any> {
        let process = await this.lakbanFinishgoodService.create(new LakbanFinishgood(req));
    
        if (!process) {
            return Utils.sendResponseSaveFailed("Lakban Finishgood")
        }
        return Utils.sendResponseSaveSuccess(process);
    }

    @Patch()
    @ApiOperation({ title: 'Post LakbanFinishgood', description: 'Update LakbanFinishgood.' })
    @ApiResponse({ description: 'Success!', status: HttpStatus.OK})
    @ApiResponse({ description: 'Bad request.', status: HttpStatus.BAD_REQUEST })
    public async updateFinishgood(@Body() req: any): Promise<any> {
        let process = await this.rencanaProduksiService.update(req);
    
        if (!process) {
            return Utils.sendResponseSaveFailed("Lakban Finishgood")
        }
        return Utils.sendResponseSaveSuccess(process);
    }
}
