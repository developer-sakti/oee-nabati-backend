import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Machine } from '@app/machine/machine.entity';
import { type } from 'os';
import { IDowntimeCategory } from './interface/downtime-category.interface';

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
}
