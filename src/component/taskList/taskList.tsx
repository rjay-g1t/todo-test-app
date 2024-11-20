import React from 'react';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import TaskItem from '../taskItem/taskItem';
import { Task } from '../../utils/types';

interface TaskListProps {
  tasks: Task[];
  onEdit: (id: string, updatedTask: Partial<Task>) => void;
  onDelete: (id: string) => void;
  onStatusChange: (
    id: string,
    newStatus: 'Pending' | 'In Progress' | 'Completed'
  ) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  const Row = ({ index, style }: ListChildComponentProps) => {
    const task = tasks[index];
    return (
      <div style={style}>
        <TaskItem
          key={task.id}
          {...task}
          onEdit={(updatedTask: Partial<Task>) => onEdit(task.id, updatedTask)}
          onDelete={() => onDelete(task.id)}
          onStatusChange={onStatusChange}
        />
      </div>
    );
  };

  return (
    <div className="task-list">
      <List height={400} itemCount={tasks.length} itemSize={100} width="100%">
        {Row}
      </List>
    </div>
  );
};

export default TaskList;
