import { useParams, Link } from 'react-router';
import { StatusBadge } from '../components/StatusBadge';
import { 
  ArrowLeft, 
  Download, 
  FileText, 
  Calendar, 
  Building2, 
  User,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Paperclip
} from 'lucide-react';

const auditDetails = {
  id: 1,
  program: 'BSCI (Business Social Compliance Initiative)',
  customer: 'ZARA',
  factory: 'Xí nghiệp 1',
  type: 'Khách hàng',
  auditor: 'TÜV Rheinland',
  date: '15/04/2026',
  duration: '2 ngày',
  result: 'Đạt - 88/100',
  cost: '15,000,000 VNĐ',
  status: 'in-progress' as const,
  scope: 'Đánh giá toàn diện về điều kiện lao động, an toàn sức khỏe nghề nghiệp, môi trường làm việc, và các tiêu chuẩn xã hội theo yêu cầu BSCI.',
  teamMembers: [
    { name: 'Nguyễn Văn A', role: 'Lead Auditor', department: 'KSNB-QA' },
    { name: 'Trần Thị B', role: 'Co-Auditor', department: 'Nhân sự' },
    { name: 'Lê Văn C', role: 'Technical Expert', department: 'Xí nghiệp 1' },
  ],
};

const findings = [
  {
    id: 'F-001',
    severity: 'major' as const,
    category: 'Đào tạo nhân viên',
    description: 'Thiếu hồ sơ đào tạo an toàn lao động cho 15 công nhân mới',
    requirement: 'BSCI Section 8.2',
    evidence: 'Kiểm tra hồ sơ nhân sự ngày 15/04/2026',
    capaId: 'CAPA-127',
  },
  {
    id: 'F-002',
    severity: 'minor' as const,
    category: 'Thiết bị bảo hộ',
    description: 'Một số găng tay bảo hộ đã cũ, cần thay thế',
    requirement: 'BSCI Section 6.4',
    evidence: 'Quan sát tại chuyền may số 3',
    capaId: 'CAPA-128',
  },
  {
    id: 'F-003',
    severity: 'observation' as const,
    category: 'Quản lý tài liệu',
    description: 'Quy trình khiếu nại chưa được cập nhật phiên bản mới nhất',
    requirement: 'BSCI Section 11.1',
    evidence: 'Xem xét tài liệu QMS',
    capaId: null,
  },
  {
    id: 'F-004',
    severity: 'major' as const,
    category: 'Kiểm soát kim loại',
    description: 'Thiếu bản ghi kiểm tra kim băng hàng ngày trong tuần 10-14/03',
    requirement: 'BSCI Section 7.3',
    evidence: 'Kiểm tra bản ghi tại kho thành phẩm',
    capaId: 'CAPA-129',
  },
];

const documents = [
  { name: 'BSCI_Audit_Report_Final.pdf', type: 'Báo cáo audit', size: '2.4 MB', date: '16/04/2026' },
  { name: 'Checklist_BSCI_2026.xlsx', type: 'Checklist đánh giá', size: '856 KB', date: '15/04/2026' },
  { name: 'Evidence_Photos.zip', type: 'Ảnh minh chứng', size: '15.2 MB', date: '15/04/2026' },
  { name: 'Interview_Records.pdf', type: 'Biên bản phỏng vấn', size: '1.1 MB', date: '15/04/2026' },
];

export function AuditDetail() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/audits" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-slate-900">{auditDetails.program}</h1>
          <p className="text-slate-600 mt-1">Audit ID: #{id}</p>
        </div>
        <StatusBadge status={auditDetails.status} />
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
          <Download className="w-5 h-5" />
          Export báo cáo
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Khách hàng</p>
              <p className="font-semibold text-slate-900">{auditDetails.customer}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Ngày thực hiện</p>
              <p className="font-semibold text-slate-900">{auditDetails.date}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Auditor</p>
              <p className="font-semibold text-slate-900">{auditDetails.auditor}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Chi phí</p>
              <p className="font-semibold text-slate-900">{auditDetails.cost}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Audit Information */}
          <div className="bg-white rounded-lg border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Thông tin Audit</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Nhà máy / Xí nghiệp</p>
                  <p className="font-medium text-slate-900">{auditDetails.factory}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Loại audit</p>
                  <p className="font-medium text-slate-900">{auditDetails.type}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Thời gian</p>
                  <p className="font-medium text-slate-900">{auditDetails.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Kết quả</p>
                  <p className="font-medium text-slate-900">{auditDetails.result}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Phạm vi đánh giá</p>
                <p className="text-slate-700">{auditDetails.scope}</p>
              </div>
            </div>
          </div>

          {/* Findings */}
          <div className="bg-white rounded-lg border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">Finding ({findings.length})</h2>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-slate-600">Major: 2</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-600">Minor: 1</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-600">Observation: 1</span>
                </div>
              </div>
            </div>
            <div className="divide-y divide-slate-200">
              {findings.map((finding) => (
                <div key={finding.id} className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-slate-900">{finding.id}</span>
                      <StatusBadge status={finding.severity} />
                      <span className="text-sm text-slate-600">{finding.category}</span>
                    </div>
                    {finding.capaId && (
                      <Link 
                        to="/capa"
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        {finding.capaId} →
                      </Link>
                    )}
                  </div>
                  <p className="text-slate-900 mb-2">{finding.description}</p>
                  <div className="flex items-start gap-4 text-sm">
                    <div className="flex items-start gap-2">
                      <FileText className="w-4 h-4 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-slate-600">Yêu cầu: {finding.requirement}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-slate-600">Bằng chứng: {finding.evidence}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-lg border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Tài liệu đính kèm</h2>
            </div>
            <div className="divide-y divide-slate-200">
              {documents.map((doc, idx) => (
                <div key={idx} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Paperclip className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 truncate">{doc.name}</p>
                    <p className="text-sm text-slate-600">{doc.type} • {doc.size}</p>
                  </div>
                  <div className="text-sm text-slate-600">{doc.date}</div>
                  <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
                    <Download className="w-4 h-4 text-slate-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - 1/3 */}
        <div className="space-y-6">
          {/* Audit Team */}
          <div className="bg-white rounded-lg border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Đội ngũ Audit</h2>
            </div>
            <div className="p-6 space-y-4">
              {auditDetails.teamMembers.map((member, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-slate-700">
                      {member.name.split(' ').slice(-2).map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{member.name}</p>
                    <p className="text-sm text-slate-600">{member.role}</p>
                    <p className="text-xs text-slate-500">{member.department}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-lg border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Tóm tắt kết quả</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-700">Điểm số tổng</span>
                <span className="text-2xl font-semibold text-slate-900">88/100</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div className="bg-green-600 h-3 rounded-full" style={{ width: '88%' }} />
              </div>
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Đạt</span>
                  <span className="font-medium text-green-600">78 điều khoản</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Không đạt</span>
                  <span className="font-medium text-red-600">4 điều khoản</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Không áp dụng</span>
                  <span className="font-medium text-slate-600">8 điều khoản</span>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Đạt tiêu chuẩn BSCI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
