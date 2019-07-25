import { ApiModelProperty } from '@nestjs/swagger';
import { IHmi } from '../interface/hmi.interface';
import { Line } from '@app/app/line/line.entity';

export class GetHmiLineDto {
  constructor(data: IHmi) {
    this.id = data.id;
    this.name = data.name;
    this.lines = data.lines;
  }
  @ApiModelProperty() id: number;
  @ApiModelProperty() name: string;
  @ApiModelProperty() lines: Line[];
}
