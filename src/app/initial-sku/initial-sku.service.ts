import { Injectable } from '@nestjs/common';
import { InitialSku } from './initial-sku.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InitialSkuService {
    constructor(@InjectRepository(InitialSku) private readonly initialShiftRepository: Repository<InitialSku>) {}

    public async findAll(): Promise<InitialSku[]> {
        return await this.initialShiftRepository.find();
    }
}
