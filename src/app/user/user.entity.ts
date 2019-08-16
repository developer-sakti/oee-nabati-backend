import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

import { IUser } from './interface/user.interface';
import { RencanaProduksi } from '@app/app/rencana-produksi/rencana-produksi.entity';

import * as bcrypt from "bcrypt";
import { Role } from '../role/role.entity';

export enum UserRole {
  ADMIN = 1,
  USER = 2,
}

export enum UserStatus {
  PENDING = 'pending',
  CONFIRM = 'confirm',
}

@Entity()
export class User implements IUser {
  constructor(data: IUser) {
    if (!!data) {
      this.id = data.id;
      this.firstname = data.firstname;
      this.lastname = data.lastname;
      this.username = data.username;
      this.password = data.password;
      this.roleId = data.roleId;
    }
  }

  @PrimaryGeneratedColumn() public id: number;

  @Column() public firstname: string;

  @Column() public lastname: string;

  @Column() public username: string;

  @Column() public password: string;

  @Column() public status: UserStatus;

  @Column({  type: "int", nullable: true }) 
  public roleId: number;

  @OneToMany(type => RencanaProduksi, rencana_produksi => rencana_produksi.supervisor)
  public rencana_produksi : RencanaProduksi;

  @ManyToOne(type => Role, role => role.users)
  public role: Role;


  async checkPasswordIsValid(plain_password : string) : Promise<boolean> {
    return bcrypt.compare(plain_password, this.password);
  }
}
