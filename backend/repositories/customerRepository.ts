import { pool } from "../db";

export interface Customer {
  customerid: string;
  customername: string;
  customertel?: string;
  customerrepemail?: string;
  customeraccuntemail?: string;
}

// 一覧取得
export async function getCustomers(): Promise<Customer[]> {
  const result = await pool.query(
    "SELECT * FROM CustomerMst ORDER BY CustomerName"
  );
  return result.rows;
}

// 1件取得
export async function getCustomerById(id: string): Promise<Customer | null> {
  const result = await pool.query(
    "SELECT * FROM CustomerMst WHERE CustomerID = $1",
    [id]
  );
  return result.rows[0] || null;
}

// 登録
export async function createCustomer(
  data: Omit<Customer, "customerid">
): Promise<Customer> {
  const { customername, customertel, customerrepemail, customeraccuntemail } =
    data;
  const result = await pool.query(
    `INSERT INTO CustomerMst 
      (CustomerName, CustomerTel, CustomerRepEmail, CustomerAccuntEmail) 
     VALUES ($1, $2, $3, $4) 
     RETURNING *`,
    [customername, customertel, customerrepemail, customeraccuntemail]
  );
  return result.rows[0];
}

// 更新
export async function updateCustomer(
  id: string,
  data: Partial<Omit<Customer, "customerid">>
): Promise<Customer | null> {
  const { customername, customertel, customerrepemail, customeraccuntemail } =
    data;
  const result = await pool.query(
    `UPDATE CustomerMst SET
      CustomerName = COALESCE($1, CustomerName),
      CustomerTel = COALESCE($2, CustomerTel),
      CustomerRepEmail = COALESCE($3, CustomerRepEmail),
      CustomerAccuntEmail = COALESCE($4, CustomerAccuntEmail)
     WHERE CustomerID = $5
     RETURNING *`,
    [customername, customertel, customerrepemail, customeraccuntemail, id]
  );
  return result.rows[0] || null;
}

// 削除
export async function deleteCustomer(id: string): Promise<boolean> {
  const result = await pool.query(
    "DELETE FROM CustomerMst WHERE CustomerID = $1",
    [id]
  );
  return (result.rowCount ?? 0) > 0;
}
