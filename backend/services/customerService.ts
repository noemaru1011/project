import { pool } from "../db";
import { SharedService } from "./sharedService";
import { CustomerMst } from "../types/customer";

class CustomerService extends SharedService<CustomerMst> {
  constructor() {
    super(pool, "CustomerMst", "CustomerID");
  }
}

export const customerService = new CustomerService();
