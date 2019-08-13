import { ApiModelProperty } from '@nestjs/swagger';
import { RencanaProduksi } from '@app/app/rencana-produksi/rencana-produksi.entity';
import { Machine } from '@app/app/machine/machine.entity';
import { DowntimeCategory } from '@app/app/downtime-category/downtime-category.entity';
import { DowntimeReason } from '@app/app/downtime-reason/downtime-reason.entity';
import { InitialShift } from '@app/app/initial-shift/initial-shift.entity';
import { Line } from '@app/app/line/line.entity';

export class DowntimeCmd {
  @ApiModelProperty() duration: number;
  @ApiModelProperty() date: string;

  @ApiModelProperty() shift: InitialShift;
  @ApiModelProperty() line: Line;
  @ApiModelProperty() rencana_produksi: RencanaProduksi;
  @ApiModelProperty() machine: Machine;
  @ApiModelProperty() downtime_category : DowntimeCategory;
  @ApiModelProperty() downtime_reason : DowntimeReason;
}
