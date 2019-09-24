import { ApiModelProperty } from '@nestjs/swagger';
import { RencanaProduksi } from '@app/app/rencana-produksi/rencana-produksi.entity';
import { Machine } from '@app/app/machine/machine.entity';
import { DowntimeCategory } from '@app/app/downtime-category/downtime-category.entity';
import { DowntimeReason } from '@app/app/downtime-reason/downtime-reason.entity';

export class DowntimeGetbylineShiftDateCmd {
  @ApiModelProperty() line_id: number;
  @ApiModelProperty() shift_id: number;
  
  @ApiModelProperty({ required : false }) from_date: string;
  @ApiModelProperty({ required : false }) to_date: string;
  @ApiModelProperty({ required : false }) date: string;
}