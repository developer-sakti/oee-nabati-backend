import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IHmi } from './interface/hmi.interface';

@Entity()
export class Hmi implements IHmi {
  constructor(data: IHmi) {
    if (!!data) {
      this.id = data.id;
      this.name = data.name;
    }
  }

  @PrimaryGeneratedColumn() public id: number;

  @Column() public name: string;
}
