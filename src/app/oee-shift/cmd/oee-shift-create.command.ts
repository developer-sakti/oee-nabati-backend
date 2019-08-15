import { ApiModelProperty } from '@nestjs/swagger';

export class OeeShiftCreateCmd {
  @ApiModelProperty() shiftId: number;
  @ApiModelProperty() lineId: number;
  @ApiModelProperty() date: string;

  @ApiModelProperty() total_target_produksi: number;
}
