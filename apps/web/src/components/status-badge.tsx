interface StatusBadgeProps {
  status:
    | 'PENDING'
    | 'CONFIRMED'
    | 'CANCELLED'
    | 'COMPLETED'
    | 'SUCCEEDED'
    | 'FAILED'
    | 'REFUNDED';
  size?: 'sm' | 'md' | 'lg';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  const statusConfig = {
    PENDING: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      label: 'Pending',
    },
    CONFIRMED: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      label: 'Confirmed',
    },
    COMPLETED: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      label: 'Completed',
    },
    CANCELLED: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      label: 'Cancelled',
    },
    SUCCEEDED: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      label: 'Succeeded',
    },
    FAILED: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      label: 'Failed',
    },
    REFUNDED: {
      bg: 'bg-gray-100',
      text: 'text-gray-800',
      label: 'Refunded',
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold ${config.bg} ${config.text} ${sizeClasses[size]}`}
    >
      {config.label}
    </span>
  );
}
