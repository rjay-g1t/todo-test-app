import { render, fireEvent, screen } from '@testing-library/react';
import AddTaskForm from './addTaskForm';

describe('AddTaskForm', () => {
  it('renders the form correctly', () => {
    render(<AddTaskForm onAdd={jest.fn()} />);
    expect(screen.getByPlaceholderText('Enter task title')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter task description')
    ).toBeInTheDocument();
  });

  it('calls onAdd with task details on form submission', () => {
    const mockOnAdd = jest.fn();
    render(<AddTaskForm onAdd={mockOnAdd} />);

    fireEvent.change(screen.getByPlaceholderText('Enter task title'), {
      target: { value: 'Test Task' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter task description'), {
      target: { value: 'Test Description' },
    });
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));

    expect(mockOnAdd).toHaveBeenCalledWith({
      title: 'Test Task',
      description: 'Test Description',
    });
  });
});
