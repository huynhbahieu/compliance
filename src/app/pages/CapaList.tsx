import { StatusBadge } from '../components/StatusBadge';
import { Filter, Download, Plus, Search, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

const capas = [
  {
    id: 'CAPA-127',
    findingId: 'F-001',
    audit: 'BSCI - Xí nghiệp 1',
    severity: 'major' as const,
    category: 'Đào tạo nhân viên',
    description: 'Thiếu hồ sơ đào tạo an toàn lao động cho 15 công nhân mới',
    owner: 'Trần Thị B',
    department: 'Nhân sự',
    factory: 'Xí nghiệp 1',
    deadline: '30/04/2026',
    progress: 45,
    status: 'in-progress' as const,
    rootCause: 'Quy trình onboarding chưa được cập nhật sau khi có tuyển dụng đột xuất',
    correctiveAction: 'Tổ chức đào tạo bổ sung cho 15 công nhân, cập nhật hồ sơ đào tạo',
    preventiveAction: 'Thiết lập quy trình tự động nhắc đào tạo khi có nhân sự mới',
  },
  {
    id: 'CAPA-128',
    findingId: 'F-002',
    audit: 'BSCI - Xí nghiệp 1',
    severity: 'minor' as const,
    category: 'Thiết bị bảo hộ',
    description: 'Một số găng tay bảo hộ đã cũ, cần thay thế',
    owner: 'Nguyễn Văn D',
    department: 'Bảo vệ',
    factory: 'Xí nghiệp 1',
    deadline: '25/03/2026',
    progress: 80,
    status: 'in-progress' as const,
    rootCause: 'Kiểm tra định kỳ thiết bị bảo hộ chưa được thực hiện đầy đủ',
    correctiveAction: 'Mua sắm và phát găng tay mới cho toàn bộ công nhân',
    preventiveAction: 'Lập lịch kiểm tra và thay thế thiết bị bảo hộ định kỳ 3 tháng/lần',
  },
  {
    id: 'CAPA-129',
    findingId: 'F-004',
    audit: 'BSCI - Xí nghiệp 1',
    severity: 'major' as const,
    category: 'Kiểm soát kim loại',
    description: 'Thiếu bản ghi kiểm tra kim băng hàng ngày trong tuần 10-14/03',
    owner: 'Lê Văn E',
    department: 'Kho vận',
    factory: 'Xí nghiệp 1',
    deadline: '28/03/2026',
    progress: 30,
    status: 'in-progress' as const,
    rootCause: 'Nhân viên kho vận nghỉ ốm, người thay thế chưa được hướng dẫn đầy đủ',
    correctiveAction: 'Bổ sung bản ghi hồi tố, đào tạo lại toàn bộ nhân viên kho',
    preventiveAction: 'Xây dựng SOP rõ ràng hơn, bổ nhiệm backup cho các vị trí quan trọng',
  },
  {
    id: 'CAPA-123',
    findingId: 'F-018',
    audit: 'SA8000 - Xí nghiệp 2',
    severity: 'critical' as const,
    category: 'Hồ sơ lương',
    description: 'Phát hiện bảng lương không khớp với bảng chấm công tháng 2',
    owner: 'Phạm Thị F',
    department: 'Nhân sự',
    factory: 'Xí nghiệp 2',
    deadline: '20/03/2026',
    progress: 10,
    status: 'overdue' as const,
    rootCause: 'Lỗi phần mềm chấm công khi chuyển đổi ca làm việc',
    correctiveAction: 'Kiểm tra lại toàn bộ bảng lương tháng 2, chi trả bù cho công nhân',
    preventiveAction: 'Nâng cấp phần mềm chấm công, thêm bước kiểm tra chéo trước khi xuất lương',
  },
  {
    id: 'CAPA-125',
    findingId: 'F-021',
    audit: 'GRS - Khu B',
    severity: 'minor' as const,
    category: 'Quản lý hóa chất',
    description: 'Nhãn MSDS một số hóa chất chưa được cập nhật phiên bản mới',
    owner: 'Đỗ Văn G',
    department: 'Y tế',
    factory: 'Khu B',
    deadline: '01/04/2026',
    progress: 90,
    status: 'in-progress' as const,
    rootCause: 'Nhà cung cấp thay đổi thành phần nhưng chưa thông báo kịp thời',
    correctiveAction: 'Liên hệ nhà cung cấp lấy MSDS mới, cập nhật tại kho hóa chất',
    preventiveAction: 'Yêu cầu nhà cung cấp gửi MSDS khi có bất kỳ thay đổi nào',
  },
  {
    id: 'CAPA-126',
    findingId: 'F-025',
    audit: 'Higg FEM - Xí nghiệp 2',
    severity: 'observation' as const,
    category: 'Quản lý năng lượng',
    description: 'Chưa có mục tiêu giảm tiêu thụ điện rõ ràng',
    owner: 'Hoàng Văn H',
    department: 'Hành chính',
    factory: 'Xí nghiệp 2',
    deadline: '15/05/2026',
    progress: 20,
    status: 'pending' as const,
    rootCause: 'Chưa thiết lập chương trình quản lý năng lượng',
    correctiveAction: 'Xây dựng kế hoạch tiết kiệm năng lượng cho năm 2026',
    preventiveAction: 'Thiết lập hệ thống giám sát điện năng tự động',
  },
  {
    id: 'CAPA-124',
    findingId: 'F-015',
    audit: 'WRAP - Xí nghiệp 1',
    severity: 'major' as const,
    category: 'An ninh bảo vệ',
    description: 'Camera giám sát khu vực cổng chính bị hỏng 1 tuần chưa sửa',
    owner: 'Vũ Văn I',
    department: 'Bảo vệ',
    factory: 'Xí nghiệp 1',
    deadline: '18/03/2026',
    progress: 100,
    status: 'closed' as const,
    rootCause: 'Thiếu hợp đồng bảo trì thiết bị an ninh',
    correctiveAction: 'Sửa chữa camera, kiểm tra toàn bộ hệ thống giám sát',
    preventiveAction: 'Ký hợp đồng bảo trì với đơn vị chuyên nghiệp, kiểm tra định kỳ hàng tháng',
  },
  {
    id: 'CAPA-122',
    findingId: 'F-012',
    audit: 'ISO 9001 - Khu A',
    severity: 'minor' as const,
    category: 'Quản lý tài liệu',
    description: 'Quy trình kiểm soát sản phẩm không phù hợp chưa được cập nhật từ năm 2024',
    owner: 'Bùi Thị K',
    department: 'KSNB-QA',
    factory: 'Khu A',
    deadline: '10/04/2026',
    progress: 60,
    status: 'in-progress' as const,
    rootCause: 'Thiếu cơ chế rà soát tài liệu định kỳ',
    correctiveAction: 'Rà soát và cập nhật quy trình theo thực tế vận hành hiện tại',
    preventiveAction: 'Thiết lập lịch rà soát tài liệu hàng năm, phân công người chịu trách nhiệm',
  },
];

export function CapaList() {
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCapas = capas.filter(capa => {
    if (filterSeverity !== 'all' && capa.severity !== filterSeverity) return false;
    if (filterStatus !== 'all' && capa.status !== filterStatus) return false;
    if (filterDepartment !== 'all' && capa.department !== filterDepartment) return false;
    if (searchTerm && !capa.description.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !capa.id.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total: capas.length,
    overdue: capas.filter(c => c.status === 'overdue').length,
    inProgress: capas.filter(c => c.status === 'in-progress').length,
    closed: capas.filter(c => c.status === 'closed').length,
  };

  const departments = Array.from(new Set(capas.map(c => c.department)));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Quản lý CAPA & Finding</h1>
          <p className="text-slate-600 mt-1">Theo dõi hành động khắc phục và phòng ngừa</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          Tạo CAPA mới
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <p className="text-sm text-slate-600">Tổng CAPA</p>
          <p className="text-2xl font-semibold text-slate-900 mt-1">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg border border-red-200 p-5 bg-red-50">
          <p className="text-sm text-red-700">Quá hạn</p>
          <p className="text-2xl font-semibold text-red-900 mt-1">{stats.overdue}</p>
        </div>
        <div className="bg-white rounded-lg border border-blue-200 p-5 bg-blue-50">
          <p className="text-sm text-blue-700">Đang thực hiện</p>
          <p className="text-2xl font-semibold text-blue-900 mt-1">{stats.inProgress}</p>
        </div>
        <div className="bg-white rounded-lg border border-green-200 p-5 bg-green-50">
          <p className="text-sm text-green-700">Đã đóng</p>
          <p className="text-2xl font-semibold text-green-900 mt-1">{stats.closed}</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-slate-600" />
            <span className="text-sm font-medium text-slate-700">Bộ lọc:</span>
          </div>
          
          <select 
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tất cả mức độ</option>
            <option value="critical">Critical</option>
            <option value="major">Major</option>
            <option value="minor">Minor</option>
            <option value="observation">Observation</option>
          </select>

          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ xử lý</option>
            <option value="in-progress">Đang thực hiện</option>
            <option value="overdue">Quá hạn</option>
            <option value="closed">Đã đóng</option>
          </select>

          <select 
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tất cả phòng ban</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <div className="flex-1 max-w-xs relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm CAPA..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="ml-auto">
            <button className="flex items-center gap-2 px-3 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* CAPA List */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider whitespace-nowrap">
                  CAPA ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider whitespace-nowrap">
                  Mức độ
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider whitespace-nowrap hidden md:table-cell">
                  Danh mục
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider whitespace-nowrap">
                  Mô tả
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider whitespace-nowrap hidden lg:table-cell">
                  Người phụ trách
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider whitespace-nowrap hidden xl:table-cell">
                  Phòng ban
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider whitespace-nowrap">
                  Hạn xử lý
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider whitespace-nowrap hidden md:table-cell">
                  Tiến độ
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider whitespace-nowrap">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredCapas.map((capa) => (
                <tr key={capa.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="font-semibold text-slate-900">{capa.id}</span>
                    <p className="text-xs text-slate-500">{capa.findingId}</p>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <StatusBadge status={capa.severity} />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-700 hidden md:table-cell">
                    {capa.category}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700 max-w-xs">
                    <div className="line-clamp-2">
                      {capa.description}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{capa.audit}</p>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-medium text-blue-700">
                          {capa.owner.split(' ').slice(-2).map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="text-slate-900">{capa.owner}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-700 hidden xl:table-cell">
                    {capa.department}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <span className={capa.status === 'overdue' ? 'text-red-600 font-medium' : 'text-slate-700'}>
                      {capa.deadline}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 w-24 bg-slate-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            capa.progress === 100 ? 'bg-green-600' :
                            capa.progress >= 70 ? 'bg-blue-600' :
                            capa.progress >= 40 ? 'bg-yellow-600' :
                            'bg-red-600'
                          }`}
                          style={{ width: `${capa.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-slate-700 w-10">{capa.progress}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <StatusBadge status={capa.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCapas.length === 0 && (
          <div className="p-12 text-center">
            <AlertTriangle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-600">Không tìm thấy CAPA phù hợp với bộ lọc</p>
          </div>
        )}

        {filteredCapas.length > 0 && (
          <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Hiển thị <span className="font-medium">{filteredCapas.length}</span> / <span className="font-medium">{capas.length}</span> CAPA
            </div>
          </div>
        )}
      </div>
    </div>
  );
}