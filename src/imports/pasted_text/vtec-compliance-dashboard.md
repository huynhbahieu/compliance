Thiết kế một web app dashboard nội bộ cho công ty may mặc VTEC, dùng để quản lý tuân thủ tiêu chuẩn khách hàng, audit, chứng chỉ, hồ sơ minh chứng và hành động khắc phục CAPA.

Bối cảnh:
	•	Đây là phần mềm nội bộ cho doanh nghiệp gia công may mặc.
	•	Người dùng chính gồm: Ban lãnh đạo, KSNB-QA, nhân sự, hành chính, bảo vệ, y tế, kho vận, quản lý xí nghiệp, auditor nội bộ.
	•	Hệ thống phải bám sát cách KIỂM SOÁT NỘI BỘ - VTEC đang vận hành bằng file Excel, Google Sheet và checklist đánh giá tuân thủ.
	•	Không thiết kế theo kiểu CRM bán hàng. Đây là hệ thống quản lý compliance / audit / chứng nhận / tài liệu tuân thủ cho nhà máy may.

Mục tiêu thiết kế:
	•	Giao diện hiện đại, rõ ràng, chuyên nghiệp, dễ nhìn, thiên về vận hành doanh nghiệp.
	•	Tông cảm giác: internal enterprise SaaS, đáng tin cậy, gọn, sạch, nhiều dữ liệu nhưng không rối.
	•	Ưu tiên desktop web app.
	•	Layout tối ưu cho màn hình quản trị nhiều bảng dữ liệu.
	•	Dùng design system nhất quán, có card, table, status badge, progress bar, filter bar, side navigation.
	•	Phù hợp cho dữ liệu dài, nhiều cột, nhiều trạng thái.
	•	Ngành may mặc nên có cảm giác vận hành nhà máy, kiểm soát nội bộ, đánh giá tiêu chuẩn, nhưng tránh minh họa màu mè.

Yêu cầu IA và module chính:
	1.	Dashboard tổng quan

	•	KPI cards: số tiêu chuẩn đang áp dụng, số audit trong tháng, số CAPA quá hạn, số chứng chỉ sắp hết hạn, tỷ lệ tuân thủ chung.
	•	Biểu đồ trạng thái CAPA theo phòng ban.
	•	Biểu đồ số audit theo tháng/quý.
	•	Danh sách việc cần xử lý ngay: audit sắp đến hạn, finding chưa đóng, chứng chỉ sắp hết hạn, tài liệu còn thiếu.
	•	Heatmap hoặc bảng tóm tắt theo nhà máy / xí nghiệp / khách hàng.

	2.	Quản lý tiêu chuẩn và khách hàng

	•	Danh sách các chương trình / tiêu chuẩn như ISO 9001, SA8000, BSCI, WRAP, Better Work, Higg FEM, Nike CLS, GRS, RCS, GMP, SMETA.
	•	Gắn tiêu chuẩn với khách hàng / brand và với từng nhà máy hoặc xí nghiệp.
	•	Mỗi tiêu chuẩn có trạng thái áp dụng, owner phụ trách, chu kỳ audit, tài liệu liên quan.

	3.	Quản lý chứng chỉ / chứng nhận

	•	Bảng danh sách chứng chỉ với các cột: tên chứng chỉ, đơn vị áp dụng, tổ chức chứng nhận, ngày cấp, ngày hết hạn, trạng thái, file đính kèm.
	•	Có cảnh báo màu cho chứng chỉ sắp hết hạn.
	•	Có trang chi tiết chứng chỉ với lịch sử gia hạn.

	4.	Quản lý audit

	•	Danh sách audit với loại audit: nội bộ, khách hàng, bên thứ ba, tái đánh giá, follow-up.
	•	Các cột: chương trình/tiêu chuẩn, khách hàng, vendor/factory, auditor, ngày audit, kết quả, chi phí, trạng thái.
	•	Có calendar view và table view.
	•	Có trang chi tiết một đợt audit gồm phạm vi, checklist, finding, báo cáo, file minh chứng.

	5.	Quản lý finding và CAPA

	•	Bảng finding với mức độ: Critical, Major, Minor, Observation.
	•	Bảng CAPA có owner, deadline, root cause, corrective action, preventive action, evidence upload, approval status.
	•	Có progress tracking theo phần trăm hoàn thành.
	•	Có bộ lọc theo phòng ban, nhà máy, khách hàng, tiêu chuẩn, quá hạn/chưa quá hạn.

	6.	Quản lý checklist đánh giá

	•	Giao diện checklist audit theo nhóm câu hỏi.
	•	Có nhóm điều khoản như: lãnh đạo, hồ sơ, đào tạo, truy xuất, sản phẩm không phù hợp, kiểm soát kim loại, thiết bị đo lường, 5S, hành động khắc phục, cải tiến.
	•	Mỗi câu hỏi có trạng thái Đạt / Không đạt / NA, ô nhập ghi chú, bằng chứng, người phụ trách.
	•	Có summary score cuối checklist.

	7.	Quản lý tài liệu tuân thủ

	•	Giao diện giống document repository nội bộ.
	•	Có tree folder hoặc category theo tiêu chuẩn > module > loại hồ sơ.
	•	Mỗi tài liệu có version, ngày hiệu lực, người phê duyệt, trạng thái, ngày rà soát tiếp theo.
	•	Có trạng thái thiếu hồ sơ / sắp hết hiệu lực / đã đầy đủ.

	8.	Cảnh báo và công việc

	•	Màn hình task center cho người phụ trách.
	•	Hiển thị việc đến hạn, quá hạn, cần bổ sung hồ sơ, CAPA chờ duyệt.
	•	Có nhãn ưu tiên cao / trung bình / thấp.

