import { ApiModelProperty } from '@nestjs/swagger';

export class DowntimeReasonMachineCreateCmd {
  @ApiModelProperty() reason: string;
  @ApiModelProperty() machineId: number;
  @ApiModelProperty() downtimeCategoryId: number;
}
