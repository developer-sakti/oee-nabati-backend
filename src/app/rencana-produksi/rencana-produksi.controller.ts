import {
  Controller,
  Get,
  Req,
  HttpStatus,
  Post,
  Body,
  Query,
  UseGuards,
  Delete,
  Param,
} from '@nestjs/common';
import {
  ApiUseTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiModelProperty,
} from '@nestjs/swagger';
import { RencanaProduksiService } from './rencana-produksi.service';
import { GetRencanaProduksiDto } from './dto/get-rencana-produksi.dto';
import { Raw } from 'typeorm';
import { RencanaProduksiCmd } from './cmd/rencana-produksi.command';
import { RencanaProduksiFindCmd } from './cmd/rencana-produksi-find.command';
import { RencanaProduksi } from './rencana-produksi.entity';
import { RencanaProduksiCreateCmd } from './cmd/rencana-produksi-create.command';
import { Utils } from '@app/shared/utils';
import { RencanaProduksiWaitingListCmd } from './cmd/rencana-produksi-waiting-list.command';
import { RencanaProduksiFindShiftCmd } from './cmd/rencana-produksi-find-shift.command';
import { OeeShiftService } from '../oee-shift/oee-shift.service';
import { OeeShiftCreateCmd } from '../oee-shift/cmd/oee-shift-create.command';
import { concat } from 'rxjs';
import { OeeShift } from '../oee-shift/oee-shift.entity';
import { AuthGuard } from '@nestjs/passport';
import { RencanaProduksiFindByPoCmd } from './cmd/rencana-produksi-find-po.command';
import { Crud, CrudController, Override } from '@nestjsx/crud';

@Crud({
  model: {
    type: RencanaProduksi,
  },
  routes: {
    only: ['getManyBase', 'getOneBase', 'createOneBase', 'updateOneBase', 'deleteOneBase'],
  },
})
@ApiUseTags('rencanaProduksi')
@ApiBearerAuth()
@Controller('api/v1/rencana-produksi')
export class RencanaProduksiController implements CrudController<RencanaProduksi> {
  constructor(
    public readonly service: RencanaProduksiService,
    private readonly rencanaProduksiService: RencanaProduksiService,
    private readonly oeeShiftService: OeeShiftService,
  ) {}

