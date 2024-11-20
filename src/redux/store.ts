import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from './taskSlice';

const store = configureStore({
  reducer: { tasks: tasksSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
