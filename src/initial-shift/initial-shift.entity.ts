import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { IInitialShift } from './interface/initial-shift.interface';

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
}
