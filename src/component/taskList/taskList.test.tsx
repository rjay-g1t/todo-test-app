import { render, screen } from '@testing-library/react';
import TaskList from './taskList';
import { Task } from '../../utils/types';

describe('TaskList', () => {
  const mockTasks: Task[] = [
    {
      id: '1',
      title: 'Task 1',
      description: 'Description 1',
      status: 'Pending',
      dueDate: '2023-12-31',
    },
    {
      id: '2',
      title: 'Task 2',
      description: 'Description 2',
      status: 'Completed',
      dueDate: '2023-12-31',
    },
  ];

  it('renders tasks', () => {
    render(
      <TaskList
        tasks={mockTasks}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        onStatusChange={jest.fn()}
      />
    );

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });
});
