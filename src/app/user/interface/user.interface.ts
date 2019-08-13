import { UserRole, UserStatus } from '../user.entity';
import { Role } from '@app/app/role/role.entity';

export interface IUser {
  readonly id?: number;
  readonly firstname?: string;
  readonly lastname?: string;
  readonly username?: string;
  readonly password?: string;
  readonly role?: Role;
  readonly status?: UserStatus;

  readonly roleId?: number;
}
