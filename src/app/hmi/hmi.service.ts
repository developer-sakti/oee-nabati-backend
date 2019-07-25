import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hmi } from './hmi.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HmiService {
    constructor(@InjectRepository(Hmi) private readonly hmiRepository: Repository<Hmi>) {}

    public async findAll(): Promise<Hmi[]> {
        return await this.hmiRepository.find({
            relations : ['lines', 'machines']
        });
    }
}
