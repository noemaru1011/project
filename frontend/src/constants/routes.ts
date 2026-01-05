export const ROUTES = {
  HOME: '/',

  // 大分類マスタ
  CATEGORY: {
    INDEX: '/categories',
  },

  //中分類マスタ
  SUBCATEGORY: {
    INDEX: '/sub-categories',
  },

  //小分類マスタ
  MINORCATEGORY: {
    INDEX: '/minor-categories',
  },

  //状態区分
  STATUS: {
    INDEX: '/statuses',
  },

  //学科マスタ
  DEPARTMENT: {
    INDEX: '/departments',
  },

  // 学生マスタ
  STUDENT: {
    INDEX: '/students',
    CREATE: '/students/new',
    UPDATE: (studentId = ':studentId') => `/students/${studentId}/edit`,
    VIEW: (studentId = ':studentId') => `/students/${studentId}`,
    DELETE: (studentId = ':studentId') => `/students/${studentId}/delete`,
  },

  //履歴一覧
  HISTORY: {
    INDEX: '/histories',
    CREATE: '/histories/new',
    UPDATE: (historyId = ':historyId') => `/histories/${historyId}/edit`,
    DELETE: (historyId = ':historyId') => `/histories/${historyId}/delete`,
  },

  //認証
  AUTH: {
    LOGIN: '/login',
    PASSWORD_CHANGE: '/password-change',
  },

  //エラーページ
  ERROR: {
    FORBIDDEN: '/403',
    SERVER: '/500',
    NOTFOUND: '*',
  },
} as const;
