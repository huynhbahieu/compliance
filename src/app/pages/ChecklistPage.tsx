import { useParams, Link } from 'react-router';
import { ArrowLeft, Save, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface ChecklistItem {
  id: string;
  question: string;
  status: 'pass' | 'fail' | 'na' | null;
  note: string;
  evidence: string;
  responsible: string;
}

interface ChecklistSection {
  title: string;
  items: ChecklistItem[];
}

const initialChecklist: ChecklistSection[] = [
  {
    title: '1. Lãnh đạo và cam kết',
    items: [
      {
        id: '1.1',
        question: 'Ban lãnh đạo đã thiết lập chính sách chất lượng rõ ràng và được phổ biến?',
        status: 'pass',
        note: 'Chính sách được trưng bày tại văn phòng và phân xưởng',
        evidence: 'QP-001, Ảnh minh chứng',
        responsible: 'Giám đốc',
      },
      {
        id: '1.2',
        question: 'Có bổ nhiệm đại diện lãnh đạo chịu trách nhiệm về hệ thống quản lý chất lượng?',
        status: 'pass',
        note: 'Bà Nguyễn Thị B - Trưởng phòng KSNB',
        evidence: 'Quyết định số 01/2024',
        responsible: 'Giám đốc',
      },
      {
        id: '1.3',
        question: 'Có tổ chức họp rà soát quản lý định kỳ?',
        status: 'pass',
        note: 'Họp hàng quý, có biên bản',
        evidence: 'Biên bản họp Q1, Q2, Q3, Q4/2025',
        responsible: 'Đại diện lãnh đạo',
      },
    ],
  },
  {
    title: '2. Quản lý hồ sơ và tài liệu',
    items: [
      {
        id: '2.1',
        question: 'Tất cả tài liệu trong hệ thống có được kiểm soát phiên bản?',
        status: 'pass',
        note: 'Sử dụng mã tài liệu và số phiên bản',
        evidence: 'Danh mục tài liệu',
        responsible: 'KSNB-QA',
      },
      {
        id: '2.2',
        question: 'Hồ sơ lưu trữ có đầy đủ và dễ truy xuất?',
        status: 'fail',
        note: 'Thiếu một số hồ sơ đào tạo năm 2024',
        evidence: 'Kiểm tra kho lưu trữ',
        responsible: 'Nhân sự',
      },
      {
        id: '2.3',
        question: 'Tài liệu lỗi thời đã được loại bỏ hoặc đánh dấu rõ ràng?',
        status: 'pass',
        note: 'Tài liệu cũ được đóng dấu "HỦY"',
        evidence: 'Quy trình kiểm soát tài liệu',
        responsible: 'KSNB-QA',
      },
    ],
  },
  {
    title: '3. Đào tạo và năng lực',
    items: [
      {
        id: '3.1',
        question: 'Có xác định yêu cầu năng lực cho từng vị trí công việc?',
        status: 'pass',
        note: 'Bản mô tả công việc có nêu rõ yêu cầu',
        evidence: 'Job description',
        responsible: 'Nhân sự',
      },
      {
        id: '3.2',
        question: 'Nhân viên mới được đào tạo đầy đủ trước khi làm việc độc lập?',
        status: 'fail',
        note: '15 công nhân mới thiếu đào tạo an toàn lao động',
        evidence: 'Kiểm tra hồ sơ đào tạo',
        responsible: 'Nhân sự',
      },
      {
        id: '3.3',
        question: 'Có kế hoạch đào tạo hàng năm và theo dõi thực hiện?',
        status: 'pass',
        note: 'Kế hoạch 2026 đã được phê duyệt',
        evidence: 'Kế hoạch đào tạo 2026',
        responsible: 'Nhân sự',
      },
    ],
  },
  {
    title: '4. Truy xuất nguồn gốc',
    items: [
      {
        id: '4.1',
        question: 'Nguyên vật liệu được ghi nhận đầy đủ thông tin truy xuất?',
        status: 'pass',
        note: 'Có số lô, ngày nhập, nhà cung cấp',
        evidence: 'Phiếu nhập kho',
        responsible: 'Kho vận',
      },
      {
        id: '4.2',
        question: 'Có khả năng truy xuất sản phẩm từ khách hàng về nguồn vật liệu?',
        status: 'pass',
        note: 'Thử nghiệm truy xuất thành công',
        evidence: 'Bản ghi truy xuất',
        responsible: 'KSNB-QA',
      },
    ],
  },
  {
    title: '5. Sản phẩm không phù hợp',
    items: [
      {
        id: '5.1',
        question: 'Có quy trình xử lý sản phẩm không phù hợp?',
        status: 'pass',
        note: 'QP-008 - Kiểm soát sản phẩm không phù hợp',
        evidence: 'Quy trình QP-008',
        responsible: 'KSNB-QA',
      },
      {
        id: '5.2',
        question: 'Sản phẩm lỗi được cách ly và đánh dấu rõ ràng?',
        status: 'pass',
        note: 'Có khu vực riêng, thẻ màu đỏ',
        evidence: 'Quan sát tại xưởng',
        responsible: 'QC',
      },
      {
        id: '5.3',
        question: 'Có theo dõi và phân tích nguyên nhân lỗi?',
        status: 'pass',
        note: 'Báo cáo lỗi hàng tháng',
        evidence: 'Báo cáo chất lượng tháng 3/2026',
        responsible: 'KSNB-QA',
      },
    ],
  },
  {
    title: '6. Kiểm soát kim loại',
    items: [
      {
        id: '6.1',
        question: 'Có máy dò kim loại hoạt động tốt?',
        status: 'pass',
        note: 'Máy dò được hiệu chuẩn định kỳ',
        evidence: 'Chứng nhận hiệu chuẩn',
        responsible: 'QC',
      },
      {
        id: '6.2',
        question: 'Có bản ghi kiểm tra kim loại hàng ngày?',
        status: 'fail',
        note: 'Thiếu bản ghi tuần 10-14/03',
        evidence: 'Kiểm tra sổ ghi chép',
        responsible: 'Kho vận',
      },
      {
        id: '6.3',
        question: 'Nhân viên được đào tạo về kiểm soát kim loại?',
        status: 'pass',
        note: 'Đào tạo hàng năm và có chứng nhận',
        evidence: 'Chứng chỉ đào tạo',
        responsible: 'QC',
      },
    ],
  },
];

export function ChecklistPage() {
  const { id } = useParams();
  const [checklist, setChecklist] = useState<ChecklistSection[]>(initialChecklist);

  const handleStatusChange = (sectionIdx: number, itemIdx: number, status: 'pass' | 'fail' | 'na') => {
    const newChecklist = [...checklist];
    newChecklist[sectionIdx].items[itemIdx].status = status;
    setChecklist(newChecklist);
  };

  const handleNoteChange = (sectionIdx: number, itemIdx: number, note: string) => {
    const newChecklist = [...checklist];
    newChecklist[sectionIdx].items[itemIdx].note = note;
    setChecklist(newChecklist);
  };

  const totalItems = checklist.reduce((sum, section) => sum + section.items.length, 0);
  const passedItems = checklist.reduce(
    (sum, section) => sum + section.items.filter(item => item.status === 'pass').length,
    0
  );
  const failedItems = checklist.reduce(
    (sum, section) => sum + section.items.filter(item => item.status === 'fail').length,
    0
  );
  const naItems = checklist.reduce(
    (sum, section) => sum + section.items.filter(item => item.status === 'na').length,
    0
  );
  const completionRate = Math.round((passedItems / (totalItems - naItems)) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/audits" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-slate-900">Checklist đánh giá ISO 9001:2015</h1>
          <p className="text-slate-600 mt-1">Audit ID: #{id} - Khu A - 22/03/2026</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Save className="w-5 h-5" />
          Lưu checklist
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <p className="text-sm text-slate-600 mb-1">Tổng số câu hỏi</p>
          <p className="text-2xl font-semibold text-slate-900">{totalItems}</p>
        </div>
        <div className="bg-green-50 rounded-lg border border-green-200 p-5">
          <p className="text-sm text-green-700 mb-1">Đạt</p>
          <p className="text-2xl font-semibold text-green-900">{passedItems}</p>
        </div>
        <div className="bg-red-50 rounded-lg border border-red-200 p-5">
          <p className="text-sm text-red-700 mb-1">Không đạt</p>
          <p className="text-2xl font-semibold text-red-900">{failedItems}</p>
        </div>
        <div className="bg-slate-50 rounded-lg border border-slate-200 p-5">
          <p className="text-sm text-slate-700 mb-1">Không áp dụng</p>
          <p className="text-2xl font-semibold text-slate-900">{naItems}</p>
        </div>
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-5">
          <p className="text-sm text-blue-700 mb-1">Tỷ lệ đạt</p>
          <p className="text-2xl font-semibold text-blue-900">{completionRate}%</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-700">Tiến độ hoàn thành</span>
          <span className="text-sm font-semibold text-slate-900">{completionRate}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all ${
              completionRate >= 90 ? 'bg-green-600' :
              completionRate >= 80 ? 'bg-blue-600' :
              completionRate >= 70 ? 'bg-yellow-600' :
              'bg-red-600'
            }`}
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      {/* Checklist Sections */}
      <div className="space-y-6">
        {checklist.map((section, sectionIdx) => (
          <div key={sectionIdx} className="bg-white rounded-lg border border-slate-200">
            <div className="p-6 border-b border-slate-200 bg-slate-50">
              <h2 className="text-lg font-semibold text-slate-900">{section.title}</h2>
            </div>
            <div className="divide-y divide-slate-200">
              {section.items.map((item, itemIdx) => (
                <div key={item.id} className="p-6">
                  <div className="flex items-start gap-4">
                    <span className="text-sm font-semibold text-slate-600 mt-1">{item.id}</span>
                    <div className="flex-1 space-y-4">
                      <p className="font-medium text-slate-900">{item.question}</p>
                      
                      {/* Status Buttons */}
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-600">Đánh giá:</span>
                        <button
                          onClick={() => handleStatusChange(sectionIdx, itemIdx, 'pass')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                            item.status === 'pass'
                              ? 'bg-green-600 text-white'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Đạt
                        </button>
                        <button
                          onClick={() => handleStatusChange(sectionIdx, itemIdx, 'fail')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                            item.status === 'fail'
                              ? 'bg-red-600 text-white'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          <XCircle className="w-4 h-4" />
                          Không đạt
                        </button>
                        <button
                          onClick={() => handleStatusChange(sectionIdx, itemIdx, 'na')}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                            item.status === 'na'
                              ? 'bg-slate-600 text-white'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          <AlertCircle className="w-4 h-4" />
                          N/A
                        </button>
                      </div>

                      {/* Details */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Ghi chú / Nhận xét
                          </label>
                          <textarea
                            value={item.note}
                            onChange={(e) => handleNoteChange(sectionIdx, itemIdx, e.target.value)}
                            rows={2}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập ghi chú..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Bằng chứng
                          </label>
                          <input
                            type="text"
                            value={item.evidence}
                            readOnly
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-slate-600">Người phụ trách:</span>
                        <span className="font-medium text-slate-900">{item.responsible}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between bg-white rounded-lg border border-slate-200 p-6">
        <div className="text-sm text-slate-600">
          Đã hoàn thành {passedItems + failedItems + naItems} / {totalItems} câu hỏi
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors">
            Xuất PDF
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Save className="w-5 h-5" />
            Lưu và hoàn thành
          </button>
        </div>
      </div>
    </div>
  );
}
