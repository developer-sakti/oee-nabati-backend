import * as bcrypt from 'bcrypt';

import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { IUser } from './interface/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  public async create(user: User): Promise<User> {
    user.password = await bcrypt.hash(user.password, 10);
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async findOne(params: DeepPartial<User>): Promise<User> {
    let user: User;
    try {
      user = await this.userRepository.findOne(params);
    } catch (error) {}
    if (!user) {
      throw new NotFoundException(`User with ${JSON.stringify(params)} does not exist`);
    }
    return user;
  }

  public async update(id: number, payload: User, password?: string): Promise<User> {
    const user = await this.findOne({ id });
    let isPasswordValid: boolean;
    try {
      isPasswordValid = await bcrypt.compare(payload.password, user.password);
    } catch (error) {
      throw new InternalServerErrorException(`An error occured during password comparison: ${error.toString()}`);
    }

    if (isPasswordValid === false) {
      throw new UnauthorizedException(`Invalid password for user ${user.firstname} ${user.lastname} (${user.username}).`);
    }
    
    let encryptedPassword: string;
    if (!!password && password.length) {
      try {
        encryptedPassword = await bcrypt.hash(password, 10);
      } catch (error) {
        throw new InternalServerErrorException(`An error occured during password hashing: ${error.toString()}`);
      }
    }
    
    try {
      delete user.firstname;
      delete user.lastname;
      delete user.username;
      delete user.role;
      delete user.status;

      console.log(user);

      let updated = Object.assign(payload, user);
      console.log(updated);

      return this.userRepository.save(!!encryptedPassword ? { ...updated, password: encryptedPassword } : updated);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  public async delete(params: DeepPartial<User>): Promise<User> {
    const user = await this.findOne(params);
    try {
      await this.userRepository.remove(user);
      return user;
    } catch (error) {
      throw new NotFoundException(`User with ${params.toString()} not found.`);
    }
  }
}
