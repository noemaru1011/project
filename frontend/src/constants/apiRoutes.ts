export const API_ROUTES = {
  CATEGORY: {
    INDEX: '/api/categories',
  },
  SUBCATEGORY: {
    INDEX: '/api/subCategories',
  },
  MINORCATEGORY: {
    INDEX: '/api/minor-categories',
  },
  DEPARTMENT: {
    INDEX: '/api/departments',
  },
  STATUS: { INDEX: '/api/statuses' },
  STUDENT: {
    //get
    INDEX: '/api/students',
    SEARCH: '/api/students/search',
    //post
    CREATE: '/api/students',
    //put
    UPDATE: (id: string) => `/api/students/${id}`,
    //get;id
    VIEW: (id: string) => `/api/students/${id}`,
    //delete:id
    DELETE: (id: string) => `/api/students/${id}`,
  },
  HISTORY: {
    //get
    INDEX: '/api/histories',
    //post
    CREATE: '/api/histories',
    //put
    UPDATE: (id: string) => `/api/histories/${id}`,
    //get;id
    VIEW: (id: string) => `/api/histories/${id}`,
    //delete:id
    DELETE: (id: string) => `/api/histories/${id}`,
  },
  AUTH: {
    LOGIN: '/api/login',
    LOGOUT: '/api/logout',
  },
  PASSWORD: {
    UPDATE: '/api/password',
  },
} as const;
