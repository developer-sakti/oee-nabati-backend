import { ApiModelProperty } from '@nestjs/swagger';
import { InitialShift } from '@app/app/initial-shift/initial-shift.entity';
import { Line } from '@app/app/line/line.entity';
import { User } from '@app/app/user/user.entity';
import { InitialSku } from '@app/app/initial-sku/initial-sku.entity';
import { IDowntimeReasonMachine } from '../interface/downtime-reason-machine.interface';
import { Machine } from '@app/app/machine/machine.entity';
import { DowntimeCategory } from '@app/app/downtime-category/downtime-category.entity';
import { DowntimeReason } from '@app/app/downtime-reason/downtime-reason.entity';

export class GetDowntimeReasonMachineDto {
  constructor(data: IDowntimeReasonMachine) {
    this.id = data.id;
    
    this.machine = data.machine;
    this.downtime_category = data.downtime_category;
    this.downtime_reason = data.downtime_reason;
  }
  
  @ApiModelProperty() id: number;
  
  @ApiModelProperty() machine: Machine;
  @ApiModelProperty() downtime_category: DowntimeCategory;
  @ApiModelProperty() downtime_reason: DowntimeReason;
}
