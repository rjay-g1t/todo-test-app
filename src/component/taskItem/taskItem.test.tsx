import { render, fireEvent, screen } from '@testing-library/react';
import TaskItem from './taskItem';

describe('TaskItem', () => {
  const mockTask = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    status: 'Pending' as 'Pending' | 'Completed' | 'In Progress',
    dueDate: '2023-12-31',
  };
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnStatusChange = jest.fn();

  it('renders task details', () => {
    render(
      <TaskItem
        {...mockTask}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onStatusChange={mockOnStatusChange}
      />
    );
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('calls onEdit when Edit button is clicked', () => {
    render(
      <TaskItem
        {...mockTask}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onStatusChange={mockOnStatusChange}
      />
    );

    fireEvent.click(screen.getByText('Edit'));
    expect(mockOnEdit).toHaveBeenCalledWith('1');
  });

  it('calls onDelete when Delete button is clicked', () => {
    render(
      <TaskItem
        {...mockTask}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onStatusChange={mockOnStatusChange}
      />
    );

    fireEvent.click(screen.getByText('Delete'));
    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });

  it('calls onStatusChange when status is changed', () => {
    render(
      <TaskItem
        {...mockTask}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onStatusChange={mockOnStatusChange}
      />
    );

    fireEvent.change(screen.getByDisplayValue('Pending'), {
      target: { value: 'Completed' },
    });
    expect(mockOnStatusChange).toHaveBeenCalledWith('1', 'Completed');
  });
});
