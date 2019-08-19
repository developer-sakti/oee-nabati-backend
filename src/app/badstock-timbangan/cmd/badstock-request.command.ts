import { ApiModelProperty } from '@nestjs/swagger';
import { RencanaProduksi } from '@app/app/rencana-produksi/rencana-produksi.entity';
import { Machine } from '@app/app/machine/machine.entity';
import { DowntimeCategory } from '@app/app/downtime-category/downtime-category.entity';
import { DowntimeReason } from '@app/app/downtime-reason/downtime-reason.entity';

export class BadstockRequestCmd {
  @ApiModelProperty() weight_kg: number;

  @ApiModelProperty() rencanaProduksiId: number;
  @ApiModelProperty() machineId: number;
  @ApiModelProperty() badstockCategoryId : number;
}
