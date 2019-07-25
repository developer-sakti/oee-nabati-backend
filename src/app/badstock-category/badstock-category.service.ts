import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BadstockCategory } from './badstock-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BadstockCategoryService {
    constructor(@InjectRepository(BadstockCategory) private readonly badstockCategoryRepository: Repository<BadstockCategory>) {}

    public async findAll(): Promise<BadstockCategory[]> {
        return await this.badstockCategoryRepository.find();
    }
}
