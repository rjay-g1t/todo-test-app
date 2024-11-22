import { render, screen } from '@testing-library/react';
import StatusBadge from './statusBadge';

describe('StatusBadge Component', () => {
  it('renders the correct badge for "Pending" status', () => {
    render(<StatusBadge status="Pending" />);
    const badge = screen.getByText('Pending');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveStyle({ backgroundColor: 'orange', color: 'white' });
  });

  it('renders the correct badge for "In Progress" status', () => {
    render(<StatusBadge status="In Progress" />);
    const badge = screen.getByText('In Progress');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveStyle({ backgroundColor: 'blue', color: 'white' });
  });

  it('renders the correct badge for "Completed" status', () => {
    render(<StatusBadge status="Completed" />);
    const badge = screen.getByText('Completed');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveStyle({ backgroundColor: 'green', color: 'white' });
  });

  it('does not render for an invalid status', () => {
    render(<StatusBadge status={'Invalid' as 'Pending'} />);
    const badge = screen.queryByText('Invalid');
    expect(badge).not.toBeInTheDocument();
  });
});
