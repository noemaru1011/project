export const ROUTES = {
  HOME: "/",

  // 大分類マスタ
  CATEGORY: {
    INDEX: "/Category/Index",
  },

  //中分類マスタ
  SUBCATEGORY: {
    INDEX: "/SubCategory/Index",
  },

  //小分類マスタ
  MINORCategory: {
    INDEX: "/MinorCategory/Index",
  },

  //状態区分
  STATUS: {
    INDEX: "/Status/Index/",
  },

  //学科マスタ
  DEPARTMENT: {
    INDEX: "/Department/Index/",
  },

  // 学生マスタ
  STUDENT: {
    INDEX: "/Student/Index/",
    CREATE: "/Student/Create/",
    UPDATE: (studentId = ":studentId") => `/Student/Update/${studentId}`,
    VIEW: (studentId = ":studentId") => `/Student/View/${studentId}`,
    DELETE: (studentId = ":studentId") => `/Student/Delete/${studentId}`,
    CHANGE: "/Student/Change/",
  },

  //事故一覧
  HISTORY: {
    INDEX: "/History/Index/",
  },

  //認証
  AUTH: {
    LOGIN: "/Login/",
    LOGOUT: "/Logout/",
  },

  //エラーページ
  ERROR: {
    FORBIDDEN: "/Error/Forbidden",
    SERVER: "/Error/ServerError",
    NOTFOUND: "*",
  },
} as const;
