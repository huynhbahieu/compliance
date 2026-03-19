export interface StatusBadgeProps {
  status: 'compliant' | 'pending' | 'overdue' | 'expired' | 'in-progress' | 'closed' | 'critical' | 'major' | 'minor' | 'observation';
  children?: React.ReactNode;
}

const statusConfig = {
  compliant: { label: 'Đạt', color: 'bg-green-100 text-green-700' },
  pending: { label: 'Chờ xử lý', color: 'bg-yellow-100 text-yellow-700' },
  overdue: { label: 'Quá hạn', color: 'bg-red-100 text-red-700' },
  expired: { label: 'Hết hạn', color: 'bg-red-100 text-red-700' },
  'in-progress': { label: 'Đang thực hiện', color: 'bg-blue-100 text-blue-700' },
  closed: { label: 'Đã đóng', color: 'bg-slate-100 text-slate-700' },
  critical: { label: 'Critical', color: 'bg-red-100 text-red-700' },
  major: { label: 'Major', color: 'bg-orange-100 text-orange-700' },
  minor: { label: 'Minor', color: 'bg-yellow-100 text-yellow-700' },
  observation: { label: 'Observation', color: 'bg-blue-100 text-blue-700' },
};

export function StatusBadge({ status, children }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}>
      {children || config.label}
    </span>
  );
}
