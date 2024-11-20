import React, { useState } from 'react';
import styles from '../../styles/addTaskForm.module.css';

interface AddTaskFormProps {
  onAdd: (task: { title: string; description: string }) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim() === '') {
      alert('Title is required');
      return;
    }

    // Call the `onAdd` function passed as a prop
    onAdd({ title, description });

    // Clear input fields after submission
    setTitle('');
    setDescription('');
  };

  return (
    <form className={styles['add-task-form']} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className={styles.textarea}
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" className={styles.button}>
        Add Task
      </button>
    </form>
  );
};

export default AddTaskForm;
