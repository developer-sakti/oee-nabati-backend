import { Controller, Post, HttpStatus, Body, Patch } from '@nestjs/common';
import { LakbanReworkService } from './lakban-rework.service';
import { ApiOperation, ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { LakbanReworkCmd } from './cmd/lakban-rework-request.command';
import { LakbanRework } from './lakban-rework.entity';
import { Utils } from '@app/shared/utils';
import { RencanaProduksiService } from '../rencana-produksi/rencana-produksi.service';
import { OeeShiftCreateCmd } from '../oee-shift/cmd/oee-shift-create.command';
import { OeeShiftService } from '../oee-shift/oee-shift.service';
import { RencanaProduksiFindShiftCmd } from '../rencana-produksi/cmd/rencana-produksi-find-shift.command';

@ApiUseTags('lakban')
@ApiBearerAuth()
@Controller('api/v1/lakban/rework')
export class LakbanReworkController {
    constructor(private readonly lakbanReworkService: LakbanReworkService, 
        private readonly rencanaProduksiService: RencanaProduksiService,
        private readonly oeeShiftService: OeeShiftService
        ) {}
    
    @Patch()
    @ApiOperation({ title: 'Post LakbanRework', description: 'Save LakbanRework.' })
    @ApiResponse({ description: 'Success!', status: HttpStatus.OK})
    @ApiResponse({ description: 'Bad request.', status: HttpStatus.BAD_REQUEST })
    public async post(@Body() req: LakbanReworkCmd): Promise<any> {
        let po = await this.rencanaProduksiService.findById(req.rencanaProduksiId);

        let process = await this.rencanaProduksiService.minFinishgood(req);
        if (!process) return Utils.sendResponseSaveFailed("Lakban Rework Finishgood")

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
