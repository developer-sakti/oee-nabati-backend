import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Downtime } from './downtime.entity';
import { Repository } from 'typeorm';
import { Utils } from '@app/shared/utils';
import { DowntimeGetbylineCmd } from './cmd/downtime-getbyline.command';
import { OeeShiftDateShiftCmd } from '../oee-shift/cmd/oee-shift-date-shift.command';
import { Variable } from '@app/shared/variable';
import { AnalysisTimePeriodicCmd } from '../analysis/cmd/analysis-time-periodic.command';
import { DowntimeGetbylineShiftDateCmd } from './cmd/downtime-getbyline-shift-date.command';

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

    public async findByDateShiftLine(line_id : number, params :  OeeShiftDateShiftCmd): Promise<any> {
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

    public async findByCategoryForReport(category_id : number, params : DowntimeGetbylineShiftDateCmd ): Promise<any> {
        let downtime: any;
        let rawQuery = "SELECT @no := @no + 1 n," +
            " DATE_FORMAT(a.created_at, '%Y-%m-%d') as submit_date," +
            " a.date," +
            " b.category," +
            " c.reason," +
            " a.duration" +
            " FROM downtime a, downtime_category b, downtime_reason c, (SELECT @no := 0) n" +
            " WHERE a.downtimeCategoryId = b.id" +
            " AND a.downtimeReasonId = c.id" +
            " AND a.downtimeCategoryId = ?" +
            " AND a.shiftId = ?" +
            " AND a.lineId = ?" +
            " AND a.date >= ?" +
            " AND a.date <= ?" + 
            " ORDER BY a.date ASC"
      
        try {
            downtime = await this.downtimeRepository.query(rawQuery,
                [category_id, params.shift_id, params.line_id, params.from_date, params.to_date]);
        } catch (error) {}

        if (!downtime) {
            return Utils.EMPTY_ARRAY_RETURN;
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

    public async findDowntimeEvent(line_id : number, params : OeeShiftDateShiftCmd): Promise<any> {
        let data: any;
        let rawQuery = "SELECT b.reason as reason," +
            " c.name as machine," +
            " COUNT(a.duration) AS frequency," +
            " SUM(a.duration) AS duration" +
            " FROM downtime a, downtime_reason b, machine c" +
            " WHERE a.downtimeReasonId = b.id" +
            " AND a.machineId = c.id" +
            " AND a.date = ?" + 
            " AND a.shiftId = ?" +
            " AND a.lineId = ?" +
            " GROUP BY a.downtimeReasonId, a.machineId";
        
        try {
            data = await this.downtimeRepository.query(rawQuery, 
                [params.date, params.shiftId, line_id]);
        } catch (error) {}

        if (!data) {
            console.log("Query error")
            return Utils.EMPTY_ARRAY_RETURN;
        }
        
        return data;
    }

    public async findByLineDateShiftCategory(category_id : number, line_id : number, params : OeeShiftDateShiftCmd): Promise<any> {
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
                                .andWhere("downtime_category.id = :value4", {value4 : category_id})
                                .orderBy("downtime.duration", "DESC")
                                .limit(2)
                                .getMany();
        } catch (error) {}

        if (!downtime) {
            return Utils.NULL_RETURN;
        }
        return downtime;
    }
    
    public async findParetoDowntimeLoss(categoryId : number, params: AnalysisTimePeriodicCmd): Promise<any> {
        let data: any;
        let rawQuery = "SELECT b.reason as reason," +
            " SUM(a.duration) AS duration" +
            " FROM downtime a, downtime_reason b" +
            " WHERE a.downtimeReasonId = b.id" +
            " AND a.date >= ?" +
            " AND a.date <= ?" +
            " AND a.lineId = ?" +
            " AND a.downtimeCategoryId = ?" +
            " GROUP BY a.downtimeReasonId" +
            " ORDER BY a.duration ASC" +
            " LIMIT 6" 
        
        try {
            data = await this.downtimeRepository.query(rawQuery, 
                [params.from_date, params.to_date, params.line_id, categoryId]);
        } catch (error) {}

        if (!data) {
            console.log("Query error")
            return Utils.EMPTY_ARRAY_RETURN;
        }
        
        return data;      
    }

    public async getStatisticTimePeriodic(categoryId : number, params: AnalysisTimePeriodicCmd): Promise<any> {
        let data: any;
        let rawQuery = "SELECT COUNT(a.duration) AS total_accumulation," +
            " SUM(a.duration) AS total_time_accumulation" +
            " FROM downtime a" +
            " WHERE a.date >= ?" +
            " AND a.date <= ?" +
            " AND a.lineId = ?" +
            " AND a.downtimeCategoryId = ?"
        
        try {
            data = await this.downtimeRepository.query(rawQuery, 
                [params.from_date, params.to_date, params.line_id, categoryId]);
        } catch (error) {}

        if (!data) {
            console.log("Query error")
            return Utils.EMPTY_ARRAY_RETURN;
        }
        
        return data;      
    }
}
