import React, { useState, memo } from 'react';

interface TaskItemProps {
  id: string;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  dueDate: string;
  onEdit: (id: string, updatedTask: Partial<TaskItemProps>) => void;
  onDelete: (id: string) => void;
  onStatusChange: (
    id: string,
    newStatus: 'Pending' | 'In Progress' | 'Completed'
  ) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  title,
  description,
  status,
  dueDate,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState(title);
  const [editingDescription, setEditingDescription] = useState(description);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(
      id,
      e.target.value as 'Pending' | 'In Progress' | 'Completed'
    );
  };

  const handleSave = () => {
    onEdit(id, { title: editingTitle, description: editingDescription });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditingTitle(title);
    setEditingDescription(description);
    setIsEditing(false);
  };

  return (
    <div className="task-item">
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
          <button onClick={() => onDelete(id)}>Delete</button>
        </>
      )}
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(TaskItem);
