import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BadstockTimbangan } from './badstock-timbangan.entity';
import { Repository } from 'typeorm';
import { Utils } from '@app/shared/utils';
import { OeeShiftDateShiftCmd } from '../oee-shift/cmd/oee-shift-date-shift.command';
import { OeeShiftDateLineCmd } from '../oee-shift/cmd/oee-shift-date-line.command';
import { AnalysisTimePeriodicCmd } from '../analysis/cmd/analysis-time-periodic.command';
import { BodstockGetbylineShiftDateCmd } from './cmd/badstock-getbyline-shift-date.command';
import { BadstockGetDateCmd } from './cmd/badstock-get-date.command';

@Injectable()
export class BadstockTimbanganService {
    constructor(@InjectRepository(BadstockTimbangan) private readonly repo: Repository<BadstockTimbangan>) {}

    public async findByDateShiftLine(params : OeeShiftDateLineCmd): Promise<any> {
        let data: BadstockTimbangan[];
      
        try {
            data = await this.repo.createQueryBuilder("badstock_timbangan")
                                .select(['badstock_timbangan', 'rencana_produksi', 'machine', 'badstock_category'])
                                .innerJoin("badstock_timbangan.rencana_produksi", "rencana_produksi")
                                .innerJoin("badstock_timbangan.machine", "machine")
                                .innerJoin("badstock_timbangan.badstock_category", "badstock_category")
                                .andWhere("rencana_produksi.date = :value1", {value1 : params.date})
                                .andWhere("rencana_produksi.shiftId = :value2", {value2 : params.shiftId})
                                .andWhere("rencana_produksi.lineId = :value3", {value3 : params.lineId})
                                .getMany();
        } catch (error) {}

        if (!data) {
            return Utils.NULL_RETURN;
        }
        return data;
    }

    public async getHistory(params : BadstockGetDateCmd): Promise<any> {
        let data: BadstockTimbangan[];
      
        try {
            data = await this.repo.createQueryBuilder("badstock_timbangan")
                                .select(['badstock_timbangan', 'rencana_produksi', 'machine', 'badstock_category'])
                                .innerJoin("badstock_timbangan.rencana_produksi", "rencana_produksi")
                                .innerJoin("badstock_timbangan.machine", "machine")
                                .innerJoin("badstock_timbangan.badstock_category", "badstock_category")
                                .andWhere("rencana_produksi.date = :value1", {value1 : params.date})
                                .orderBy("rencana_produksi.date", "DESC")
                                .getMany();
        } catch (error) {}

        if (!data) {
            return Utils.EMPTY_ARRAY_RETURN;
        }
        return data;
    }
    
    public async create(badstockTimbangan: BadstockTimbangan): Promise<BadstockTimbangan> {
        try {
            return await this.repo.save(badstockTimbangan);
        } catch (error) {
            return Utils.NULL_RETURN;
        }
    }

    public async findParetoQualityLoss(params: AnalysisTimePeriodicCmd): Promise<any> {
        let data: any;
        let rawQuery = "SELECT b.category as category," +
            " SUM(a.weight) as karton" +
            " FROM badstock_timbangan a, badstock_category b, rencana_produksi c" +
            " WHERE a.badstockCategoryId = b.id" +
            " AND a.rencanaProduksiId = c.id" +
            " AND c.date >= ?" +
            " AND c.date <= ?" +
            " AND c.lineId = ?" +
            " GROUP BY a.badstockCategoryId" +
            " ORDER BY karton DESC" +
            " LIMIT 6" 
        
        try {
            data = await this.repo.query(rawQuery, 
                [params.from_date, params.to_date, params.line_id]);
        } catch (error) {}

        if (!data) {
            console.log("Query error")
            return Utils.EMPTY_ARRAY_RETURN;
        }
        
        return data;      
    }

    public async getStatisticTimePeriodic(params: AnalysisTimePeriodicCmd): Promise<any> {
        let data: any;
        let rawQuery = "SELECT COUNT(a.weight) as accumulation," +
            " SUM(a.weight) as karton" +
            " FROM badstock_timbangan a, rencana_produksi c" +
            " WHERE a.rencanaProduksiId = c.id" +
            " AND c.date >= ?" +
            " AND c.date <= ?" +
            " AND c.lineId = ?"
        
        try {
            data = await this.repo.query(rawQuery, 
                [params.from_date, params.to_date, params.line_id]);
        } catch (error) {}

        if (!data) {
            console.log("Query error")
            return Utils.EMPTY_ARRAY_RETURN;
        }
        
        return data;      
    }

    public async getForReport(params: BodstockGetbylineShiftDateCmd): Promise<any> {
        let data: any;
        let rawQuery = "SELECT @no := @no + 1 as n," +
            " DATE_FORMAT(a.created_at, '%Y-%m-%d') as submit_date," +
            " c.date," +
            " d.name as machine," +
            " b.category as reason," +
            " a.weight_kg as kg," +
            " a.weight as karton" +
            " FROM badstock_timbangan a, badstock_category b, rencana_produksi c, machine d, (SELECT @no := 0) n" +
            " WHERE a.badstockCategoryId = b.id" +
            " AND a.rencanaProduksiId = c.id" +             
            " AND a.machineId = d.id" +
            " AND c.date = ?" +
            " AND c.lineId = ?" +            
            " AND c.shiftId = ?" +
            " ORDER BY c.date DESC"
        
        try {
            data = await this.repo.query(rawQuery, 
                [params.date, params.line_id, params.shift_id]);
        } catch (error) {}

        if (!data) {
            console.log("Query error")
            return Utils.EMPTY_ARRAY_RETURN;
        }
        
        return data;      
    }

    public async getForAllReport(params: BodstockGetbylineShiftDateCmd): Promise<any> {
        let data: any;
        let rawQuery = "SELECT @no := @no + 1 as n," +
            " DATE_FORMAT(a.created_at, '%Y-%m-%d') as submit_date," +
            " c.date," +
            " d.name as machine," +
            " b.category as reason," +
            " a.weight_kg as kg," +
            " a.weight as karton" +
            " FROM badstock_timbangan a, badstock_category b, rencana_produksi c, machine d, (SELECT @no := 0) n" +
            " WHERE a.badstockCategoryId = b.id" +
            " AND a.rencanaProduksiId = c.id" +             
            " AND a.machineId = d.id" +
            " AND c.date >= ?" +
            " AND c.date <= ?" +
            " AND c.lineId = ?" +         
            " ORDER BY c.date DESC"
        
        try {
            data = await this.repo.query(rawQuery, 
                [params.from_date, params.to_date, params.line_id, params.shift_id]);
        } catch (error) {}

        if (!data) {
            console.log("Query error")
            return Utils.EMPTY_ARRAY_RETURN;
        }
        
        return data;      
    }
}
