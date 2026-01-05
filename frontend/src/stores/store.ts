import { configureStore } from '@reduxjs/toolkit';
import departmentReducer from '@/features/department/slice';
import categoryReducer from '@/features/category/slice';
import subCategoryReducer from '@/features/subCategory/slice';
import minorCategoryReducer from '@/features/minorCategory/slice';
import statusReducer from '@/features/status/slice';

export const store = configureStore({
  reducer: {
    departments: departmentReducer,
    categories: categoryReducer,
    subCategories: subCategoryReducer,
    minorCategories: minorCategoryReducer,
    statuses: statusReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
