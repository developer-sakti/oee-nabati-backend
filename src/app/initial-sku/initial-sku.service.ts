import { Injectable } from '@nestjs/common';
import { InitialSku } from './initial-sku.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Utils } from '@app/shared/utils';

@Injectable()
export class InitialSkuService extends TypeOrmCrudService<InitialSku>{
    constructor(@InjectRepository(InitialSku) repo, @InjectRepository(InitialSku) private readonly initialSkuRepository: Repository<InitialSku>) {
        super(repo);
    }

    public async findAll(): Promise<InitialSku[]> {
        return await this.initialSkuRepository.find();
    }

    public async findById(id : number): Promise<any> {
        let data: InitialSku;
      
        try {
            data = await this.initialSkuRepository.findOne(id);
        } catch (error) {}

        if (!data) {
            return Utils.NULL_RETURN;
        }
        return data;
    }

    public async create(initialSku: InitialSku): Promise<InitialSku> {
        try {
            return await this.initialSkuRepository.save(initialSku);
        } catch (error) {
            return Utils.NULL_RETURN;
        }
    }
}
