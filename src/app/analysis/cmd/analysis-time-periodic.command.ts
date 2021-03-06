import { ApiModelProperty } from '@nestjs/swagger';

export class AnalysisTimePeriodicCmd {
  @ApiModelProperty() line_id: number;
  @ApiModelProperty() from_date: string;
  @ApiModelProperty() to_date: string;

  @ApiModelProperty() time_periodic: string;
}
