import { render, screen, fireEvent } from '@testing-library/react';
import TaskFilter from './taskFilter';

describe('TaskFilter', () => {
  const mockOnFilterChange = jest.fn();
  it('renders all filter buttons', () => {
    render(
      <TaskFilter currentFilter="All" onFilterChange={mockOnFilterChange} />
    );
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('calls onFilterChange when a filter is clicked', () => {
    render(
      <TaskFilter currentFilter="All" onFilterChange={mockOnFilterChange} />
    );

    fireEvent.click(screen.getByText('Pending'));
    expect(mockOnFilterChange).toHaveBeenCalledWith('Pending');
  });
});
