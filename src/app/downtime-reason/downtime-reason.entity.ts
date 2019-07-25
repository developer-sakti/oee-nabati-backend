import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { IDowntimeReason } from './interface/downtime-reason.interface';
import { InitialShift } from '@app/app/initial-shift/initial-shift.entity';
import { Line } from '@app/app/line/line.entity';
import { InitialSku } from '@app/app/initial-sku/initial-sku.entity';
import { User } from '@app/app/user/user.entity';
import { DowntimeReasonMachine } from '@app/app/downtime-reason-machine/downtime-reason-machine.entity';

@Entity()
export class DowntimeReason implements IDowntimeReason {
  constructor(data: IDowntimeReason) {
    if (!!data) {
      this.id = data.id;
      this.reason = data.reason;
    }
  }

  @PrimaryGeneratedColumn() public id: number;

  @Column() public reason: string;

  @OneToMany(type => DowntimeReasonMachine, downtime_reason_machine => downtime_reason_machine.downtime_category)
  downtime_reason_machines: DowntimeReasonMachine[];
}
