import { ApiModelProperty } from '@nestjs/swagger';

export class DowntimeCmd {
  @ApiModelProperty() rencana_produksi_id: number;
  @ApiModelProperty() machine_id: number;
  @ApiModelProperty() reason_downtime_id;
  @ApiModelProperty() duration: number;
}
