import { ApiModelProperty } from '@nestjs/swagger';

export class DowntimeReasonMachinePostCmd {
  @ApiModelProperty() downtimeReasonId: number;
  @ApiModelProperty() machineId: number;
  @ApiModelProperty() downtimeCategoryId: number;
}
