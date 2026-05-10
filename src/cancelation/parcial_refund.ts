import { RefunfRule } from "./refund_rule.interface";

export class ParcialRefund implements RefunfRule {
  calculateRefund(totalPrice: number):number {
    return totalPrice * 0.5;
  }
}