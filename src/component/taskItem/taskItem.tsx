import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTask, deleteTask, updateTaskStatus } from '../../redux/taskSlice';
import styles from '../../styles/taskItem.module.css';

interface TaskItemProps {
  id: string;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  dueDate: string;
}

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  title,
  description,
  status,
  dueDate,
}) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState(title);
  const [editingDescription, setEditingDescription] = useState(description);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      updateTaskStatus({
        id,
        newStatus: e.target.value as TaskItemProps['status'],
      })
    );
  };

  const handleSave = () => {
    dispatch(
      editTask({
        id,
        updatedTask: { title: editingTitle, description: editingDescription },
      })
    );
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditingTitle(title);
    setEditingDescription(description);
    setIsEditing(false);
  };

  return (
    <div className={styles['task-item']}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editingTitle}
            onChange={(e) => setEditingTitle(e.target.value)}
            placeholder="Edit Title"
          />
          <textarea
            value={editingDescription}
            onChange={(e) => setEditingDescription(e.target.value)}
            placeholder="Edit Description"
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <h3 onClick={() => setIsEditing(true)}>{title}</h3>
          <p>{description}</p>
          <p>
            <strong>Status:</strong> {status}
          </p>
          <p>
            <strong>Due Date:</strong> {dueDate}
          </p>
        </>
      )}

      {!isEditing && (
        <>
          <select value={status} onChange={handleStatusChange}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => dispatch(deleteTask(id))}>Delete</button>
        </>
      )}
    </div>
  );
};

// Wrap TaskItem with React.memo
export default memo(TaskItem);
