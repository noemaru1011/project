import { Shared } from "./Shared";

export interface CustomerMst extends Shared {
  CustomerID: string;
  CustomerName: string;
  CustomerTel?: string;
  CustomerRepEmail?: string;
  CustomerAccuntEmail?: string;
}
