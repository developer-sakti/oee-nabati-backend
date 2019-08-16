import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Downtime } from './downtime.entity';
import { Repository } from 'typeorm';
import { Utils } from '@app/shared/utils';
import { DowntimeGetbylineCmd } from './cmd/downtime-getbyline.command';
import { OeeShiftDateShiftCmd } from '../oee-shift/cmd/oee-shift-date-shift.command';

@Injectable()
export class DowntimeService {
    constructor(@InjectRepository(Downtime) private readonly downtimeRepository: Repository<Downtime>) {}

    public async create(downtime: Downtime): Promise<Downtime> {
        try {
            return await this.downtimeRepository.save(downtime);
        } catch (error) {
            return Utils.NULL_RETURN;
        }
    }

    public async findByLine(params : DowntimeGetbylineCmd): Promise<any> {
        let downtime: Downtime[];
      
        try {
            downtime = await this.downtimeRepository
                                .createQueryBuilder("downtime")
                                .select(['downtime', 'machine', 'downtime_category', 'downtime_reason', 'line', 'shift'])
                                .innerJoin("downtime.machine", "machine")
                                .innerJoin("downtime.downtime_category", "downtime_category")
                                .innerJoin("downtime.downtime_reason", "downtime_reason")
                                .innerJoin("downtime.line", "line")
                                .innerJoin("downtime.shift", "shift")
                                .andWhere("line.id = :value1", {value1 : params.line_id})
                                .orderBy("downtime.created_at", "DESC")
                                .limit(20)
                                .getMany();
        } catch (error) {}

        if (!downtime) {
            return Utils.NULL_RETURN;
        }
        return downtime;
    }



    public async findByDateShiftLine(line_id : number, params : OeeShiftDateShiftCmd): Promise<any> {
        let downtime: Downtime[];
      
        try {
            downtime = await this.downtimeRepository
                                .createQueryBuilder("downtime")
                                .select(['downtime', 'machine', 'downtime_category', 'downtime_reason', 'line', 'shift'])
                                .innerJoin("downtime.machine", "machine")
                                .innerJoin("downtime.downtime_category", "downtime_category")
                                .innerJoin("downtime.downtime_reason", "downtime_reason")
                                .innerJoin("downtime.line", "line")
                                .innerJoin("downtime.shift", "shift")
                                .andWhere("downtime.date = :value1", {value1 : params.date})
                                .andWhere("shift.id = :value2", {value2 : params.shiftId})
                                .andWhere("line.id = :value3", {value3 : line_id})
                                .orderBy("downtime.created_at", "DESC")
                                .limit(20)
                                .getMany();
        } catch (error) {}

        if (!downtime) {
            return Utils.NULL_RETURN;
        }
        return downtime;
    }

    public async findByCategory(category_id : number, params : DowntimeGetbylineCmd): Promise<any> {
        let downtime: Downtime[];
      
        try {
            downtime = await this.downtimeRepository
                                .createQueryBuilder("downtime")
                                .select(['downtime', 'machine', 'downtime_category', 'downtime_reason', 'line', 'shift'])
                                .innerJoin("downtime.machine", "machine")
                                .innerJoin("downtime.downtime_category", "downtime_category")
                                .innerJoin("downtime.downtime_reason", "downtime_reason")
                                .innerJoin("downtime.line", "line")
                                .innerJoin("downtime.shift", "shift")
                                .andWhere("line.id = :value1", {value1 : params.line_id})
                                .andWhere("downtime_category.id = :value2", {value2 : category_id})
                                .orderBy("downtime.created_at", "DESC")
                                .limit(20)
                                .getMany();
        } catch (error) {}

        if (!downtime) {
            return Utils.NULL_RETURN;
        }
        return downtime;
    }
}
