import { useState } from 'react';
import { 
  Upload, 
  Download, 
  Eye, 
  Trash2, 
  Search, 
  Filter,
  FileText,
  Image as ImageIcon,
  File,
  X,
  Paperclip,
  Calendar,
  User,
  HardDrive
} from 'lucide-react';

type CertificateFile = {
  id: string;
  certificateId: number;
  certificateName: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadDate: string;
  uploadedBy: string;
  description: string;
  tags: string[];
};

// Mock data - File chứng chỉ đã lưu
const mockFiles: CertificateFile[] = [
  {
    id: 'file-001',
    certificateId: 1,
    certificateName: 'ISO 9001:2015',
    fileName: 'ISO_9001_2015_Certificate_Original.pdf',
    fileSize: 2458000,
    fileType: 'application/pdf',
    uploadDate: '10/05/2023',
    uploadedBy: 'Nguyễn Văn A',
    description: 'Chứng chỉ ISO 9001:2015 gốc được cấp bởi SGS Vietnam',
    tags: ['ISO 9001', 'Chất lượng', 'SGS', 'Khu A']
  },
  {
    id: 'file-002',
    certificateId: 1,
    certificateName: 'ISO 9001:2015',
    fileName: 'ISO_9001_Audit_Report_2023.pdf',
    fileSize: 5120000,
    fileType: 'application/pdf',
    uploadDate: '05/05/2023',
    uploadedBy: 'Nguyễn Văn A',
    description: 'Báo cáo audit chi tiết cho ISO 9001:2015',
    tags: ['ISO 9001', 'Audit Report', 'SGS']
  },
  {
    id: 'file-003',
    certificateId: 2,
    certificateName: 'ISO 14001:2015',
    fileName: 'ISO_14001_Certificate.pdf',
    fileSize: 1890000,
    fileType: 'application/pdf',
    uploadDate: '15/08/2023',
    uploadedBy: 'Trần Thị B',
    description: 'Chứng chỉ ISO 14001:2015 - Hệ thống quản lý môi trường',
    tags: ['ISO 14001', 'Môi trường', 'TÜV']
  },
  {
    id: 'file-004',
    certificateId: 3,
    certificateName: 'SA8000',
    fileName: 'SA8000_Certificate_2024.pdf',
    fileSize: 2100000,
    fileType: 'application/pdf',
    uploadDate: '01/04/2024',
    uploadedBy: 'Lê Văn C',
    description: 'Chứng chỉ SA8000 - Trách nhiệm xã hội',
    tags: ['SA8000', 'Xã hội', 'Xí nghiệp 1']
  },
  {
    id: 'file-005',
    certificateId: 3,
    certificateName: 'SA8000',
    fileName: 'SA8000_Factory_Photos.jpg',
    fileSize: 3450000,
    fileType: 'image/jpeg',
    uploadDate: '28/03/2024',
    uploadedBy: 'Lê Văn C',
    description: 'Hình ảnh xí nghiệp trong quá trình audit SA8000',
    tags: ['SA8000', 'Photos', 'Xí nghiệp 1']
  },
  {
    id: 'file-006',
    certificateId: 4,
    certificateName: 'WRAP',
    fileName: 'WRAP_Certificate_2025.pdf',
    fileSize: 1650000,
    fileType: 'application/pdf',
    uploadDate: '20/03/2025',
    uploadedBy: 'Phạm Văn D',
    description: 'Chứng ch�� WRAP - Sản xuất có trách nhiệm',
    tags: ['WRAP', 'Xí nghiệp 1']
  },
  {
    id: 'file-007',
    certificateId: 5,
    certificateName: 'GRS',
    fileName: 'GRS_Certificate_Expired.pdf',
    fileSize: 1200000,
    fileType: 'application/pdf',
    uploadDate: '05/02/2024',
    uploadedBy: 'Hoàng Thị E',
    description: 'Chứng chỉ GRS (Đã hết hạn)',
    tags: ['GRS', 'Recycled', 'Khu B', 'Hết hạn']
  },
  {
    id: 'file-008',
    certificateId: 6,
    certificateName: 'RCS',
    fileName: 'RCS_Certificate_2025.pdf',
    fileSize: 1450000,
    fileType: 'application/pdf',
    uploadDate: '10/01/2025',
    uploadedBy: 'Đỗ Văn F',
    description: 'Chứng chỉ RCS - Recycled Claim Standard',
    tags: ['RCS', 'Recycled', 'Khu B']
  },
  {
    id: 'file-009',
    certificateId: 7,
    certificateName: 'BSCI',
    fileName: 'BSCI_Audit_Certificate.pdf',
    fileSize: 2800000,
    fileType: 'application/pdf',
    uploadDate: '15/06/2024',
    uploadedBy: 'Vũ Thị G',
    description: 'Chứng chỉ BSCI - Tuân thủ xã hội kinh doanh',
    tags: ['BSCI', 'Xã hội', 'Xí nghiệp 2']
  },
  {
    id: 'file-010',
    certificateId: 8,
    certificateName: 'OHSAS 18001',
    fileName: 'OHSAS_18001_Certificate.pdf',
    fileSize: 1980000,
    fileType: 'application/pdf',
    uploadDate: '01/12/2023',
    uploadedBy: 'Bùi Văn H',
    description: 'Chứng chỉ OHSAS 18001 - An toàn sức khỏe nghề nghiệp',
    tags: ['OHSAS', 'An toàn', 'Xí nghiệp 2']
  },
  {
    id: 'file-011',
    certificateId: 9,
    certificateName: 'Higg FEM',
    fileName: 'Higg_FEM_Assessment_2024.pdf',
    fileSize: 4200000,
    fileType: 'application/pdf',
    uploadDate: '20/09/2024',
    uploadedBy: 'Nguyễn Thị I',
    description: 'Báo cáo đánh giá Higg FEM',
    tags: ['Higg FEM', 'Môi trường', 'Xí nghiệp 2']
  },
  {
    id: 'file-012',
    certificateId: 10,
    certificateName: 'SMETA',
    fileName: 'SMETA_Audit_Report_2024.pdf',
    fileSize: 3680000,
    fileType: 'application/pdf',
    uploadDate: '10/11/2024',
    uploadedBy: 'Trần Văn K',
    description: 'Báo cáo SMETA Audit đầy đủ',
    tags: ['SMETA', 'Sedex', 'Khu A']
  },
];

