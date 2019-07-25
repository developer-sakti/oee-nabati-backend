import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { IInitialShift } from './interface/initial-shift.interface';
import { type } from 'os';
import { RencanaProduksi } from '@app/app/rencana-produksi/rencana-produksi.entity';

@Entity()
export class InitialShift implements IInitialShift{
  constructor(data: IInitialShift) {
    if (!!data) {
      this.id = data.id;
      this.shift_name = data.shift_name;
      this.shift_operated = data.shift_operated;
      this.start_time = data.start_time;
      this.end_time = data.end_time;
    }
  }

  @PrimaryGeneratedColumn() public id: number;
  
  @Column() public shift_name?: string;
  @Column() public shift_operated?: number;
  @Column({ type: "time"}) public start_time?: string;
  @Column({ type: "time"}) public end_time?: string;

  @OneToMany(type => RencanaProduksi, rencana_produksi => rencana_produksi.shift)
  public rencana_produksi : RencanaProduksi;
}
