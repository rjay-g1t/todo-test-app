import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TaskFilter from './taskFilter';

const mockStore = configureStore([]);

describe('TaskFilter Component', () => {
  let store: ReturnType<typeof mockStore>;
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    store = mockStore({
      tasks: {
        tasks: [
          { id: '1', title: 'Task 1', status: 'Pending' },
          { id: '2', title: 'Task 2', status: 'In Progress' },
          { id: '3', title: 'Task 3', status: 'Completed' },
        ],
      },
    });
    store.dispatch = jest.fn();
  });

  it('renders the filter dropdown and displays all tasks by default', () => {
    render(
      <Provider store={store}>
        <TaskFilter filter="All" onFilterChange={mockOnFilterChange} />
      </Provider>
    );

    expect(screen.getByRole('combobox')).toBeInTheDocument();

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.getByText('Task 3')).toBeInTheDocument();
  });

  it('filters tasks based on the selected filter', () => {
    render(
      <Provider store={store}>
        <TaskFilter filter="Pending" onFilterChange={mockOnFilterChange} />
      </Provider>
    );

    userEvent.type(screen.getByRole('combobox'), 'Pending');

    expect(mockOnFilterChange).toHaveBeenCalledWith('Pending');

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Task 3')).not.toBeInTheDocument();
  });

  it('displays tasks for "In Progress" filter', () => {
    render(
      <Provider store={store}>
        <TaskFilter filter="In Progress" onFilterChange={mockOnFilterChange} />
      </Provider>
    );

    userEvent.type(screen.getByRole('combobox'), 'In Progress');

    expect(mockOnFilterChange).toHaveBeenCalledWith('In Progress');

    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Task 3')).not.toBeInTheDocument();
  });

  it('renders no tasks if none match the filter', () => {
    render(
      <Provider store={store}>
        <TaskFilter filter="Nonexistent" onFilterChange={mockOnFilterChange} />
      </Provider>
    );

    expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Task 3')).not.toBeInTheDocument();
  });

  it('renders all tasks when "All" filter is selected', () => {
    render(
      <Provider store={store}>
        <TaskFilter filter="All" onFilterChange={mockOnFilterChange} />
      </Provider>
    );

    userEvent.type(screen.getByRole('combobox'), 'All');

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.getByText('Task 3')).toBeInTheDocument();
  });
});
