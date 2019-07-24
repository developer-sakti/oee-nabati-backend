import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { IMachine } from './interface/machine.interface';

@Entity()
export class Machine implements IMachine{
  constructor(data: IMachine) {
    if (!!data) {
      this.id = data.id;
      this.name = data.name;
      this.hmi_id = data.hmi_id;
    }
  }

  @PrimaryGeneratedColumn() public id: number;

  @Column() public name: string;

  @Column() public hmi_id: number;
}
