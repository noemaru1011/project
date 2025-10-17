import { pool } from "../db";
import { customer } from "../types/customer";

// 一覧取得
export async function getCustomers(): Promise<customer[]> {
  const result = await pool.query(
    "SELECT * FROM CustomerMst ORDER BY CustomerName"
  );
  return result.rows;
}

// 1件取得
export async function getCustomerById(id: string): Promise<customer | null> {
  const result = await pool.query(
    "SELECT * FROM CustomerMst WHERE CustomerID = $1",
    [id]
  );
  return result.rows[0] || null;
}

// 登録
export async function createCustomer(
  data: Omit<customer, "customerid">
): Promise<customer> {
  const {
    customername,
    customertel,
    customerrepemail,
    customeraccuntemail,
    createdate,
    creareworker,
    updatedate,
    updateworker,
  } = data;
  const result = await pool.query(
    `INSERT INTO CustomerMst 
      (CustomerName, CustomerTel, CustomerRepEmail, CustomerAccuntEmail, CreateDate, CreateWorker, UpdateDate, UpdateWorker) 
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
     RETURNING *`,
    [
      customername,
      customertel,
      customerrepemail,
      customeraccuntemail,
      createdate,
      creareworker,
      updatedate,
      updateworker,
    ]
  );
  return result.rows[0];
}

// 更新
export async function updateCustomer(
  id: string,
  data: Partial<Omit<customer, "customerid">>
): Promise<customer | null> {
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
