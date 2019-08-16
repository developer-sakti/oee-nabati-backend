import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
    constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) {}

    public async findAll(): Promise<Role[]> {
        return await this.roleRepository.find({
            relations : ['users']
        });
    }
}
