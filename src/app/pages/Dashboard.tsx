import { KPICard } from '../components/KPICard';
import { StatusBadge } from '../components/StatusBadge';
import { 
  FileText, 
  ClipboardCheck, 
  AlertTriangle, 
  Award,
  TrendingUp,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const auditByMonthData = [
  { id: 'month-1', month: 'T10', internal: 4, customer: 3, thirdParty: 2 },
  { id: 'month-2', month: 'T11', internal: 5, customer: 4, thirdParty: 3 },
  { id: 'month-3', month: 'T12', internal: 6, customer: 5, thirdParty: 2 },
  { id: 'month-4', month: 'T1', internal: 3, customer: 2, thirdParty: 1 },
  { id: 'month-5', month: 'T2', internal: 4, customer: 3, thirdParty: 2 },
  { id: 'month-6', month: 'T3', internal: 5, customer: 4, thirdParty: 3 },
];

const capaByDepartmentData = [
  { id: 'dept-1', name: 'KSNB-QA', value: 12 },
  { id: 'dept-2', name: 'Nhân sự', value: 8 },
  { id: 'dept-3', name: 'Kho vận', value: 6 },
  { id: 'dept-4', name: 'Xí nghiệp 1', value: 10 },
  { id: 'dept-5', name: 'Xí nghiệp 2', value: 5 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const urgentTasks = [
  {
    id: 'task-1',
    type: 'audit',
    title: 'Audit BSCI - Xí nghiệp 2',
    dueDate: '25/03/2026',
    status: 'pending' as const,
    priority: 'high',
  },
  {
    id: 'task-2',
    type: 'capa',
    title: 'CAPA #127 - Thiếu hồ sơ đào tạo PCCC',
    dueDate: '22/03/2026',
    status: 'overdue' as const,
    priority: 'high',
  },
  {
    id: 'task-3',
    type: 'certificate',
    title: 'Chứng chỉ ISO 9001:2015 sắp hết hạn',
    dueDate: '15/04/2026',
    status: 'pending' as const,
    priority: 'medium',
  },
  {
    id: 'task-4',
    type: 'finding',
    title: 'Finding #45 - Kiểm soát kim loại chưa đầy đủ',
    dueDate: '28/03/2026',
    status: 'in-progress' as const,
    priority: 'high',
  },
  {
    id: 'task-5',
    type: 'document',
    title: 'Rà soát quy trình CAPA - Khu A',
    dueDate: '30/03/2026',
    status: 'pending' as const,
    priority: 'medium',
  },
];

const complianceByFactory = [
  { id: 'factory-1', factory: 'Xí nghiệp 1', compliance: 92, audits: 8, capa: 5 },
  { id: 'factory-2', factory: 'Xí nghiệp 2', compliance: 88, audits: 6, capa: 8 },
  { id: 'factory-3', factory: 'Khu A', compliance: 95, audits: 4, capa: 2 },
  { id: 'factory-4', factory: 'Khu B', compliance: 90, audits: 5, capa: 4 },
];

export function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard Tổng Quan</h1>
        <p className="text-slate-600 mt-1">Giám sát tình trạng tuân thủ toàn hệ thống</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Tiêu chuẩn đang áp dụng"
          value={12}
          icon={<FileText className="w-6 h-6" />}
          color="blue"
          change="+2 tiêu chuẩn mới"
          trend="up"
        />
        <KPICard
          title="Audit trong tháng"
          value={8}
          icon={<ClipboardCheck className="w-6 h-6" />}
          color="green"
          change="5 đã hoàn thành"
        />
        <KPICard
          title="CAPA quá hạn"
          value={7}
          icon={<AlertTriangle className="w-6 h-6" />}
          color="red"
          change="+2 so với tuần trước"
          trend="down"
        />
        <KPICard
          title="Chứng chỉ sắp hết hạn"
          value={3}
          icon={<Award className="w-6 h-6" />}
          color="orange"
          change="Trong 60 ngày tới"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Audit by Month */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Số lượng Audit theo tháng</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={auditByMonthData}>
              <CartesianGrid key="grid" strokeDasharray="3 3" />
              <XAxis key="xaxis" dataKey="month" />
              <YAxis key="yaxis" />
              <Tooltip key="tooltip" />
              <Legend key="legend" />
              <Bar key="bar-internal" dataKey="internal" name="Nội bộ" fill="#3b82f6" />
              <Bar key="bar-customer" dataKey="customer" name="Khách hàng" fill="#10b981" />
              <Bar key="bar-thirdparty" dataKey="thirdParty" name="Bên thứ 3" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* CAPA by Department */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">CAPA theo phòng ban</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                key="pie"
                data={capaByDepartmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {capaByDepartmentData.map((entry, index) => (
                  <Cell key={`cell-${entry.id}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip key="pie-tooltip" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Urgent Tasks and Compliance Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Urgent Tasks */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Công việc cần xử lý ngay</h2>
          </div>
          <div className="divide-y divide-slate-200">
            {urgentTasks.map((task) => (
              <div key={task.id} className="p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    {task.type === 'audit' && <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />}
                    {task.type === 'capa' && <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />}
                    {task.type === 'certificate' && <Award className="w-5 h-5 text-orange-600 mt-0.5" />}
                    {task.type === 'finding' && <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />}
                    {task.type === 'document' && <FileText className="w-5 h-5 text-purple-600 mt-0.5" />}
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{task.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-600">Hạn: {task.dueDate}</span>
                        {task.priority === 'high' && (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                            Ưu tiên cao
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <StatusBadge status={task.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Summary */}
        <div className="bg-white rounded-lg border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Tổng quan tuân thủ</h2>
          </div>
          <div className="p-6 space-y-4">
            {complianceByFactory.map((item) => (
              <div key={item.id}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-900">{item.factory}</span>
                  <span className="text-sm font-semibold text-slate-900">{item.compliance}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      item.compliance >= 95 ? 'bg-green-600' :
                      item.compliance >= 90 ? 'bg-blue-600' :
                      item.compliance >= 85 ? 'bg-yellow-600' :
                      'bg-red-600'
                    }`}
                    style={{ width: `${item.compliance}%` }}
                  />
                </div>
                <div className="flex items-center gap-3 mt-2 text-xs text-slate-600">
                  <span>{item.audits} audit</span>
                  <span>•</span>
                  <span>{item.capa} CAPA</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}