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
    UPDATE: (studentId = ":studentId") => `/Student/Update/${studentId}`,
    VIEW: (studentId = ":studentId") => `/Student/View/${studentId}`,
    DELETE: (studentId = ":studentId") => `/Student/Delete/${studentId}`,
    CHANGE: (studentId = ":studentId") => `/Student/Change/${studentId}`,
  },

  //事故一覧
  History: {
    INDEX: "/History/Index/",
  },

  //認証
  Auth: {
    LOGIN: "/Auth/Login/",
    LOGOUT: "/Auth/Logout/",
    CHECK_AUTH: "/Auth/Check",
  },

  //エラーページ
  Error: {
    FORBIDDEN: "/Error/Forbidden",
    SERVER: "/Error/ServerError",
    NOTFOUND: "*",
  },
} as const;
