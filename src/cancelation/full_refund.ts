import { RefunfRule } from "./refund_rule.interface";

export class FullRefund implements RefunfRule {
  calculateRefund(totalPrice: number):number {
    return 0;
  }
}