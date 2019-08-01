import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { IRules } from './interface/rules.interface';
import { User } from '../user/user.entity';

@Entity()
export class Rules implements IRules {
  constructor(data: IRules) {
    if (!!data) {
      this.id = data.id;
      this.rule = data.rule;
      this.users = data.users;
    }
  }

  @PrimaryGeneratedColumn() public id: number;

  @Column() public rule: string;

  @ManyToMany(type => User)
  @JoinTable()
  users : User[];

}
