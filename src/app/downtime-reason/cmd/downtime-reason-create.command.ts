import { ApiModelProperty } from '@nestjs/swagger';

export class DowntimeReasonCmd {
  @ApiModelProperty() reason: string;
}
