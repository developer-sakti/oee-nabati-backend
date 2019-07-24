import { ApiModelProperty } from '@nestjs/swagger';
import { Machine } from '@app/machine/machine.entity';
import { IDowntimeCategory } from '../interface/downtime-category.interface';

export class GetDowntimeCategoryDto {
  constructor(data: IDowntimeCategory) {
    this.id = data.id;
    this.category = data.category;
  }
  @ApiModelProperty() id: number;
  @ApiModelProperty() category: string;
}
