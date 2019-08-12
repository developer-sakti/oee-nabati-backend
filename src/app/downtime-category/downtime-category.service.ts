import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DowntimeCategory } from './downtime-category.entity';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class DowntimeCategoryService extends TypeOrmCrudService<DowntimeCategory>{
    constructor(@InjectRepository(DowntimeCategory) repo, @InjectRepository(DowntimeCategory) private readonly downtimeCategoryRepository: Repository<DowntimeCategory>) {
        super(repo)
    }

    public async findAll(): Promise<DowntimeCategory[]> {
        return await this.downtimeCategoryRepository.find();
    }
}
