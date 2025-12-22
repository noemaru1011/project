import { configureStore } from '@reduxjs/toolkit';
import departmentReducer from '@/features/department/slice';
import categoryReducer from '@/features/category/slice';

export const store = configureStore({
  reducer: {
    departments: departmentReducer,
    categories: categoryReducer,
    // 他の slice...
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
