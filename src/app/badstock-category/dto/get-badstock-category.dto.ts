import { ApiModelProperty } from '@nestjs/swagger';
import { Machine } from '@app/app/machine/machine.entity';
import { IBadstockCategory } from '../interface/badstock-category.interface';

export class GetBadstockCategoryDto {
  constructor(data: IBadstockCategory) {
    this.id = data.id;
    this.category = data.category;
  }
  @ApiModelProperty() id: number;
  @ApiModelProperty() category: string;
}
