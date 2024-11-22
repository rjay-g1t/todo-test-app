import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TaskItem from './taskItem';
import { editTask, deleteTask, updateTaskStatus } from '../../redux/taskSlice';

const mockStore = configureStore([]);

describe('TaskItem Component', () => {
  let store: ReturnType<typeof mockStore>;
  const task = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    status: 'Pending' as 'Pending' | 'In Progress' | 'Completed',
    dueDate: '2024-12-01',
  };

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
  });

  it('renders task details correctly', () => {
    render(
      <Provider store={store}>
        <TaskItem {...task} />
      </Provider>
    );

    expect(screen.getByText(task.title)).toBeInTheDocument();
    expect(screen.getByText(task.description)).toBeInTheDocument();
    expect(screen.getByText(`Status: ${task.status}`)).toBeInTheDocument();
    expect(screen.getByText(`Due Date: ${task.dueDate}`)).toBeInTheDocument();
  });

  it('dispatches deleteTask action when delete button is clicked', () => {
    render(
      <Provider store={store}>
        <TaskItem {...task} />
      </Provider>
    );

    userEvent.click(screen.getByText('Delete'));

    expect(store.dispatch).toHaveBeenCalledWith(deleteTask(task.id));
  });

  it('dispatches updateTaskStatus action when status is changed', () => {
    render(
      <Provider store={store}>
        <TaskItem {...task} />
      </Provider>
    );

    userEvent.type(screen.getByRole('combobox'), 'In Progress');

    expect(store.dispatch).toHaveBeenCalledWith(
      updateTaskStatus({ id: task.id, newStatus: 'In Progress' })
    );
  });

  it('allows editing the task and dispatches editTask action on save', () => {
    render(
      <Provider store={store}>
        <TaskItem {...task} />
      </Provider>
    );

    userEvent.click(screen.getByText('Edit'));

    const titleInput = screen.getByPlaceholderText('Edit Title');
    const descriptionInput = screen.getByPlaceholderText('Edit Description');

    userEvent.type(titleInput, 'Updated Task');
    userEvent.type(descriptionInput, 'Updated Description');

    userEvent.click(screen.getByText('Save'));
    expect(store.dispatch).toHaveBeenCalledWith(
      editTask({
        id: task.id,
        updatedTask: {
          title: 'Updated Task',
          description: 'Updated Description',
        },
      })
    );
  });

  it('restores original values and cancels edit mode when cancel is clicked', () => {
    render(
      <Provider store={store}>
        <TaskItem {...task} />
      </Provider>
    );

    userEvent.click(screen.getByText('Edit'));
    const titleInput = screen.getByPlaceholderText('Edit Title');
    const descriptionInput = screen.getByPlaceholderText('Edit Description');

    userEvent.type(titleInput, 'Updated Task');
    userEvent.type(descriptionInput, 'Updated Description');
    userEvent.click(screen.getByText('Cancel'));

    expect(screen.getByText(task.title)).toBeInTheDocument();
    expect(screen.getByText(task.description)).toBeInTheDocument();
  });
});
