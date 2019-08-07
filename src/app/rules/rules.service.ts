import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rules } from './rules.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RulesService {
    constructor(@InjectRepository(Rules) private readonly rulesRepository: Repository<Rules>) {}

    public async findAll(): Promise<Rules[]> {
        return await this.rulesRepository.find({
            relations : ['users']
        });
    }
}
