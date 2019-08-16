import { Injectable } from '@nestjs/common';
import { OeeShiftCreateCmd } from './cmd/oee-shift-create.command';
import { OeeShift } from './oee-shift.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Utils } from '@app/shared/utils';
import { OeeShiftDateShiftCmd } from './cmd/oee-shift-date-shift.command';

@Injectable()
export class OeeShiftService {
    constructor(@InjectRepository(OeeShift) private repo: Repository<OeeShift>) {}

    public async findByLineDateShift(params: OeeShiftCreateCmd): Promise<any> {
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
