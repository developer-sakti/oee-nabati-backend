import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { IHmi } from './interface/hmi.interface';
import { type } from 'os';
import { Line } from '@app/app/line/line.entity';
import { Machine } from '@app/app/machine/machine.entity';

@Entity()
export class Hmi implements IHmi {
  constructor(data: IHmi) {
    if (!!data) {
      this.id = data.id;
      this.name = data.name;
      this.lines = data.lines;
      this.machines = data.machines;
    }
  }

  @PrimaryGeneratedColumn() public id: number;

  @Column() public name: string;

  @ManyToMany(type => Machine)
  @JoinTable()
  machines : Machine[];
  
  @ManyToMany(type => Line)
  @JoinTable()
  lines : Line[];

}
