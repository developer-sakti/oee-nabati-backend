import { Controller, Post, HttpStatus, Body, Get, Query, Param, UseGuards } from '@nestjs/common';
import { DowntimeService } from './downtime.service';
import { ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetDowntimeDto } from './dto/downtime.dto';
import { Downtime } from './downtime.entity';
import { Utils } from '@app/shared/utils';
import { DowntimeCmd } from './cmd/downtime.command';
import { DowntimeRequestCmd } from './cmd/downtime-request.command';
import { DowntimeGetbylineCmd } from './cmd/downtime-getbyline.command';
import { OeeShiftService } from '../oee-shift/oee-shift.service';
import { OeeShiftCreateCmd } from '../oee-shift/cmd/oee-shift-create.command';
import { Variable } from '@app/shared/variable';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('downtime')
@ApiBearerAuth()
@Controller('api/v1/downtime')
export class DowntimeController {
  constructor(
    private readonly downtimeService: DowntimeService,
    private readonly oeeShiftService: OeeShiftService
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Post Downtime', description: 'Save downtime.' })
  @ApiResponse({ description: 'Success!', status: HttpStatus.OK, type: GetDowntimeDto })
  @ApiResponse({ description: 'Bad request.', status: HttpStatus.BAD_REQUEST })
  public async store(@Body() body: DowntimeRequestCmd): Promise<any> {
    let process = await this.downtimeService.create(new Downtime(body));
    if (!process) return Utils.sendResponseSaveFailed("Downtime")

    let oeeShiftCmd     = new OeeShiftCreateCmd();
    oeeShiftCmd.lineId  = body.lineId;
    oeeShiftCmd.shiftId = body.shiftId;
    oeeShiftCmd.date    = body.date;
    
    let dataOee = await this.oeeShiftService.findByLineDateShift(oeeShiftCmd);
    let storeOeeShift;

    console.log("data oee ada : " + dataOee);

    if (dataOee == null) {
      if (body.downtimeCategoryId === 1) {
        oeeShiftCmd.k_total_planned_dt_losses = body.duration;
      } else if (body.downtimeCategoryId === 2) {
        oeeShiftCmd.m_total_unplanned_dt = body.duration;
      } else if (body.downtimeCategoryId === 3) {
        oeeShiftCmd.o_total_performance_losses = body.duration;
      }

      storeOeeShift   = await this.oeeShiftService.create(oeeShiftCmd);
      if (!storeOeeShift) return Utils.sendResponseSaveFailed("Oee Shift")
    } else {
      if (body.downtimeCategoryId === 1) {
        oeeShiftCmd.k_total_planned_dt_losses = dataOee.k_total_planned_dt_losses + body.duration;

        storeOeeShift   = await this.oeeShiftService.updateDowntimePlanned(dataOee.id, oeeShiftCmd);
      } else if (body.downtimeCategoryId === 2) {
        oeeShiftCmd.m_total_unplanned_dt = dataOee.m_total_unplanned_dt + body.duration;
        
        storeOeeShift   = await this.oeeShiftService.updateDowntimeUnPlanned(dataOee.id, oeeShiftCmd);
      } else if (body.downtimeCategoryId === 3) {
        oeeShiftCmd.o_total_performance_losses = dataOee.o_total_performance_losses + body.duration;
      
        storeOeeShift   = await this.oeeShiftService.updateDowntimePerformanceLosses(dataOee.id, oeeShiftCmd);
      }
      
      if (!storeOeeShift) return Utils.sendResponseUpdateFailed("Oee Shift")
    }


    return Utils.sendResponseSaveSuccess(process);
  }

  @Get('history')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Get Downtime', description: 'Get downtime.' })
  @ApiResponse({ description: 'Success!', status: HttpStatus.OK })
  @ApiResponse({ description: 'Bad request.', status: HttpStatus.BAD_REQUEST })
  public async getByLine(@Query() req: DowntimeGetbylineCmd): Promise<any> {
    let process = await this.downtimeService.findByLine(req);
    if (!process) {
      return Utils.NULL_RETURN;
    }
    return process;
  }

  @Get('category/:category_id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Get Downtime', description: 'Get downtime.' })
  @ApiResponse({ description: 'Success!', status: HttpStatus.OK })
  @ApiResponse({ description: 'Bad request.', status: HttpStatus.BAD_REQUEST })
  public async getByCategory(@Param("category_id") category_id: number, @Query() req : DowntimeGetbylineCmd): Promise<any> {
    let process = await this.downtimeService.findByCategory(category_id, req);
    if (!process) {
      return Utils.NULL_RETURN;
    }
    return process;
  }
}
