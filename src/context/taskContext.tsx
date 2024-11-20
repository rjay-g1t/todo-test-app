// import React, { createContext, useState, useContext } from 'react';

// export interface Task {
//   id: string;
//   title: string;
//   description: string;
//   status: 'Pending' | 'In Progress' | 'Completed';
//   dueDate: string;
// }

// interface TaskContextProps {
//   tasks: Task[];
//   addTask: (task: Task) => void;
//   editTask: (id: string, updatedTask: Partial<Task>) => void;
//   deleteTask: (id: string) => void;
//   setSearchQuery: (query: string) => void;
//   searchQuery: string;
// }

// const TaskContext = createContext<TaskContextProps | undefined>(undefined);
// interface TaskProviderProps {
//   children: React.ReactNode;
// }
// export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [searchQuery, setSearchQuery] = useState<string>('');

//   const addTask = (task: Task) => {
//     setTasks((prev) => [...prev, task]);
//   };

//   const editTask = (id: string, updatedTask: Partial<Task>) => {
//     setTasks((prev) =>
//       prev.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
//     );
//   };

//   const deleteTask = (id: string) => {
//     setTasks((prev) => prev.filter((task) => task.id !== id));
//   };

//   return (
//     <TaskContext.Provider
//       value={{
//         tasks,
//         addTask,
//         editTask,
//         deleteTask,
//         setSearchQuery,
//         searchQuery,
//       }}
//     >
//       {children}
//     </TaskContext.Provider>
//   );
// };

// export const useTaskContext = () => {
//   const context = useContext(TaskContext);
//   if (!context) {
//     throw new Error('useTaskContext must be used within a TaskProvider');
//   }
//   return context;
// };
// forgot that i should use redux
