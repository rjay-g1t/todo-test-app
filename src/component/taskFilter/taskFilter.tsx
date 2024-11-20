import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import styles from '../../styles/taskFilter.module.css';

interface TaskFilterProps {
  onFilterChange: React.Dispatch<
    React.SetStateAction<'All' | 'Pending' | 'In Progress' | 'Completed'>
  >;

  filter: 'All' | 'Pending' | 'In Progress' | 'Completed';
}

const TaskFilter: React.FC<TaskFilterProps> = ({ onFilterChange, filter }) => {
  // const [query, setQuery] = useState('');
  // const [status, setStatus] = useState('All');
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const filteredTasks = tasks.filter(
    (task) =>
      (status === 'All' || task.status === filter) &&
      task.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.filter}>
      {/* <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search tasks..."
      /> */}
      <select
        onChange={(e) =>
          onFilterChange(
            e.target.value as 'All' | 'Pending' | 'In Progress' | 'Completed'
          )
        }
      >
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskFilter;
