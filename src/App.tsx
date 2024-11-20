import React, { useState } from 'react';
import { TaskProvider, useTaskContext } from './context/taskContext';
import AddTaskForm from './component/addTaskForm/addTaskForm';
import TaskList from './component/taskList/taskList';
import SearchBar from './component/searchBar/searchBar';
import TaskFilter from './component/taskFilter/taskFilter';

const AppContent: React.FC = () => {
  const { tasks, addTask, editTask, deleteTask, searchQuery, setSearchQuery } =
    useTaskContext();
  const [filter, setFilter] = useState<
    'All' | 'Pending' | 'In Progress' | 'Completed'
  >('All');

  const filteredTasks = tasks.filter((task) => {
    if (filter !== 'All' && task.status !== filter) return false;
    if (
      searchQuery &&
      !task.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="app">
      <h1>To-Do Application</h1>
      <AddTaskForm
        onAdd={(newTask: any) =>
          addTask({ ...newTask, id: `${Date.now()}`, status: 'Pending' })
        }
      />
      <hr />
      <div className="task-container">
        <SearchBar searchQuery={searchQuery} onSearch={setSearchQuery} />
        <TaskFilter filter={filter} onFilterChange={setFilter} />
        <TaskList
          tasks={filteredTasks}
          onEdit={editTask}
          onDelete={deleteTask}
          onStatusChange={(id, status) => editTask(id, { status })}
        />
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <TaskProvider>
    <AppContent />
  </TaskProvider>
);

export default App;
