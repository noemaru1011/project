import { configureStore } from '@reduxjs/toolkit';
import departmentReducer from '@/features/department/slice';
import categoryReducer from '@/features/category/slice';
import minorCategoryReducer from '@/features/minorCategory/slice';

export const store = configureStore({
  reducer: {
    departments: departmentReducer,
    categories: categoryReducer,
    minorCategories: minorCategoryReducer,
    // 他の slice...
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
