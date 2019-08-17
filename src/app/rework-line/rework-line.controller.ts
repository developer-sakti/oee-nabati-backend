import { Controller, Post, HttpStatus, Body, Patch, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReworkLineService } from './rework-line.service';
import { ReworkLineCmd } from './cmd/rework-line-request.command';
import { ReworkLine } from './rework-line.entity';
import { Utils } from '@app/shared/utils';
import { RencanaProduksiService } from '../rencana-produksi/rencana-produksi.service';
import { OeeShiftCreateCmd } from '../oee-shift/cmd/oee-shift-create.command';
import { OeeShiftService } from '../oee-shift/oee-shift.service';
import { RencanaProduksiFindShiftCmd } from '../rencana-produksi/cmd/rencana-produksi-find-shift.command';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('rencanaProduksi')
@ApiBearerAuth()
@Controller('api/v1/rencana-produksi/rework-line')
export class ReworkLineController {
    constructor(private readonly reworkLineService: ReworkLineService, 
        private readonly poService : RencanaProduksiService,
        private readonly oeeShiftService: OeeShiftService
        ) {}
    
    @Patch()
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ title: 'Post Rework Line', description: 'Save Rework Line.' })
    @ApiResponse({ description: 'Success!', status: HttpStatus.OK})
    @ApiResponse({ description: 'Bad request.', status: HttpStatus.BAD_REQUEST })
    public async post(@Body() req: ReworkLineCmd): Promise<any> {
        let po = await this.poService.findById(req.rencanaProduksiId);

        let process = await this.poService.updateRework(req);
        if (!process) return Utils.sendResponseUpdateFailed("Rework Line")

        let oeeShiftCmd     = new OeeShiftCreateCmd();
        oeeShiftCmd.lineId  = po.lineId;
        oeeShiftCmd.shiftId = po.shiftId;
        oeeShiftCmd.date    = po.date;

        console.log(oeeShiftCmd);
        
        let dataOee = await this.oeeShiftService.findByLineDateShift(oeeShiftCmd);
        let storeOeeShift;

        let poCmd = new RencanaProduksiFindShiftCmd();
        poCmd.line_id  = po.lineId;
        poCmd.shift_id = po.shiftId;
        poCmd.date    = po.date;
        let poByLineDateShiftMany = await this.poService.findByLineDateShift(poCmd);

        if (dataOee === undefined || dataOee === null) {
            oeeShiftCmd.e_total_rework_qty_karton = po.e_rework_qty_karton;

            storeOeeShift   = await this.oeeShiftService.create(oeeShiftCmd);
            if (!storeOeeShift) return Utils.sendResponseSaveFailed("Oee Shift")
        } else {
            oeeShiftCmd.e_total_rework_qty_karton = 0;
            poByLineDateShiftMany.forEach(element => {
                oeeShiftCmd.e_total_rework_qty_karton += element.e_rework_qty_karton;
            });

            storeOeeShift   = await this.oeeShiftService.updateReworkKarton(dataOee.id, oeeShiftCmd);
            if (!storeOeeShift) return Utils.sendResponseUpdateFailed("Oee Shift")
        }

        return Utils.sendResponseUpdateSuccess(process);
    }}
