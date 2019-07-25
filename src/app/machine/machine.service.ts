import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Machine } from './machine.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MachineService {
    constructor(@InjectRepository(Machine) private readonly machineRepository: Repository<Machine>) {}

    public async findAll(): Promise<Machine[]> {
        return await this.machineRepository.find();
    }
}
