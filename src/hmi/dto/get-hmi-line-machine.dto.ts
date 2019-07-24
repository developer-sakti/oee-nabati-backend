import { ApiModelProperty } from '@nestjs/swagger';
import { IHmi } from '../interface/hmi.interface';
import { Line } from '@app/line/line.entity';
import { Machine } from '@app/machine/machine.entity';

export class GetHmiLineMachineDto {
  constructor(data: IHmi) {
    this.id = data.id;
    this.name = data.name;
    this.lines = data.lines;
    this.machines = data.machines;
  }
  
  @ApiModelProperty() id: number;
  @ApiModelProperty() name: string;
  @ApiModelProperty() lines: Line[];
  @ApiModelProperty() machines: Machine[];
}
