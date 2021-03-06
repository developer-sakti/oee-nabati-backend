import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { ILine } from './interface/line.interface';
import { Machine } from '@app/app/machine/machine.entity';
import { type } from 'os';
import { RencanaProduksi } from '@app/app/rencana-produksi/rencana-produksi.entity';
import { Downtime } from '../downtime/downtime.entity';
import { OeeShift } from '../oee-shift/oee-shift.entity';

@Entity()
export class Line implements ILine{
  constructor(data: ILine) {
    if (!!data) {
      this.id = data.id;
      this.name = data.name;
      // this.machines = data.machines;
    }
  }

  @PrimaryGeneratedColumn() public id: number;

  @Column() public name: string;

  @OneToMany(type => RencanaProduksi, rencana_produksi => rencana_produksi.line)
  public rencana_produksi : RencanaProduksi;

  @OneToMany(type => Downtime, downtime => downtime.line)
  public downtime : Downtime;

  @OneToMany(type => OeeShift, oee_shift => oee_shift.line)
  public oee_shift : OeeShift;

}
