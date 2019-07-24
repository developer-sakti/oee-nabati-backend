import { ApiModelProperty } from '@nestjs/swagger';
import { IInitialShift } from '../interface/initial-shift.interface';

export class GetInitialShiftDto {
  constructor(data: IInitialShift) {
    this.id = data.id;
    this.shift_name = data.shift_name;
    this.shift_operated = data.shift_operated;
    this.start_time = data.start_time;
    this.end_time = data.end_time;
  }
  @ApiModelProperty() id: number;
  @ApiModelProperty() shift_name?: string;
  @ApiModelProperty() shift_operated?: number;
  @ApiModelProperty() start_time?: string;
  @ApiModelProperty() end_time?: string;
}
