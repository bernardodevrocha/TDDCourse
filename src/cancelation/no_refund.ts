import { RefunfRule } from "./refund_rule.interface";

export class NoRefund implements RefunfRule {
  calculateRefund(totalPrice: number):number {
    return totalPrice;
  }
}