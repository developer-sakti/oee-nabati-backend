import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { IInitialSku } from './interface/initial-sku.interface';

@Entity()
export class InitialSku implements IInitialSku{
  constructor(data: IInitialSku) {
    if (!!data) {
      this.id = data.id;
      this.code = data.code;
      this.name = data.name;
    }
  }

  @PrimaryGeneratedColumn() public id: number;
  
  @Column() public code?: string;
  @Column() public name?: string;
}
