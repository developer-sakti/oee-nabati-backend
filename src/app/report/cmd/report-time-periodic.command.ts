import { ApiModelProperty } from '@nestjs/swagger';

export class ReportTimePeriodicCmd {
  @ApiModelProperty() format: string;

  @ApiModelProperty() line_id: number;
  @ApiModelProperty() shift_id: number;
  @ApiModelProperty() from_date: string;
  @ApiModelProperty() to_date: string;
}