Phong cách UI:
	•	Sidebar trái cố định.
	•	Top bar có search, notification, bộ lọc nhanh, avatar người dùng.
	•	Nhiều data table đẹp, enterprise style.
	•	Status badge rõ ràng: compliant, pending, overdue, expired, in progress, closed.
	•	Ưu tiên màu trung tính: xanh navy, xám slate, trắng, điểm nhấn xanh lá hoặc cam cho trạng thái.
	•	Thiết kế gọn, khoảng trắng hợp lý, typography rõ.
	•	Không dùng màu quá chói.
	•	Có cảm giác giống Notion + Linear + hệ thống ERP nội bộ, nhưng vẫn thân thiện với người dùng doanh nghiệp Việt Nam.

Yêu cầu screens:
	•	Tạo ít nhất 6 màn hình desktop hoàn chỉnh:
	1.	Dashboard tổng quan
	2.	Danh sách audit
	3.	Chi tiết một đợt audit
	4.	Danh sách CAPA / finding
	5.	Danh sách chứng chỉ
	6.	Màn hình checklist đánh giá
	•	Thể hiện dữ liệu mẫu thực tế của ngành may mặc Việt Nam.
	•	Dùng tên công ty “KIỂM SOÁT NỘI BỘ - VTEC”.
	•	Có dữ liệu ví dụ liên quan đến xí nghiệp, khu A, nhà máy, khách hàng và tiêu chuẩn.
	•	Nội dung giao diện nên dùng tiếng Việt.
	•	Tập trung vào cảm giác phần mềm đã sẵn sàng demo cho khách hàng doanh nghiệp.


— yêu cầu thèm —
	•	Có nhiều xí nghiệp / khu / bộ phận cùng tham gia cập nhật.
	•	Dữ liệu cần thể hiện dạng bảng theo tháng, năm, ngày audit, chi phí, đơn vị đánh giá, người phụ trách.
	•	Có logic theo dõi deadline, nhắc việc, tình trạng hồ sơ, và kết quả đánh giá.
	•	Giao diện phải cho cảm giác chuyển đổi từ Excel thủ công sang phần mềm quản trị tập trung.
	•	Ưu tiên khả năng rà soát nhanh, lọc nhanh, xem trạng thái toàn hệ thống.

