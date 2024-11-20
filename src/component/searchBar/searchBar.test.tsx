import { render, fireEvent, screen } from '@testing-library/react';
import SearchBar from './searchBar';

describe('SearchBar', () => {
  const mockOnSearch = jest.fn();
  it('renders correctly', () => {
    render(<SearchBar onSearch={jest.fn()} searchQuery={''} />);
    expect(screen.getByPlaceholderText('Search tasks...')).toBeInTheDocument();
  });

  it('calls onSearch when typing', () => {
    render(<SearchBar onSearch={mockOnSearch} searchQuery={''} />);
    fireEvent.change(screen.getByPlaceholderText('Search tasks...'), {
      target: { value: 'Test' },
    });
    expect(mockOnSearch).toHaveBeenCalledWith('Test');
  });
});
