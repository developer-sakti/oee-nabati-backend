import { Controller, Post, HttpStatus, Body, Put, Patch } from '@nestjs/common';
import { LakbanFinishgoodService } from './lakban-finishgood.service';
import { ApiOperation, ApiResponse, ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { LakbanFinishgoodCmd } from './cmd/lakban-finishgood-request.command';
import { LakbanFinishgood } from './lakban-finishgood.entity';
import { Utils } from '@app/shared/utils';
import { RencanaProduksiService } from '../rencana-produksi/rencana-produksi.service';
import { RencanaProduksiCmd } from '../rencana-produksi/cmd/rencana-produksi.command';
import { OeeShiftCreateCmd } from '../oee-shift/cmd/oee-shift-create.command';
import { OeeShiftService } from '../oee-shift/oee-shift.service';
import { RencanaProduksiFindShiftCmd } from '../rencana-produksi/cmd/rencana-produksi-find-shift.command';

@ApiUseTags('lakban')
@ApiBearerAuth()
@Controller('api/v1/lakban/finishgood')
export class LakbanFinishgoodController {
    constructor(private readonly lakbanFinishgoodService: LakbanFinishgoodService,
                private readonly rencanaProduksiService: RencanaProduksiService,
                private readonly oeeShiftService: OeeShiftService
                ) {}
    
    @Post()
    @ApiOperation({ title: 'Post LakbanFinishgood', description: 'Save LakbanFinishgood.' })
    @ApiResponse({ description: 'Success!', status: HttpStatus.OK})
    @ApiResponse({ description: 'Bad request.', status: HttpStatus.BAD_REQUEST })
    public async post(@Body() req: LakbanFinishgoodCmd): Promise<any> {
        let po = await this.rencanaProduksiService.findById(req.rencanaProduksiId);

        let process = await this.rencanaProduksiService.updateFinishgood(req);
        if (!process) return Utils.sendResponseSaveFailed("Lakban Finishgood")

        let oeeShiftCmd     = new OeeShiftCreateCmd();
        oeeShiftCmd.lineId  = po.lineId;
        oeeShiftCmd.shiftId = po.shiftId;
        oeeShiftCmd.date    = po.date;
        
        let dataOee = await this.oeeShiftService.findByLineDateShift(oeeShiftCmd);
        let storeOeeShift;

        let poCmd = new RencanaProduksiFindShiftCmd();
        poCmd.line_id  = po.lineId;
        poCmd.shift_id = po.shiftId;
        poCmd.date    = po.date;
        let poByLineDateShiftMany = await this.rencanaProduksiService.findByLineDateShift(poCmd);

        if (dataOee === undefined || dataOee === null) {
            oeeShiftCmd.b_finishgood_shift = po.b_finishgood_qty_karton;

            storeOeeShift   = await this.oeeShiftService.create(oeeShiftCmd);
            if (!storeOeeShift) return Utils.sendResponseSaveFailed("Oee Shift")
        } else {
            oeeShiftCmd.b_finishgood_shift = 0;
            poByLineDateShiftMany.forEach(element => {
                oeeShiftCmd.b_finishgood_shift += element.b_finishgood_qty_karton;
            });

            storeOeeShift   = await this.oeeShiftService.updateFinishgood(dataOee.id, oeeShiftCmd);
            if (!storeOeeShift) return Utils.sendResponseUpdateFailed("Oee Shift")
        }

        return Utils.sendResponseSaveSuccess(process);
    }
}
