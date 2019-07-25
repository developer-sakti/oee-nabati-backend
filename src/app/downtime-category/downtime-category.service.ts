import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DowntimeCategory } from './downtime-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DowntimeCategoryService {
    constructor(@InjectRepository(DowntimeCategory) private readonly downtimeCategoryRepository: Repository<DowntimeCategory>) {}

    public async findAll(): Promise<DowntimeCategory[]> {
        return await this.downtimeCategoryRepository.find();
    }
}
