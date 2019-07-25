import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { IUser } from './interface/user.interface';
import { RencanaProduksi } from '@app/app/rencana-produksi/rencana-produksi.entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
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
      this.role = data.role;
    }
  }

  @PrimaryGeneratedColumn() public id: number;

  @Column() public firstname: string;

  @Column() public lastname: string;

  @Column() public username: string;

  @Column() public password: string;

  @Column() public role: UserRole;

  @Column() public status: UserStatus;

  @OneToMany(type => RencanaProduksi, rencana_produksi => rencana_produksi.supervisor)
  public rencana_produksi : RencanaProduksi;
}
