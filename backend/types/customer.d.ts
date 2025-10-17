import { common } from "./common";

export interface customer extends common {
  customerid: string;
  customername: string;
  customertel: string;
  customerrepemail: string;
  customeraccuntemail: string;
}
