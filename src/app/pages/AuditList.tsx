import { Link } from 'react-router';
import { StatusBadge } from '../components/StatusBadge';
import { Calendar, Filter, Download, Plus, Eye } from 'lucide-react';
import { useState } from 'react';

const audits = [
  {
    id: 1,
    program: 'BSCI',
    customer: 'ZARA',
    factory: 'Xí nghiệp 1',
    type: 'Khách hàng',
    auditor: 'TÜV Rheinland',
    date: '15/04/2026',
    result: 'Đạt - 88/100',
    cost: '15,000,000 VNĐ',
    status: 'in-progress' as const,
  },
  {
    id: 2,
    program: 'ISO 9001:2015',
    customer: 'Tất cả',
    factory: 'Khu A',
    type: 'Bên thứ 3',
    auditor: 'SGS Vietnam',
    date: '22/03/2026',
    result: 'Đạt - 95/100',
    cost: '25,000,000 VNĐ',
    status: 'closed' as const,
  },
  {
    id: 3,
    program: 'SA8000',
    customer: 'H&M',
    factory: 'Xí nghiệp 2',
    type: 'Nội bộ',
    auditor: 'Đội QA nội bộ',
    date: '10/04/2026',
    result: 'Chưa hoàn thành',
    cost: '0 VNĐ',
    status: 'in-progress' as const,
  },
  {
    id: 4,
    program: 'WRAP',
    customer: 'Nike',
    factory: 'Xí nghiệp 1',
    type: 'Khách hàng',
    auditor: 'WRAP Certified',
    date: '05/05/2026',
    result: 'Chờ thực hiện',
    cost: '18,000,000 VNĐ',
    status: 'pending' as const,
  },
  {
    id: 5,
    program: 'GRS',
    customer: 'Patagonia',
    factory: 'Khu B',
    type: 'Bên thứ 3',
    auditor: 'Control Union',
    date: '12/03/2026',
    result: 'Đạt - 92/100',
    cost: '20,000,000 VNĐ',
    status: 'closed' as const,
  },
  {
    id: 6,
    program: 'Higg FEM',
    customer: 'Adidas',
    factory: 'Xí nghiệp 2',
    type: 'Khách hàng',
    auditor: 'Higg Verifier',
    date: '28/03/2026',
    result: 'Đạt - 78/100',
    cost: '12,000,000 VNĐ',
    status: 'closed' as const,
  },
  {
    id: 7,
    program: 'Better Work',
    customer: 'Tất cả',
    factory: 'Xí nghiệp 1',
    type: 'Nội bộ',
    auditor: 'Better Work Vietnam',
    date: '18/04/2026',
    result: 'Chờ thực hiện',
    cost: '0 VNĐ',
    status: 'pending' as const,
  },
  {
    id: 8,
    program: 'SMETA',
    customer: 'Marks & Spencer',
    factory: 'Khu A',
    type: 'Khách hàng',
    auditor: 'Intertek',
    date: '02/04/2026',
    result: 'Đạt - 85/100',
    cost: '22,000,000 VNĐ',
    status: 'in-progress' as const,
  },
];

export function AuditList() {
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredAudits = audits.filter(audit => {
    if (filterType !== 'all' && audit.type !== filterType) return false;
    if (filterStatus !== 'all' && audit.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Quản lý Audit</h1>
          <p className="text-slate-600 mt-1">Theo dõi lịch trình và kết quả đánh giá tuân thủ</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          Thêm Audit mới
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-slate-600" />
            <span className="text-sm font-medium text-slate-700">Bộ lọc:</span>
          </div>
          
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tất cả loại audit</option>
            <option value="Nội bộ">Nội bộ</option>
            <option value="Khách hàng">Khách hàng</option>
            <option value="Bên thứ 3">Bên thứ 3</option>
          </select>

          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ xử lý</option>
            <option value="in-progress">Đang thực hiện</option>
            <option value="closed">Đã đóng</option>
          </select>

          <div className="ml-auto flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 transition-colors">
              <Calendar className="w-4 h-4" />
              Calendar view
            </button>
            <button className="flex items-center gap-2 px-3 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                  Chương trình
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                  Nhà máy / Xí nghiệp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                  Loại audit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                  Auditor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                  Ngày audit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                  Kết quả
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                  Chi phí
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredAudits.map((audit) => (
                <tr key={audit.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-slate-900">{audit.program}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                    {audit.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                    {audit.factory}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex px-2 py-1 rounded-md text-xs ${
                      audit.type === 'Nội bộ' ? 'bg-blue-50 text-blue-700' :
                      audit.type === 'Khách hàng' ? 'bg-purple-50 text-purple-700' :
                      'bg-green-50 text-green-700'
                    }`}>
                      {audit.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700">
                    {audit.auditor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                    {audit.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700">
                    {audit.result}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                    {audit.cost}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={audit.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link 
                      to={`/audits/${audit.id}`}
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      Chi tiết
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <div className="text-sm text-slate-600">
            Hiển thị <span className="font-medium">{filteredAudits.length}</span> / <span className="font-medium">{audits.length}</span> audit
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-slate-300 rounded text-sm hover:bg-slate-50 disabled:opacity-50" disabled>
              Trước
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
              1
            </button>
            <button className="px-3 py-1 border border-slate-300 rounded text-sm hover:bg-slate-50">
              2
            </button>
            <button className="px-3 py-1 border border-slate-300 rounded text-sm hover:bg-slate-50">
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
