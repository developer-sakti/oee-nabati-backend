import { ApiModelProperty } from '@nestjs/swagger';

export class DowntimeReasonMachineCmd {
  @ApiModelProperty() machine_id: number;
}
