import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { IMachine } from './interface/machine.interface';
import { DowntimeReasonMachine } from '@app/app/downtime-reason-machine/downtime-reason-machine.entity';
import { Downtime } from '../downtime/downtime.entity';
import { BadstockTimbangan } from '../badstock-timbangan/badstock-timbangan.entity';

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

  @OneToMany(type => Downtime, downtime => downtime.machine)
  public downtime: Downtime;

  @OneToMany(type => BadstockTimbangan, badstock_timbangan => badstock_timbangan.machine)
  public badstock_timbangan: BadstockTimbangan;
}
