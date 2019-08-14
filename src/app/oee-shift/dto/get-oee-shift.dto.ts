import { ApiModelProperty } from '@nestjs/swagger';
import { InitialShift } from '@app/app/initial-shift/initial-shift.entity';
import { Line } from '@app/app/line/line.entity';
import { User } from '@app/app/user/user.entity';
import { InitialSku } from '@app/app/initial-sku/initial-sku.entity';
import { IOeeShift } from '../interface/oee-shift.interface';

export class GetOeeShiftDto {
  constructor(data: IOeeShift) {
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
    this.mttf_z1 = data.mttf_z1;

    this.created_at = data.created_at;
  }
  @ApiModelProperty() id: number;

  @ApiModelProperty() shift: InitialShift;
  @ApiModelProperty() line: Line;

  @ApiModelProperty() shiftId: number;
  @ApiModelProperty() lineId: number;
  
  @ApiModelProperty() total_target_produksi: number;
  @ApiModelProperty() date: string;

  @ApiModelProperty() b_finishgood_shift : number;
  @ApiModelProperty() c_total_qty_shift : number;

  @ApiModelProperty() k_total_planned_dt_losses : number;
  @ApiModelProperty() l_loading_hours : number;
  @ApiModelProperty() m_total_unplanned_dt : number;
  @ApiModelProperty() n_operating_hours : number;
  @ApiModelProperty() o_total_performance_losses : number;

  @ApiModelProperty() p_running_time : number;
  
  @ApiModelProperty() q_total_defect_losses : number;
  @ApiModelProperty() q_total_rework_losses : number;

  @ApiModelProperty() q_total_quality_losses : number;

  @ApiModelProperty() r_value_added_hours : number;

  @ApiModelProperty() availablity : number;
  @ApiModelProperty() performance_rate : number;
  @ApiModelProperty() quality_product_rate : number;

  @ApiModelProperty() line_oee : number;

  @ApiModelProperty() l_total_production_time : number;
  @ApiModelProperty() w2_total_downtime : number;
  @ApiModelProperty() w3_number_of_breakdown : number;
  @ApiModelProperty() w4_up_time : number;

  @ApiModelProperty() mtbf_x1 : number;
  @ApiModelProperty() mttr_y1 : number;
  @ApiModelProperty() mttf_z1 : number;

  @ApiModelProperty() created_at: string;
}
