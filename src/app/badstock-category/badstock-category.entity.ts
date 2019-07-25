import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Machine } from '@app/app/machine/machine.entity';
import { type } from 'os';
import { DowntimeReasonMachine } from '@app/app/downtime-reason-machine/downtime-reason-machine.entity';
import { Downtime } from '../downtime/downtime.entity';
import { IBadstockCategory } from './interface/badstock-category.interface';
import { BadstockTimbangan } from '../badstock-timbangan/badstock-timbangan.entity';

@Entity()
export class BadstockCategory implements IBadstockCategory{
  constructor(data: IBadstockCategory) {
    if (!!data) {
      this.id = data.id;
      this.category = data.category;
    }
  }

  @PrimaryGeneratedColumn() public id: number;

  @Column() public category: string;

  @OneToMany(type => BadstockTimbangan, badstock_timbangan => badstock_timbangan.badstock_category)
  public badstock_timbangan: BadstockTimbangan;
}
