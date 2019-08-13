import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../user/user.entity';
import { IRole } from './interface/role.interface';

@Entity()
export class Role implements IRole {
  constructor(data: IRole) {
    if (!!data) {
      this.id = data.id;
      this.role = data.role;
      this.users = data.users;
    }
  }

  @PrimaryGeneratedColumn() public id: number;

  @Column() public role: string;

  @OneToMany(type => User, user => user.role)
  users : User[];

}
