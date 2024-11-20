import { render, screen } from '@testing-library/react';
import StatusBadge from './statusBadge';

describe('StatusBadge', () => {
  it('renders the correct status', () => {
    render(<StatusBadge status="Pending" />);
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  it('applies correct class based on status', () => {
    const { container } = render(<StatusBadge status="Completed" />);
    expect(container.firstChild).toHaveClass('status-badge completed');
  });
});
