import { StatusBadge } from '../components/StatusBadge';
import { 
  Filter, 
  Download, 
  Plus, 
  AlertCircle, 
  FileText, 
  Calendar, 
  Building2,
  Upload,
  Eye,
  Trash2,
  X,
  Search,
  Paperclip,
  FolderOpen
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

// File type definition
type CertificateFile = {
  id: string;
  certificateId: number;
  name: string;
  size: number;
  type: string;
  uploadDate: string;
  uploadedBy: string;
  url: string; // Base64 or blob URL
};

const certificates = [
  {
    id: 1,
    name: 'ISO 9001:2015',
    scope: 'Hệ thống quản lý chất lượng',
    factory: 'Khu A',
    issuer: 'SGS Vietnam',
    issueDate: '10/05/2023',
    expiryDate: '10/05/2026',
    status: 'compliant' as const,
    daysUntilExpiry: 52,
    certificateNumber: 'VN-ISO-9001-2023-1234',
    auditor: 'Nguyễn Văn A',
  },
  {
    id: 2,
    name: 'ISO 14001:2015',
    scope: 'Hệ thống quản lý môi trường',
    factory: 'Khu A',
    issuer: 'TÜV Rheinland',
    issueDate: '15/08/2023',
    expiryDate: '15/08/2026',
    status: 'compliant' as const,
    daysUntilExpiry: 149,
    certificateNumber: 'VN-ISO-14001-2023-5678',
    auditor: 'Trần Thị B',
  },
  {
    id: 3,
    name: 'SA8000',
    scope: 'Trách nhiệm xã hội',
    factory: 'Xí nghiệp 1',
    issuer: 'SAI Certified',
    issueDate: '01/04/2024',
    expiryDate: '01/04/2027',
    status: 'compliant' as const,
    daysUntilExpiry: 377,
    certificateNumber: 'SA8000-2024-VN-001',
    auditor: 'Lê Văn C',
  },
  {
    id: 4,
    name: 'WRAP',
    scope: 'Sản xuất có trách nhiệm',
    factory: 'Xí nghiệp 1',
    issuer: 'WRAP Certification',
    issueDate: '20/03/2025',
    expiryDate: '20/03/2026',
    status: 'pending' as const,
    daysUntilExpiry: 1,
    certificateNumber: 'WRAP-2025-VN-789',
    auditor: 'Phạm Văn D',
  },
  {
    id: 5,
    name: 'GRS',
    scope: 'Global Recycled Standard',
    factory: 'Khu B',
    issuer: 'Control Union',
    issueDate: '05/02/2024',
    expiryDate: '05/02/2025',
    status: 'expired' as const,
    daysUntilExpiry: -42,
    certificateNumber: 'GRS-2024-VN-456',
    auditor: 'Hoàng Thị E',
  },
  {
    id: 6,
    name: 'RCS',
    scope: 'Recycled Claim Standard',
    factory: 'Khu B',
    issuer: 'Control Union',
    issueDate: '10/01/2025',
    expiryDate: '10/01/2026',
    status: 'compliant' as const,
    daysUntilExpiry: 297,
    certificateNumber: 'RCS-2025-VN-321',
    auditor: 'Đỗ Văn F',
  },
  {
    id: 7,
    name: 'BSCI',
    scope: 'Tuân thủ xã hội kinh doanh',
    factory: 'Xí nghiệp 2',
    issuer: 'TÜV Rheinland',
    issueDate: '15/06/2024',
    expiryDate: '15/06/2026',
    status: 'compliant' as const,
    daysUntilExpiry: 88,
    certificateNumber: 'BSCI-2024-VN-888',
    auditor: 'Vũ Thị G',
  },
  {
    id: 8,
    name: 'OHSAS 18001',
    scope: 'An toàn sức khỏe nghề nghiệp',
    factory: 'Xí nghiệp 2',
    issuer: 'Intertek',
    issueDate: '01/12/2023',
    expiryDate: '01/04/2026',
    status: 'pending' as const,
    daysUntilExpiry: 13,
    certificateNumber: 'OH-18001-2023-VN-999',
    auditor: 'Bùi Văn H',
  },
  {
    id: 9,
    name: 'Higg FEM',
    scope: 'Đánh giá môi trường nhà máy',
    factory: 'Xí nghiệp 2',
    issuer: 'SAC Verified',
    issueDate: '20/09/2024',
    expiryDate: '20/09/2025',
    status: 'compliant' as const,
    daysUntilExpiry: 185,
    certificateNumber: 'HIGG-FEM-2024-VN-555',
    auditor: 'Nguyễn Thị I',
  },
  {
    id: 10,
    name: 'SMETA',
    scope: 'Sedex Members Ethical Trade Audit',
    factory: 'Khu A',
    issuer: 'Intertek',
    issueDate: '10/11/2024',
    expiryDate: '10/11/2026',
    status: 'compliant' as const,
    daysUntilExpiry: 236,
    certificateNumber: 'SMETA-2024-VN-777',
    auditor: 'Trần Văn K',
  },
];

export function CertificateList() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterFactory, setFilterFactory] = useState('all');

  const filteredCertificates = certificates.filter(cert => {
    if (filterStatus !== 'all' && cert.status !== filterStatus) return false;
    if (filterFactory !== 'all' && cert.factory !== filterFactory) return false;
    return true;
  });

  const stats = {
    total: certificates.length,
    valid: certificates.filter(c => c.status === 'compliant').length,
    expiringSoon: certificates.filter(c => c.status === 'pending').length,
    expired: certificates.filter(c => c.status === 'expired').length,
  };

  const factories = Array.from(new Set(certificates.map(c => c.factory)));

  const getStatusFromDays = (days: number) => {
    if (days < 0) return 'expired';
    if (days <= 60) return 'pending';
    return 'compliant';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Quản lý Chứng chỉ</h1>
          <p className="text-slate-600 mt-1">Theo dõi chứng nhận và chứng chỉ tuân thủ</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          Thêm chứng chỉ mới
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm text-slate-600">Tổng chứng chỉ</p>
              <p className="text-2xl font-semibold text-slate-900 mt-1">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 rounded-lg border border-green-200 p-5">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-sm text-green-700">Còn hiệu lực</p>
              <p className="text-2xl font-semibold text-green-900 mt-1">{stats.valid}</p>
            </div>
          </div>
        </div>
        <div className="bg-orange-50 rounded-lg border border-orange-200 p-5">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-8 h-8 text-orange-600" />
            <div>
              <p className="text-sm text-orange-700">Sắp hết hạn</p>
              <p className="text-2xl font-semibold text-orange-900 mt-1">{stats.expiringSoon}</p>
            </div>
          </div>
        </div>
        <div className="bg-red-50 rounded-lg border border-red-200 p-5">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-8 h-8 text-red-600" />
            <div>
              <p className="text-sm text-red-700">Đã hết hạn</p>
              <p className="text-2xl font-semibold text-red-900 mt-1">{stats.expired}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-slate-600" />
            <span className="text-sm font-medium text-slate-700">Bộ lọc:</span>
          </div>
          
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="compliant">Còn hiệu lực</option>
            <option value="pending">Sắp hết hạn</option>
            <option value="expired">Đã hết hạn</option>
          </select>

          <select 
            value={filterFactory}
            onChange={(e) => setFilterFactory(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tất cả đơn vị</option>
            {factories.map(factory => (
              <option key={factory} value={factory}>{factory}</option>
            ))}
          </select>

          <div className="ml-auto">
            <button className="flex items-center gap-2 px-3 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Certificate Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCertificates.map((cert) => (
          <div key={cert.id} className="bg-white rounded-lg border border-slate-200 hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900">{cert.name}</h3>
                  <p className="text-sm text-slate-600 mt-1">{cert.scope}</p>
                </div>
                <StatusBadge status={cert.status} />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600">Đơn vị áp dụng:</span>
                  <span className="font-medium text-slate-900">{cert.factory}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <FileText className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600">Tổ chức chứng nhận:</span>
                  <span className="font-medium text-slate-900">{cert.issuer}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600">Ngày cấp:</span>
                  <span className="font-medium text-slate-900">{cert.issueDate}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600">Ngày hết hạn:</span>
                  <span className={`font-medium ${
                    cert.daysUntilExpiry < 0 ? 'text-red-600' :
                    cert.daysUntilExpiry <= 60 ? 'text-orange-600' :
                    'text-slate-900'
                  }`}>
                    {cert.expiryDate}
                  </span>
                </div>

                {cert.daysUntilExpiry >= 0 && (
                  <div className={`mt-4 px-3 py-2 rounded-lg text-sm ${
                    cert.daysUntilExpiry <= 60 
                      ? 'bg-orange-50 text-orange-700 border border-orange-200' 
                      : 'bg-green-50 text-green-700 border border-green-200'
                  }`}>
                    {cert.daysUntilExpiry <= 60 
                      ? `⚠️ Còn ${cert.daysUntilExpiry} ngày hết hạn`
                      : `✓ Còn ${cert.daysUntilExpiry} ngày`
                    }
                  </div>
                )}

                {cert.daysUntilExpiry < 0 && (
                  <div className="mt-4 px-3 py-2 rounded-lg text-sm bg-red-50 text-red-700 border border-red-200">
                    ✕ Đã hết hạn {Math.abs(cert.daysUntilExpiry)} ngày
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  Số chứng chỉ: {cert.certificateNumber}
                </div>
                <Link to={`/certificate/${cert.id}`} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Xem chi tiết →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCertificates.length === 0 && (
        <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
          <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-600">Không tìm thấy chứng chỉ phù hợp với bộ lọc</p>
        </div>
      )}
    </div>
  );
}