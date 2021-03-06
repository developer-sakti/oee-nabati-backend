import { Controller, Get, HttpStatus, Query, Param, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { GetOeeShiftDto } from './dto/get-oee-shift.dto';
import { OeeShiftDateShiftCmd } from './cmd/oee-shift-date-shift.command';
import { RencanaProduksiService } from '../rencana-produksi/rencana-produksi.service';
import { OeeShiftService } from './oee-shift.service';
import { DowntimeService } from '../downtime/downtime.service';
import { BadstockTimbangan } from '../badstock-timbangan/badstock-timbangan.entity';
import { BadstockTimbanganService } from '../badstock-timbangan/badstock-timbangan.service';
import { Utils } from '@app/shared/utils';
import { OeeShiftDateTimeCmd } from './cmd/oee-shift-date-time.command';
import { RencanaProduksiFindShiftCmd } from '../rencana-produksi/cmd/rencana-produksi-find-shift.command';
import { OeeShiftDateTimeLineCmd } from './cmd/oee-shift-date-time-line.command';
import { OeeShiftDateLineCmd } from './cmd/oee-shift-date-line.command';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('OEE')
@ApiBearerAuth()
@Controller('api/v1/oee')
export class OeeShiftController {
  constructor(
    private readonly rencanaProduksiService: RencanaProduksiService,
    private readonly oeeShiftService: OeeShiftService,
    private readonly downtimeService: DowntimeService,
    private readonly bsService: BadstockTimbanganService,
  ) {}

  @Get('sector')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: HttpStatus.OK, type: GetOeeShiftDto, description: 'Success!' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Oee Shift not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiOperation({
    title: 'Get Oee Shift List',
    description: 'Get Oee Shift List from JWT payload.',
  })
  async getOeeSector(@Query() req: OeeShiftDateTimeCmd): Promise<any> {
    let shiftId;

    if (req.time < '14:00:00') shiftId = 1;
    else if (req.time < '22:00:00') shiftId = 2;
    else shiftId = 3;

    let cmdOee = new OeeShiftDateShiftCmd();
    cmdOee.date = req.date;
    cmdOee.shiftId = shiftId;

    return await this.oeeShiftService.findOeeSector(cmdOee);
  }

  @Get('tv')
  @ApiResponse({ status: HttpStatus.OK, type: GetOeeShiftDto, description: 'Success!' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Oee Shift not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiOperation({
    title: 'Get Oee Shift List',
    description: 'Get Oee Shift List from JWT payload.',
  })
  async getTv(@Query() req: OeeShiftDateTimeLineCmd): Promise<any> {
    let shiftId;

    if (req.time < '14:00:00') shiftId = 1;
    else if (req.time < '22:00:00') shiftId = 2;
    else shiftId = 3;

    let cmdOee = new OeeShiftDateLineCmd();
    cmdOee.date = req.date;
    cmdOee.shiftId = shiftId;
    cmdOee.lineId = req.line_id;

    return await this.oeeShiftService.findByLineDateShift(cmdOee);
  }

  @Get('shift/bydate')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: HttpStatus.OK, type: GetOeeShiftDto, description: 'Success!' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Oee Shift not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiOperation({
    title: 'Get Oee Shift List',
    description: 'Get Oee Shift List from JWT payload.',
  })
  async getByDateShift(@Query() req: OeeShiftDateShiftCmd): Promise<any> {
    let oeeshift = await this.oeeShiftService.findByDateShift(req);
    let oee = {};

    if (oeeshift == null) return Utils.NULL_RETURN;

    for (var element of oeeshift) {
      let poCmd = new RencanaProduksiFindShiftCmd();
      poCmd.date = req.date;
      poCmd.shift_id = req.shiftId;
      poCmd.line_id = element.lineId;

      let po = await this.rencanaProduksiService.findByLineDateShift(poCmd);
      await Object.assign(element, {
        po: po,
      });
    }

    return {
      date: req.date,
      shift: req.shiftId,
      oee_shift: oeeshift,
    };
  }

  @Get('shift/bydate/:line_id')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: HttpStatus.OK, type: GetOeeShiftDto, description: 'Success!' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Oee Shift not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiOperation({
    title: 'Get Oee Shift List',
    description: 'Get Oee Shift List from JWT payload.',
  })
  async getByDateShiftDetails(
    @Param('line_id') line_id: number,
    @Query() req: OeeShiftDateShiftCmd,
  ): Promise<any> {
    let oeeshift = await this.oeeShiftService.findByDateShiftDetails(line_id, req);

    let bsParams = {
      ...req,
      lineId: line_id,
    };

    let planned = await this.downtimeService.findByLineDateShiftCategory(1, line_id, req);
    let unplanned = await this.downtimeService.findByLineDateShiftCategory(2, line_id, req);
    let performance_loss = await this.downtimeService.findByLineDateShiftCategory(3, line_id, req);
    let quality_loss = await this.bsService.findByDateShiftLineLimit(bsParams, 2);

    let downtime_event = await this.downtimeService.findDowntimeEvent(line_id, req);

    return {
      oee_shift: oeeshift,
      six_big_loss: {
        availability_loss: unplanned,
        performance_loss: performance_loss,
        quality_loss: quality_loss,
      },
      event: downtime_event,
    };
  }
}
