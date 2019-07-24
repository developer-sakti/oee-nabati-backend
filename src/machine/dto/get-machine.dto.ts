import { ApiModelProperty } from '@nestjs/swagger';
import { IMachine } from '../interface/machine.interface';

export class GetMachineDto {
  constructor(data: IMachine) {
    this.id = data.id;
    this.name = data.name;
  }
  @ApiModelProperty() id: number;
  @ApiModelProperty() name: string;
}