  @Get()
  @Override('getManyBase')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: HttpStatus.OK, type: GetRencanaProduksiDto, description: 'Success!' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'RencanaProduksi not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiOperation({
    title: 'Get RencanaProduksi',
    description: 'Get RencanaProduksi from JWT payload.',
  })
  async findAll(@Req() req): Promise<GetRencanaProduksiDto[]> {
    const rencanaProduksiList = (await this.rencanaProduksiService.findAll()).map(
      rencanaProduksi => new GetRencanaProduksiDto(rencanaProduksi),
    );
    return Promise.resolve(rencanaProduksiList);
  }

  @Get('active')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: HttpStatus.OK, type: GetRencanaProduksiDto, description: 'Success!' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'RencanaProduksi not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiOperation({
    title: 'Get RencanaProduksi ',
    description: 'Get RencanaProduksi  from JWT payload.',
  })
  async findActivePO(@Query() req: RencanaProduksiCmd): Promise<any> {
    return await this.rencanaProduksiService.findActivePo(req);
  }

  @Get('find')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: HttpStatus.OK, type: GetRencanaProduksiDto, description: 'Success!' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'RencanaProduksi not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiOperation({
    title: 'Get RencanaProduksi List',
    description: 'Get RencanaProduksi List from JWT payload.',
  })
  async findListPO(@Query() req: RencanaProduksiFindCmd): Promise<any> {
    return await this.rencanaProduksiService.findByLineDate(req);
  }

  @Get('find/shift')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: HttpStatus.OK, type: GetRencanaProduksiDto, description: 'Success!' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'RencanaProduksi not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiOperation({
    title: 'Get RencanaProduksi Find Shift List',
    description: 'Get RencanaProduksi List from JWT payload.',
  })
  async findPOByShift(@Query() req: RencanaProduksiFindShiftCmd): Promise<any> {
    return await this.rencanaProduksiService.findByLineDateShift(req);
  }

  @Get('waiting-list')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: HttpStatus.OK, type: GetRencanaProduksiDto, description: 'Success!' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'RencanaProduksi not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiOperation({
    title: 'Get RencanaProduksi Waiting List',
    description: 'Get RencanaProduksi List from JWT payload.',
  })
  async finWaitingList(@Query() req: RencanaProduksiWaitingListCmd): Promise<any> {
    return await this.rencanaProduksiService.findWaitingList(req);
  }

  @Get('productivity')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: HttpStatus.OK, type: GetRencanaProduksiDto, description: 'Success!' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'RencanaProduksi not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiOperation({
    title: 'Get RencanaProduksi Waiting List',
    description: 'Get RencanaProduksi List from JWT payload.',
  })
  async findProductivity(): Promise<any> {
    return await this.rencanaProduksiService.getProductivity();
  }

  @Get('find/by-po')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: HttpStatus.OK, type: GetRencanaProduksiDto, description: 'Success!' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'RencanaProduksi not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiOperation({
    title: 'Get RencanaProduksi Waiting List',
    description: 'Get RencanaProduksi List from JWT payload.',
  })
  async findByPo(@Query() query: RencanaProduksiFindByPoCmd): Promise<any> {
    return await this.rencanaProduksiService.findByPO(query.po);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: HttpStatus.OK, type: RencanaProduksi, description: 'Success!' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'RencanaProduksi not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiOperation({
    title: 'Create RencanaProduksi ',
    description: 'Create RencanaProduksi from JWT payload.',
  })
  @Override('createOneBase')
  async store(@Body() body: RencanaProduksiCreateCmd): Promise<any> {
    let process = await this.rencanaProduksiService.create(body);
    if (!process) return Utils.sendResponseSaveFailed('Rencana produksi');

    let oeeShiftCmd = new OeeShiftCreateCmd();
    oeeShiftCmd.lineId = body.lineId;
    oeeShiftCmd.shiftId = body.shiftId;
    oeeShiftCmd.date = body.date;

    console.log(oeeShiftCmd);

    let dataOee = await this.oeeShiftService.findByLineDateShift(oeeShiftCmd);
    let storeOeeShift;
    console.log('data oee : ' + dataOee);

    if (dataOee === undefined || dataOee === null) {
      oeeShiftCmd.total_target_produksi = body.target_produksi;
      oeeShiftCmd.total_standart_ct = body.standart_ct;
      oeeShiftCmd.total_bottleneck_ct = body.bottleneck_ct;

      storeOeeShift = await this.oeeShiftService.create(oeeShiftCmd);
      if (!storeOeeShift) return Utils.sendResponseSaveFailed('Oee Shift');
    } else {
      oeeShiftCmd.total_target_produksi =
        Number(dataOee.total_target_produksi) + body.target_produksi;
      oeeShiftCmd.total_standart_ct = Number(dataOee.total_standart_ct) + body.standart_ct;
      oeeShiftCmd.total_bottleneck_ct = Number(dataOee.total_bottleneck_ct) + body.bottleneck_ct;

      storeOeeShift = await this.oeeShiftService.updateTotalProduksi(dataOee.id, oeeShiftCmd);
      if (!storeOeeShift) return Utils.sendResponseUpdateFailed('Oee Shift');
    }

    return Utils.sendResponseSaveSuccess(process);
  }

  //   @Delete()
  //   @UseGuards(AuthGuard('jwt'))
  //   async delete(@Param('id') id: number): Promise<any> {
  //     const deleted = await this.rencanaProduksiService.delete(id);
  //     return deleted;
  //     // if (deleted) return Utils.sendResponseDeleteSuccess(deleted);
  //     // else return Utils.sendResponseDeleteFailed('Rencana Produksi');
  //   }
}
