export const ROUTES = {
  HOME: "/",

  // 大分類マスタ
  Category: {
    INDEX: "/Category/Index",
  },

  //中分類マスタ
  SubCategory: {
    INDEX: "/SubCategory/Index",
  },

  //小分類マスタ
  MinorCategory: {
    INDEX: "/MinorCategory/Index",
  },

  //状態区分
  Status: {
    INDEX: "/Status/Index/",
  },

  //学科マスタ
  Department: {
    INDEX: "/Department/Index/",
  },

  // 学生マスタ
  Student: {
    INDEX: "/Student/Index/",
    CREATE: "/Student/Create/",
    EDIT: (id: string) => `/Student/Update/${id}`,
    VIEW: (id: string) => `/Student/View/${id}`,
    DELETE: (id: string) => `/Student/Delete/${id}`,
  },

  //事故一覧
  State: {
    INDEX: "/State/Index/",
  },

  //ログイン
  Login: {
    INDEX: "/Login",
  },

  //認証
  Auth: {
    LOGIN: "/Auth/Login/",
    LOGOUT: "/Auth/Logout/",
  },

  //エラーページ
  Error: {
    Forbidden: "/Error/Forbidden",
    SERVER: "/Error/ServerError",
    Other: "/Error/Other",
  },
} as const;
