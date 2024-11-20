import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  dueDate: string;
}

interface TaskState {
  tasks: Task[];
  searchQuery: string;
}

const initialState: TaskState = {
  tasks: [],
  searchQuery: '',
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    editTask: (
      state,
      action: PayloadAction<{ id: string; updatedTask: Partial<Task> }>
    ) => {
      const { id, updatedTask } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        Object.assign(task, updatedTask);
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTaskStatus: (
      state,
      action: PayloadAction<{ id: string; newStatus: Task['status'] }>
    ) => {
      const { id, newStatus } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.status = newStatus;
      }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  updateTaskStatus,
  setSearchQuery,
} = taskSlice.actions;

export default taskSlice.reducer;
