interface StatusBadgeProps {
  status: 'Pending' | 'In Progress' | 'Completed';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getBadgeStyle = () => {
    switch (status) {
      case 'Pending':
        return { backgroundColor: 'orange', color: 'white' };
      case 'In Progress':
        return { backgroundColor: 'blue', color: 'white' };
      case 'Completed':
        return { backgroundColor: 'green', color: 'white' };
      default:
        return;
    }
  };

  return (
    <span
      style={{ padding: '5px 10px', borderRadius: '5px', ...getBadgeStyle() }}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
