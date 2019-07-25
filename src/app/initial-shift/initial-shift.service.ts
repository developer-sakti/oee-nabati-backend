import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InitialShift } from './initial-shift.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InitialShiftService {
    constructor(@InjectRepository(InitialShift) private readonly initialShiftRepository: Repository<InitialShift>) {}

    public async findAll(): Promise<InitialShift[]> {
        return await this.initialShiftRepository.find();
    }
}
