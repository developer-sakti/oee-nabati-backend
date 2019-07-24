import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { ILine } from './interface/line.interface';
import { Machine } from '@app/machine/machine.entity';
import { type } from 'os';

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

  // @ManyToMany(type => Machine)
  // @JoinTable()
  // machines : Machine[];

}
