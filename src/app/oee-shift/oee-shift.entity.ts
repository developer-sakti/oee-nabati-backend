import { IOeeShift } from "./interface/oee-shift.interface";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, AfterUpdate } from "typeorm";
import { Line } from "../line/line.entity";
import { InitialShift } from "../initial-shift/initial-shift.entity";
import { async } from "rxjs/internal/scheduler/async";

@Entity()
export class OeeShift implements IOeeShift{
    constructor(data : IOeeShift) {
        if (!!data) {
            this.id = data.id;

            this.shift = data.shift;
            this.line = data.line;

            this.shiftId = data.shiftId;
            this.lineId = data.lineId;

            this.total_target_produksi = data.total_target_produksi;
            this.date = data.date;

            this.b_finishgood_shift = data.b_finishgood_shift;
            this.c_total_qty_shift = data.c_total_qty_shift;

            this.k_total_planned_dt_losses = data.k_total_planned_dt_losses;
            this.l_loading_hours = data.l_loading_hours;
            this.m_total_unplanned_dt = data.m_total_unplanned_dt;
            this.n_operating_hours = data.n_operating_hours;
            this.o_total_performance_losses = data.o_total_performance_losses;

            this.p_running_time = data.p_running_time;
            
            this.q_total_defect_losses = data.q_total_defect_losses;
            this.q_total_rework_losses = data.q_total_rework_losses;

            this.q_total_quality_losses = data.q_total_quality_losses;

            this.r_value_added_hours = data.r_value_added_hours;

            this.availablity = data.availablity;
            this.performance_rate = data.performance_rate;
            this.quality_product_rate = data.quality_product_rate;

            this.line_oee = data.line_oee;

            this.l_total_production_time = data.l_total_production_time;
            this.w2_total_downtime = data.w2_total_downtime;
            this.w3_number_of_breakdown = data.w3_number_of_breakdown;
            this.w4_up_time = data.w4_up_time;

            this.mtbf_x1 = data.mtbf_x1;
            this.mttr_y1 = data.mttr_y1;
            this.mttf_z1 = data.mttr_y1;

            this.created_at = data.created_at;
            this.updated_at = data.updated_at;
            this.deleted_at = data.deleted_at;
        }
    }

    @PrimaryGeneratedColumn() public id: number;

    @Column({  type: "int", nullable: true })
    shiftId: number;
    @Column({  type: "int", nullable: true })
    lineId: number;

    @Column({ type : "date" }) public date: string;
    @Column({ type: "float", default : 0 }) public total_target_produksi: number;

    @Column({  type: "float", default : 0 }) public b_finishgood_shift: number;
    @Column({  type: "float", default : 0 }) public c_total_qty_shift: number;

    @Column({  type: "float", default : 0 }) public k_total_planned_dt_losses: number;
    @Column({  type: "float", default : 0 }) public l_loading_hours: number;
    @Column({  type: "float", default : 0 }) public m_total_unplanned_dt: number;
    @Column({  type: "float", default : 0 }) public n_operating_hours: number;
    @Column({  type: "float", default : 0 }) public o_total_performance_losses: number;

    @Column({  type: "float", default : 0 }) public p_running_time: number;
    
    @Column({  type: "float", default : 0 }) public q_total_defect_losses: number;
    @Column({  type: "float", default : 0 }) public q_total_rework_losses: number;

    @Column({  type: "float", default : 0 }) public q_total_quality_losses: number;

    @Column({  type: "float", default : 0 }) public r_value_added_hours: number;

    @Column({  type: "float", default : 0 }) public availablity: number;
    @Column({  type: "float", default : 0 }) public performance_rate: number;
    @Column({  type: "float", default : 0 }) public quality_product_rate: number;

    @Column({  type: "float", default : 0 }) public line_oee: number;

    @Column({  type: "float", default : 0 }) public l_total_production_time: number;
    @Column({  type: "float", default : 0 }) public w2_total_downtime: number;
    @Column({  type: "float", default : 0 }) public w3_number_of_breakdown: number;
    @Column({  type: "float", default : 0 }) public w4_up_time: number;

    @Column({  type: "float", default : 0 }) public mtbf_x1: number;
    @Column({  type: "float", default : 0 }) public mttr_y1: number;
    @Column({  type: "float", default : 0 }) public mttf_z1: number;

    @Column({ type : "timestamp" }) public created_at: string;
    @Column({ type : "datetime", default : null  }) public updated_at: string;
    @Column({ type : "datetime", default : null }) public deleted_at: string;

    @ManyToOne(type => InitialShift, initial_shift => initial_shift.oee_shift)
    public shift: InitialShift;
    
    @ManyToOne(type => Line, line => line.oee_shift)
    public line: Line;
}
