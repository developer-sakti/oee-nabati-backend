import { ApiModelProperty } from '@nestjs/swagger';
import { InitialShift } from '@app/app/initial-shift/initial-shift.entity';
import { Line } from '@app/app/line/line.entity';
import { User } from '@app/app/user/user.entity';
import { InitialSku } from '@app/app/initial-sku/initial-sku.entity';
import { IDowntimeReason } from '../interface/downtime-reason.interface';

export class GetDowntimeReasonDto {
  constructor(data: IDowntimeReason) {
    this.id = data.id;
    this.reason = data.reason;
  }
  @ApiModelProperty() id: number;
  @ApiModelProperty() reason: string;
}
