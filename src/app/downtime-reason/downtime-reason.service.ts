import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DowntimeReason } from './downtime-reason.entity';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class DowntimeReasonService extends TypeOrmCrudService<DowntimeReason> {
    constructor(@InjectRepository(DowntimeReason) repo, @InjectRepository(DowntimeReason) private readonly downtimeReasonRepository: Repository<DowntimeReason>) {
        super(repo)
    }

    public async findAll(): Promise<DowntimeReason[]> {
        return await this.downtimeReasonRepository.find();
    }
}
