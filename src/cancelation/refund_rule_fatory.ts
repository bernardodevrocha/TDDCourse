import { FullRefund } from "./full_refund";
import { NoRefund } from "./no_refund";
import { ParcialRefund } from "./parcial_refund";
import { RefundRule } from "./refund_rule.interface";

export class refundRuleFactory {
  static getRefundRule(daysUntilCheckIn: number): RefundRule {
    if(daysUntilCheckIn > 7){
      return new FullRefund();
    }else if (daysUntilCheckIn >= 1){
      return new ParcialRefund();
    }
    return new NoRefund();
  }
}