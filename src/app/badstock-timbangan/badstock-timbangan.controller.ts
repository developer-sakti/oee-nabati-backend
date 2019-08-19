import { Controller, Post, HttpStatus, Body, UseGuards, Query, Get } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BadstockTimbanganService } from './badstock-timbangan.service';
import { BadstockRequestCmd } from './cmd/badstock-request.command';
import { BadstockTimbangan } from './badstock-timbangan.entity';
import { Utils } from '@app/shared/utils';
import { RencanaProduksiService } from '../rencana-produksi/rencana-produksi.service';
import { OeeShiftCreateCmd } from '../oee-shift/cmd/oee-shift-create.command';
import { OeeShiftService } from '../oee-shift/oee-shift.service';
import { OeeShiftDateShiftCmd } from '../oee-shift/cmd/oee-shift-date-shift.command';
import { OeeShiftDateLineCmd } from '../oee-shift/cmd/oee-shift-date-line.command';
import { RencanaProduksiFindShiftCmd } from '../rencana-produksi/cmd/rencana-produksi-find-shift.command';
import { AuthGuard } from '@nestjs/passport';
import { BadstockGetDateCmd } from './cmd/badstock-get-date.command';

@ApiUseTags('badstock')
@ApiBearerAuth()
@Controller('api/v1/badstock/timbangan')
export class BadstockTimbanganController {
  constructor(
    private readonly badstockTimbanganService: BadstockTimbanganService,
    private readonly poService : RencanaProduksiService,
    private readonly oeeShiftService: OeeShiftService

    ) {}
  
  @Post()
  @ApiOperation({ title: 'Post BadstockTimbangan', description: 'Save BadstockTimbangan.' })
  @ApiResponse({ description: 'Success!', status: HttpStatus.OK})
  @ApiResponse({ description: 'Bad request.', status: HttpStatus.BAD_REQUEST })
  public async post(@Body() req: BadstockRequestCmd): Promise<any> {
    let po = await this.poService.findById(req.rencanaProduksiId);

    let process = await this.badstockTimbanganService.create(new BadstockTimbangan(req));
    let update  = await this.poService.updateDefectBadstock(req);

    if (!process && !update) {
      return Utils.sendResponseSaveFailed("Badstock")
    } 

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
    
    let poByLineDateShiftMany = await this.poService.findByLineDateShift(poCmd);

    if (dataOee === undefined || dataOee === null) {
      oeeShiftCmd.d_total_defect_qty_karton = po.d_defect_qty_karton;

      storeOeeShift   = await this.oeeShiftService.create(oeeShiftCmd);
      if (!storeOeeShift) return Utils.sendResponseSaveFailed("Oee Shift")
    } else {
        oeeShiftCmd.d_total_defect_qty_karton = 0;
        poByLineDateShiftMany.forEach(element => {
            oeeShiftCmd.d_total_defect_qty_karton += element.d_defect_qty_karton;
        });

        storeOeeShift   = await this.oeeShiftService.updateDefect(dataOee.id, oeeShiftCmd);
        if (!storeOeeShift) return Utils.sendResponseUpdateFailed("Oee Shift")
    }
  
    return Utils.sendResponseSaveSuccess(process);
  }

  @Get('history')
  @ApiOperation({ title: 'Get Badstock Timbangan', description: 'Get Badstock Timbangan.' })
  @ApiResponse({ description: 'Success!', status: HttpStatus.OK})
  public async getHistory(@Query() query : BadstockGetDateCmd) {
    return await this.badstockTimbanganService.getHistory(query);    
  }
}
