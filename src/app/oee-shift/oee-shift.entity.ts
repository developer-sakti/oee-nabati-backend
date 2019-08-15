import { IOeeShift } from "./interface/oee-shift.interface";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Line } from "../line/line.entity";
import { InitialShift } from "../initial-shift/initial-shift.entity";

@Entity()
export class OeeShift implements IOeeShift{
    constructor(data : IOeeShift) {
        if (!!data) {

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
