import { Injectable } from '@nestjs/common';
import { OeeShiftCreateCmd } from './cmd/oee-shift-create.command';
import { OeeShift } from './oee-shift.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Utils } from '@app/shared/utils';
import { OeeShiftDateShiftCmd } from './cmd/oee-shift-date-shift.command';
import { OeeShiftDateLineCmd } from './cmd/oee-shift-date-line.command';
import { AnalysisTimePeriodicCmd } from '../analysis/cmd/analysis-time-periodic.command';
import { Variable } from '@app/shared/variable';

@Injectable()
export class OeeShiftService {
    constructor(@InjectRepository(OeeShift) private repo: Repository<OeeShift>) {}

    public async findOeeSector(params: OeeShiftDateShiftCmd): Promise<any> {
        let data : OeeShift[];
        try {
            data = await this.repo.find({
                where : {
                    date : params.date,
                    shiftId : params.shiftId
                },
                relations : ["shift", "line"]
            })

            let sector_oee = 1;
            let sector_a = 0;
            let sector_p = 0;
            let sector_q = 0;

            if (data.length > 0) {
                data.forEach(element => {
                    sector_oee *= (element.line_oee / 100);
                    sector_a += element.availablity;
                    sector_p += element.performance_rate;
                    sector_q += element.quality_product_rate;
                });

                sector_oee *= 100;
                sector_a /= 4;
                sector_p /= 4;
                sector_q /= 4;

                return {
                    date        : params.date,
                    shift       : data[0].shift.shift_name,
                    sector_oee  : sector_oee,
                    sector_availablity  : sector_a,
                    sector_performance_rate  : sector_p,
                    sector_quality  : sector_q,
                }
            }
        } catch (error) {
            return Utils.EMPTY_ARRAY_RETURN;
        }        
    }

    public async findByLineDateShift(params: OeeShiftDateLineCmd): Promise<any> {
        let data : OeeShift;
        try {
            data = await this.repo.findOne({
                where : {
                    date : params.date,
                    lineId : params.lineId,
                    shiftId : params.shiftId
                },
                relations : ["shift", "line"]
            })
            return data;
        } catch (error) {
            return Utils.NULL_RETURN;
        }        
    }

    public async findByLineDateShiftMany(params: OeeShiftCreateCmd): Promise<any> {
        let data : OeeShift[];
        try {
            data = await this.repo.find({
                where : {
                    date : params.date,
                    lineId : params.lineId,
                    shiftId : params.shiftId
                },
                relations : ["shift", "line"]
            })
            return data;
        } catch (error) {
            return Utils.NULL_RETURN;
        }        
    }

    public async findByDateShift(params: OeeShiftDateShiftCmd): Promise<any> {
        let data : OeeShift[];
        try {
            data = await this.repo.find({
                where : {
                    date : params.date,
                    shiftId : params.shiftId
                },
                relations : ["shift", "line"]
            })
            return data;
        } catch (error) {
            return Utils.EMPTY_ARRAY_RETURN;
        }        
    }

    public async findByDateShiftDetails(line_id : number, params: OeeShiftDateShiftCmd): Promise<any> {
        let data : OeeShift;
        try {
            data = await this.repo.findOne({
                relations : ["shift", "line"],
                where : {
                    date : params.date,
                    shiftId : params.shiftId,
                    lineId : line_id
                },
            })
            return data;
        } catch (error) {
            return Utils.NULL_RETURN;
        }        
    }

