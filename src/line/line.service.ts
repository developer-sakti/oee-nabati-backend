import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Line } from './line.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LineService {
    constructor(@InjectRepository(Line) private readonly lineRepository: Repository<Line>) {}

    public async findAll(): Promise<Line[]> {
        return await this.lineRepository.find();
    }
}
