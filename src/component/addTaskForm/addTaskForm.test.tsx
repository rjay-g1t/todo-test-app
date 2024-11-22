import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddTaskForm from './addTaskForm';

describe('AddTaskForm Component', () => {
  it('renders the form correctly', () => {
    render(<AddTaskForm onAdd={jest.fn()} />);
    expect(screen.getByPlaceholderText('Task Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Task Description')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /add task/i })
    ).toBeInTheDocument();
  });

  it('alerts when trying to submit without a title', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<AddTaskForm onAdd={jest.fn()} />);
    userEvent.click(screen.getByRole('button', { name: /add task/i }));
    expect(alertMock).toHaveBeenCalledWith('Title is required');
    alertMock.mockRestore();
  });

  it('calls onAdd with correct task details on valid submission', () => {
    const mockOnAdd = jest.fn();
    render(<AddTaskForm onAdd={mockOnAdd} />);
    userEvent.type(screen.getByPlaceholderText('Task Title'), 'Test Title');
    userEvent.type(
      screen.getByPlaceholderText('Task Description'),
      'Test Description'
    );
    userEvent.click(screen.getByRole('button', { name: /add task/i }));
    expect(mockOnAdd).toHaveBeenCalledWith({
      title: 'Test Title',
      description: 'Test Description',
    });
    expect(screen.getByPlaceholderText('Task Title')).toHaveValue('');
    expect(screen.getByPlaceholderText('Task Description')).toHaveValue('');
  });
});
