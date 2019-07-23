import { ApiModelProperty } from '@nestjs/swagger';
import { IHmi } from '../interface/hmi.interface';

export class GetHmiDto {
  constructor(data: IHmi) {
    this.id = data.id;
    this.name = data.name;
  }
  @ApiModelProperty() id: number;
  @ApiModelProperty() name: string;
}