export function CertificateStorage() {
  const [files, setFiles] = useState<CertificateFile[]>(mockFiles);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedFile, setSelectedFile] = useState<CertificateFile | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Filter files
  const filteredFiles = files.filter(file => {
    const matchesSearch = 
      file.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.certificateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = filterType === 'all' || 
      (filterType === 'pdf' && file.fileType === 'application/pdf') ||
      (filterType === 'image' && file.fileType.startsWith('image/'));
    
    return matchesSearch && matchesType;
  });

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // Get file icon
  const getFileIcon = (fileType: string) => {
    if (fileType === 'application/pdf') {
      return <FileText className="w-5 h-5 text-red-600" />;
    }
    if (fileType.startsWith('image/')) {
      return <ImageIcon className="w-5 h-5 text-blue-600" />;
    }
    return <File className="w-5 h-5 text-slate-600" />;
  };

  // Handle file upload (mock)
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (uploadedFiles && uploadedFiles.length > 0) {
      // Mock upload - in reality would upload to server
      alert(`Đã upload ${uploadedFiles.length} file thành công!`);
      setIsUploadModalOpen(false);
    }
  };

  // Handle file delete
  const handleDeleteFile = (fileId: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa file này?')) {
      setFiles(files.filter(f => f.id !== fileId));
      setSelectedFile(null);
    }
  };

  // Stats
  const stats = {
    total: files.length,
    pdf: files.filter(f => f.fileType === 'application/pdf').length,
    images: files.filter(f => f.fileType.startsWith('image/')).length,
    totalSize: files.reduce((sum, f) => sum + f.fileSize, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Kho lưu trữ Chứng chỉ</h1>
          <p className="text-slate-600 mt-1">Quản lý và tìm kiếm file chứng chỉ đã lưu</p>
        </div>
        <button 
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Upload className="w-5 h-5" />
          Upload file mới
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <Paperclip className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm text-slate-600">Tổng số file</p>
              <p className="text-2xl font-semibold text-slate-900 mt-1">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-red-600" />
            <div>
              <p className="text-sm text-slate-600">File PDF</p>
              <p className="text-2xl font-semibold text-slate-900 mt-1">{stats.pdf}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <ImageIcon className="w-8 h-8 text-purple-600" />
            <div>
              <p className="text-sm text-slate-600">Hình ảnh</p>
              <p className="text-2xl font-semibold text-slate-900 mt-1">{stats.images}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <HardDrive className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-sm text-slate-600">Dung lượng</p>
              <p className="text-2xl font-semibold text-slate-900 mt-1">{formatFileSize(stats.totalSize)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên file, chứng chỉ, mô tả, tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-slate-600" />
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả loại</option>
              <option value="pdf">PDF</option>
              <option value="image">Hình ảnh</option>
            </select>
          </div>

          <button className="flex items-center gap-2 px-3 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" />
            Export danh sách
          </button>
        </div>
      </div>

      {/* File List */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider whitespace-nowrap">
                  File
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider whitespace-nowrap hidden md:table-cell">
                  Chứng chỉ
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider whitespace-nowrap hidden lg:table-cell">
                  Kích thước
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider whitespace-nowrap hidden xl:table-cell">
                  Người upload
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider whitespace-nowrap">
                  Ngày upload
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-slate-600 uppercase tracking-wider whitespace-nowrap">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredFiles.map((file) => (
                <tr key={file.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      {getFileIcon(file.fileType)}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-900 truncate max-w-[200px]">
                          {file.fileName}
                        </p>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                          {file.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap hidden md:table-cell">
                    <span className="text-sm text-slate-900">{file.certificateName}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap hidden lg:table-cell">
                    <span className="text-sm text-slate-600">{formatFileSize(file.fileSize)}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap hidden xl:table-cell">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span className="text-sm text-slate-600">{file.uploadedBy}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0 hidden sm:block" />
                      <span className="text-sm text-slate-600">{file.uploadDate}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => setSelectedFile(file)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteFile(file.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredFiles.length === 0 && (
          <div className="p-12 text-center">
            <FileText className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-600">Không tìm thấy file phù hợp</p>
          </div>
        )}
      </div>

      {/* File Detail Modal */}
      {selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="text-lg font-semibold text-slate-900">Chi tiết File</h3>
              <button 
                onClick={() => setSelectedFile(null)}
                className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  {getFileIcon(selectedFile.fileType)}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-slate-900 text-lg">{selectedFile.fileName}</h4>
                  <p className="text-sm text-slate-600 mt-1">{selectedFile.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Chứng chỉ</p>
                  <p className="text-sm font-medium text-slate-900">{selectedFile.certificateName}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Kích thước</p>
                  <p className="text-sm font-medium text-slate-900">{formatFileSize(selectedFile.fileSize)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Người upload</p>
                  <p className="text-sm font-medium text-slate-900">{selectedFile.uploadedBy}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Ngày upload</p>
                  <p className="text-sm font-medium text-slate-900">{selectedFile.uploadDate}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500 mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {selectedFile.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md border border-blue-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                Download
              </button>
              <button 
                onClick={() => handleDeleteFile(selectedFile.id)}
                className="flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Upload file chứng chỉ</h3>
              <button 
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Chứng chỉ liên quan
                </label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>ISO 9001:2015</option>
                  <option>ISO 14001:2015</option>
                  <option>SA8000</option>
                  <option>WRAP</option>
                  <option>GRS</option>
                  <option>RCS</option>
                  <option>BSCI</option>
                  <option>OHSAS 18001</option>
                  <option>Higg FEM</option>
                  <option>SMETA</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Chọn file
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                  <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <p className="text-sm text-slate-600 mb-2">Kéo thả file hoặc click để chọn</p>
                  <p className="text-xs text-slate-500">PDF, JPG, PNG (Tối đa 10MB)</p>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,.jpg,.jpeg,.png"
                    multiple
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                  >
                    Chọn file
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Mô tả (tùy chọn)
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Mô tả ngắn về file này..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tags (tùy chọn)
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập tags, cách nhau bằng dấu phẩy"
                />
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 flex gap-3">
              <button 
                onClick={() => setIsUploadModalOpen(false)}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Hủy
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}