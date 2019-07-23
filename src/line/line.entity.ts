import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { ILine } from './interface/line.interface';
import { type } from 'os';
import { Hmi } from '@app/hmi/hmi.entity';

@Entity()
export class Line implements ILine{
  constructor(data: ILine) {
    if (!!data) {
      this.id = data.id;
      this.name = data.name;
    }
  }

  @PrimaryGeneratedColumn() public id: number;

  @Column() public name: string;
}
