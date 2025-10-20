export const ROUTES = {
  HOME: "/",

  // 依頼受付
  REQUEST: {
    INDEX: "/Request/Index",
    CREATE: "/Request/Create",
    EDIT: (id: string) => `/Request/Update/${id}`,
    VIEW: (id: string) => `/Request/View/${id}`,
  },

  //見積
  SALE_QUOTE: {
    INDEX: (id: string) => `/SaleQuote/Index/${id}`,
    CREATE: (id: string) => `/SaleQuote/Create/${id}`,
    EDIT: (id: string) => `/SaleQuote/Update/${id}`,
    VIEW: (id: string) => `/SaleQuote/View/${id}`,
    DETAIL_INDEX: (id: string) => `/SaleQuote/Detail/Index/${id}`,
    DETAIL_CREATE: (id: string) => `/SaleQuote/Detail/Create/${id}`,
    DETAIL_EDIT: (id: string) => `/SaleQuote/Detail/Update/${id}`,
    DETAIL_VIEW: (id: string) => `/SaleQuote/Detail/View/${id}`,
  },

  //発注
  SALE_PURCHASE: {
    INDEX: (id: string) => `/SalePurchase/Index/${id}`,
    CREATE: (id: string) => `/SalePurchase/Create/${id}`,
    EDIT: (id: string) => `/SalePurchase/Update/${id}`,
    VIEW: (id: string) => `/SalePurchase/View/${id}`,
    DETAIL_INDEX: (id: string) => `/SalePurchase/Detail/Index/${id}`,
    DETAIL_CREATE: (id: string) => `/SalePurchase/Detail/Create/${id}`,
    DETAIL_EDIT: (id: string) => `/SalePurchase/Detail/Update/${id}`,
    DETAIL_VIEW: (id: string) => `/SalePurchase/Detail/View/${id}`,
  },

  //検査
  INSPECTION: {
    INDEX: (id: string) => `/Inspection/Index/${id}`,
    CREATE: (id: string) => `/Inspection/Create/${id}`,
    EDIT: (id: string) => `/Inspection/Update/${id}`,
    VIEW: (id: string) => `/InspectionView/${id}`,
  },

  // 在庫
  STOCK: {
    INDEX: "/Stock/Index",
    CREATE: "/Stock/Create",
    EDIT: (id: string) => `/Stock/Update/${id}`,
    VIEW: (id: string) => `/Stock/View/${id}`,
  },

  // 発注受入検収
  PURCHASE: {
    INDEX: "/OrderInspection/Index",
    CREATE: "/OrderInspection/Create",
    EDIT: (id: string) => `/OrderInspection/Update/${id}`,
    VIEW: (id: string) => `/OrderInspection/View/${id}`,
  },

  // マスタ系
  //得意先マスタ
  CUSTOMER: {
    INDEX: "/Mst001/Index",
    CREATE: "/Mst001/Create",
    EDIT: (id?: string) => (id ? `/Mst001/Update/${id}` : "/Mst001/Update/:id"),
    VIEW: (id?: string) => (id ? `/Mst001/View/${id}` : "/Mst001/View/:id"),
  },

  //得意先担当者マスタ
  CUSTOMER_STAFF: {
    INDEX: "/Mst002/Index",
    CREATE: "/Mst002/Create",
    EDIT: (id: string) => `/Mst002/Update/${id}`,
    VIEW: (id: string) => `/Mst002/View/${id}`,
  },

  //仕入先マスタ
  SUPPLIER: {
    INDEX: "/Mst003/Index",
    CREATE: "/Mst003/Create",
    EDIT: (id: string) => `/Mst003/Update/${id}`,
    VIEW: (id: string) => `/Mst003/View/${id}`,
  },

  //仕入先担当者マスタ
  SUPPLIER_STAFF: {
    INDEX: "/Mst003/Index",
    CREATE: "/Mst003/Create",
    EDIT: (id: string) => `/Mst003/Update/${id}`,
    VIEW: (id: string) => `/Mst003/View/${id}`,
  },

  //物件マスタ
  PROPERTY: {
    INDEX: "/Mst004/Index",
    CREATE: "/Mst004/Create",
    EDIT: (id: string) => `/Mst004/Update/${id}`,
    VIEW: (id: string) => `/Mst004/View/${id}`,
  },

  //家主マスタ
  HOUSEMASTER: {
    INDEX: "/Mst005/Index",
    CREATE: "/Mst005/Create",
    EDIT: (id: string) => `/Mst005/Update/${id}`,
    VIEW: (id: string) => `/Mst005/View/${id}`,
  },

  //小分類マスタ
  GOODS_WORKS: {
    INDEX: "/Mst006/Index",
    CREATE: "/Mst006/Create",
    EDIT: (id: string) => `/Mst006/Update/${id}`,
    VIEW: (id: string) => `/Mst006/View/${id}`,
  },

  //得意先単価マスタ
  CUSTOMER_UNITPRICE: {
    INDEX: "/Mst007/Index",
    CREATE: "/Mst007/Create",
    EDIT: (id: string) => `/Mst007/Update/${id}`,
    VIEW: (id: string) => `/Mst007/View/${id}`,
    DETAIL_INDEX: (id: string) => `/Mst007/Detail/Index/${id}`,
    DETAIL_CREATE: (id: string) => `/Mst007/Detail/Create/${id}`,
    DETAIL_EDIT: (id: string) => `/Mst007/Detail/Update/${id}`,
    DETAIL_VIEW: (id: string) => `/Mst007/Detail/View/${id}`,
  },

  //仕入先単価マスタ
  SUPPLIER_UNITPRICE: {
    INDEX: "/Mst008/Index",
    CREATE: "/Mst008/Create",
    EDIT: (id: string) => `/Mst008/Update/${id}`,
    VIEW: (id: string) => `/Mst008/View/${id}`,
    DETAIL_INDEX: (id: string) => `/Mst008/Detail/Index/${id}`,
    DETAIL_CREATE: (id: string) => `/Mst008/Detail/Create/${id}`,
    DETAIL_EDIT: (id: string) => `/Mst008/Detail/Update/${id}`,
    DETAIL_VIEW: (id: string) => `/Mst008/Detail/View/${id}`,
  },

  //社員マスタ
  WORKER: {
    INDEX: "/Mst009/Index",
    CREATE: "/Mst009/Create",
    EDIT: (id: string) => `/Mst009/Update/${id}`,
    VIEW: (id: string) => `/Mst009/View/${id}`,
  },

  //汎用名称マスタ
  GENERALNAMED: {
    INDEX: "/Mst009/Index",
    CREATE: "/Mst009/Create",
    EDIT: (id: string) => `/Mst009/Update/${id}`,
    VIEW: (id: string) => `/Mst009/View/${id}`,
    DETAIL_INDEX: (id: string) => `/Mst009/Detail/Index/${id}`,
    DETAIL_CREATE: (id: string) => `/Mst009/Detail/Create/${id}`,
    DETAIL_EDIT: (id: string) => `/Mst009/Detail/Update/${id}`,
    DETAIL_VIEW: (id: string) => `/Mst009/Detail/View/${id}`,
  },
} as const;
