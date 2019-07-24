import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { IMachine } from './interface/machine.interface';
import { DowntimeReasonMachine } from '@app/downtime-reason-machine/downtime-reason-machine.entity';

@Entity()
export class Machine implements IMachine{
  constructor(data: IMachine) {
    if (!!data) {
      this.id = data.id;
      this.name = data.name;
      this.hmi_id = data.hmi_id;
    }
  }

  @PrimaryGeneratedColumn() public id: number;

  @Column() public name: string;

  @Column() public hmi_id: number;

  @OneToMany(type => DowntimeReasonMachine, downtime_reason_machine => downtime_reason_machine.machine)
  downtime_reason_machines: DowntimeReasonMachine[];
}
