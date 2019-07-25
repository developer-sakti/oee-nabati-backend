import { UserRole, UserStatus } from '../user.entity';

export interface IUser {
  readonly id?: number;
  readonly firstname?: string;
  readonly lastname?: string;
  readonly username?: string;
  readonly password?: string;
  readonly role?: UserRole;
  readonly status?: UserStatus;
}
