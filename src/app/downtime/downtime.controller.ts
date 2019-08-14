import { Controller, Post, HttpStatus, Body, Get, Query } from '@nestjs/common';
import { DowntimeService } from './downtime.service';
import { ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetDowntimeDto } from './dto/downtime.dto';
import { Downtime } from './downtime.entity';
import { Utils } from '@app/shared/utils';
import { DowntimeCmd } from './cmd/downtime.command';
import { DowntimeRequestCmd } from './cmd/downtime-request.command';
import { DowntimeGetbylineCmd } from './cmd/downtime-getbyline.command';

@ApiUseTags('downtime')
@ApiBearerAuth()
@Controller('api/v1/downtime')
export class DowntimeController {
  constructor(private readonly downtimeService: DowntimeService) {}

  @Post()
  @ApiOperation({ title: 'Post Downtime', description: 'Save downtime.' })
  @ApiResponse({ description: 'Success!', status: HttpStatus.OK, type: GetDowntimeDto })
  @ApiResponse({ description: 'Bad request.', status: HttpStatus.BAD_REQUEST })
  public async store(@Body() body: DowntimeRequestCmd): Promise<any> {

    let process = await this.downtimeService.create(new Downtime(body));

    if (!process) {
        return Utils.sendResponseSaveFailed("Downtime")
    }
    return Utils.sendResponseSaveSuccess(process);
  }

  @Get('history')
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
}
