import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddTaskForm from './addTaskForm/addTaskForm';
import TaskList from './taskList/taskList';
import SearchBar from './searchBar/searchBar';
import TaskFilter from './taskFilter/taskFilter';
import { RootState } from '../redux/store';
import { addTask, editTask, deleteTask } from '../redux/taskSlice';

const AppContent: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const searchQuery = useSelector(
    (state: RootState) => state.tasks.searchQuery
  );
  const dispatch = useDispatch();

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
          dispatch(
            addTask({ ...newTask, id: `${Date.now()}`, status: 'Pending' })
          )
        }
      />
      <hr />
      <div className="task-container">
        <SearchBar
          searchQuery={searchQuery}
          onSearch={(query) => dispatch(editTask({ searchQuery: query }))}
        />
        <TaskFilter filter={filter} onFilterChange={setFilter} />
        <TaskList
          tasks={filteredTasks}
          onEdit={(id, updatedTask) =>
            dispatch(editTask({ id, ...updatedTask }))
          }
          onDelete={(id) => dispatch(deleteTask(id))}
          onStatusChange={(id, status) => dispatch(editTask({ id, status }))}
        />
      </div>
    </div>
  );
};

export default AppContent;
