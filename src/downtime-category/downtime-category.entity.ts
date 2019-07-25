import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Machine } from '@app/machine/machine.entity';
import { type } from 'os';
import { IDowntimeCategory } from './interface/downtime-category.interface';
import { DowntimeReasonMachine } from '@app/downtime-reason-machine/downtime-reason-machine.entity';

@Entity()
export class DowntimeCategory implements IDowntimeCategory{
  constructor(data: IDowntimeCategory) {
    if (!!data) {
      this.id = data.id;
      this.category = data.category;
    }
  }

  @PrimaryGeneratedColumn() public id: number;

  @Column() public category: string;

  @OneToMany(type => DowntimeReasonMachine, downtime_reason_machine => downtime_reason_machine.downtime_category)
  public downtime_reason_machines: DowntimeReasonMachine[];
}
