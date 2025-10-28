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
  StatusClass: {
    INDEX: "/StatusClass/Index",
  },

  //学科マスタ
  Department: {
    INDEX: "/Department/Index/",
  },

  // 学生マスタ
  Student: {
    INDEX: "/Student/Index/",
    CREATE: (id: string) => `/Student/Create/${id}`,
    EDIT: (id: string) => `/Student/Update/${id}`,
    VIEW: (id: string) => `/Student/View/${id}`,
  },

  //事故一覧
  State: {
    INDEX: "/State/Index/",
  },
} as const;
