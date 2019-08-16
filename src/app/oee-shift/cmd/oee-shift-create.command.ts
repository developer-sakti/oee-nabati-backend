import { ApiModelProperty } from '@nestjs/swagger';

export class OeeShiftCreateCmd {
  @ApiModelProperty() shiftId: number;
  @ApiModelProperty() lineId: number;
  @ApiModelProperty() date: string;

  @ApiModelProperty() total_target_produksi: number;
  @ApiModelProperty() total_standart_ct: number;
  @ApiModelProperty() total_bottleneck_ct: number;

  @ApiModelProperty() total_pieces_to_target: number;

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
}
