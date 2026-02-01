export const ROUTES = {
  HOME: '/',

  // 学生マスタ
  STUDENT: {
    INDEX: '/students',
    CREATE: '/students/new',
    UPDATE: (studentId = ':studentId') => `/students/${studentId}/edit`,
    VIEW: (studentId = ':studentId') => `/students/${studentId}`,
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