    public async findByTimePeriodic(params: AnalysisTimePeriodicCmd): Promise<any> {
        let data: any;
        let rawQuery : string;

        if (params.time_periodic === Variable.TIME_PERIODIC[0]) {
            rawQuery = "SELECT DATE_FORMAT(oee_shift.date, '%Y-%m-%d') as date," +
                " (SUM(oee_shift.line_oee) / COUNT(oee_shift.line_oee)) AS line_oee," +
                " (SUM(oee_shift.availablity) / COUNT(oee_shift.line_oee)) AS availablity," +
                " (SUM(oee_shift.performance_rate) / COUNT(oee_shift.line_oee)) AS performance_rate," +
                " (SUM(oee_shift.quality_product_rate) / COUNT(oee_shift.line_oee)) AS quality_product_rate" +
                " FROM oee_shift" +
                " WHERE oee_shift.date >= ?" +
                " AND oee_shift.date <= ?" +
                " AND oee_shift.lineId = ?" +
                " GROUP BY DATE(oee_shift.date)"
        } else if (params.time_periodic === Variable.TIME_PERIODIC[1]) {
            rawQuery = "SELECT WEEK(oee_shift.date) as week," +
                " (SUM(oee_shift.line_oee) / COUNT(oee_shift.line_oee)) AS line_oee," +
                " (SUM(oee_shift.availablity) / COUNT(oee_shift.line_oee)) AS availablity," +
                " (SUM(oee_shift.performance_rate) / COUNT(oee_shift.line_oee)) AS performance_rate," +
                " (SUM(oee_shift.quality_product_rate) / COUNT(oee_shift.line_oee)) AS quality_product_rate" +
                " FROM oee_shift" +
                " WHERE oee_shift.date >= ?" +
                " AND oee_shift.date <= ?" +
                " AND oee_shift.lineId = ?" +
                " GROUP BY WEEK(oee_shift.date)"
        } else if (params.time_periodic === Variable.TIME_PERIODIC[2]) {
            rawQuery = "SELECT MONTH(oee_shift.date) as month," +
                " (SUM(oee_shift.line_oee) / COUNT(oee_shift.line_oee)) AS line_oee," +
                " (SUM(oee_shift.availablity) / COUNT(oee_shift.line_oee)) AS availablity," +
                " (SUM(oee_shift.performance_rate) / COUNT(oee_shift.line_oee)) AS performance_rate," +
                " (SUM(oee_shift.quality_product_rate) / COUNT(oee_shift.line_oee)) AS quality_product_rate" +
                " FROM oee_shift" +
                " WHERE oee_shift.date >= ?" +
                " AND oee_shift.date <= ?" +
                " AND oee_shift.lineId = ?" +
                " GROUP BY MONTH(oee_shift.date)"
        } else {
            rawQuery = "SELECT YEAR(oee_shift.date) as year," +
                " (SUM(oee_shift.line_oee) / COUNT(oee_shift.line_oee)) AS line_oee," +
                " (SUM(oee_shift.availablity) / COUNT(oee_shift.line_oee)) AS availablity," +
                " (SUM(oee_shift.performance_rate) / COUNT(oee_shift.line_oee)) AS performance_rate," +
                " (SUM(oee_shift.quality_product_rate) / COUNT(oee_shift.line_oee)) AS quality_product_rate" +
                " FROM oee_shift" +
                " WHERE oee_shift.date >= ?" +
                " AND oee_shift.date <= ?" +
                " AND oee_shift.lineId = ?" +
                " GROUP BY YEAR(oee_shift.date)"
        }
        
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

    public async create(body: OeeShiftCreateCmd): Promise<any> {
        try {
            return await this.repo.save(body);
        } catch (error) {
            return Utils.NULL_RETURN;
        }
    }

    public async update(id : number, body: OeeShiftCreateCmd): Promise<any> {
        try {
            return await this.repo.update({
                id : id
            }, {
                total_target_produksi : body.total_target_produksi,

                b_finishgood_shift : body.b_finishgood_shift,
                c_total_qty_shift : body.c_total_qty_shift,
              
                k_total_planned_dt_losses : body.k_total_planned_dt_losses,
                l_loading_hours : body.l_loading_hours,
                m_total_unplanned_dt : body.m_total_unplanned_dt,
                n_operating_hours : body.n_operating_hours,
                o_total_performance_losses : body.o_total_performance_losses,
              
                p_running_time : body.p_running_time,
                
                q_total_defect_losses : body.q_total_defect_losses,
                q_total_rework_losses : body.q_total_rework_losses,
              
                q_total_quality_losses : body.q_total_quality_losses,
              
                r_value_added_hours : body.r_value_added_hours,
              
                availablity : body.availablity,
                performance_rate : body.performance_rate,
                quality_product_rate : body.quality_product_rate,
              
                line_oee : body.line_oee,
              
                l_total_production_time : body.l_total_production_time,
                w2_total_downtime : body.w2_total_downtime,
                w3_number_of_breakdown : body.w3_number_of_breakdown,
                w4_up_time : body.w4_up_time,
              
                mtbf_x1 : body.mtbf_x1,
                mttr_y1 : body.mttr_y1,
                mttf_z1 : body.mttf_z1,
            });
        } catch (error) {
            return Utils.NULL_RETURN;
        }
    }

    public async updateTotalProduksi(id : number, body: OeeShiftCreateCmd): Promise<any> {
        try {
            return await this.repo.update({
                id : id
            }, {
                total_target_produksi : body.total_target_produksi,
                total_standart_ct : body.total_standart_ct,
                total_bottleneck_ct : body.total_bottleneck_ct
            });
        } catch (error) {
            return Utils.NULL_RETURN;
        }
    }

    public async updateReworkKarton(id : number, body: OeeShiftCreateCmd): Promise<any> {
        try {
            return await this.repo.update({
                id : id
            }, {
                e_total_rework_qty_karton : body.e_total_rework_qty_karton
            });
        } catch (error) {
            return Utils.NULL_RETURN;
        }
    }

    public async updateFinishgood(id : number, body: OeeShiftCreateCmd): Promise<any> {
        try {
            console.log("id " + id);
            console.log(body.b_finishgood_shift);
            return await this.repo.update({
                id : id
            }, {
                b_finishgood_shift : body.b_finishgood_shift
            });
        } catch (error) {
            return Utils.NULL_RETURN;
        }
    }

    public async updateDefect(id : number, body: OeeShiftCreateCmd): Promise<any> {
        try {
            console.log("id " + id);
            console.log(body.d_total_defect_qty_karton);
            return await this.repo.update({
                id : id
            }, {
                d_total_defect_qty_karton : body.d_total_defect_qty_karton
            });
        } catch (error) {
            return Utils.NULL_RETURN;
        }
    }

    public async updateDowntime(id : number, body: OeeShiftCreateCmd): Promise<any> {
        try {
            return await this.repo.update({
                id : id
            }, {
                k_total_planned_dt_losses   : body.k_total_planned_dt_losses,
                l_loading_hours             : body.l_loading_hours,
            });
        } catch (error) {
            return Utils.NULL_RETURN;
        }
    }

    public async updateDowntimePlanned(id : number, body: OeeShiftCreateCmd): Promise<any> {
        try {
            return await this.repo.update({
                id : id
            }, {
                k_total_planned_dt_losses   : body.k_total_planned_dt_losses
            });
        } catch (error) {
            return Utils.NULL_RETURN;
        }
    }

    public async updateDowntimeUnPlanned(id : number, body: OeeShiftCreateCmd): Promise<any> {
        try {
            return await this.repo.update({
                id : id
            }, {
                m_total_unplanned_dt   : body.m_total_unplanned_dt
            });
        } catch (error) {
            return Utils.NULL_RETURN;
        }
    }

    public async updateDowntimePerformanceLosses(id : number, body: OeeShiftCreateCmd): Promise<any> {
        try {
            return await this.repo.update({
                id : id
            }, {
                o_total_performance_losses  : body.o_total_performance_losses
            });
        } catch (error) {
            return Utils.NULL_RETURN;
        }
    }
}
