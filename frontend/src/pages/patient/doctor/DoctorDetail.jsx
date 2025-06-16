import React from "react";

export default function DoctorDetail() {
  return (
    <div className="container mx-auto p-4">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-4">
        Trang chủ &gt; Bác sĩ &gt; BS. Võ Thị My Na
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center space-x-6">
          <img
            src="https://via.placeholder.com/100" // Placeholder image
            alt="Doctor Avatar"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold text-blue-600">
              BS. Võ Thị My Na
            </h1>
            <p className="text-gray-700">Chuyên khoa: Nhi Khoa</p>
            <p className="text-gray-700">
              Chuyên trị: Chuyên sâu về dị ứng, hô hấp, miễn dịch và dinh dưỡng
            </p>
            <p className="text-gray-700">Giá khám: 150.000đ</p>
            <p className="text-gray-700">Lịch khám: Hẹn khám</p>
            <div className="flex items-center text-blue-500 mt-2">
              <i className="fas fa-user-md mr-2"></i>
              <span>Bác sĩ Chuyên Khoa</span>
            </div>
            <p className="text-sm text-gray-500">
              Tư vấn Online qua App Medpro
            </p>
          </div>
          <button className="ml-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Đặt khám ngay
          </button>
        </div>
      </div>

      {/* Introduction and Related Articles Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Introduction Section */}
        <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-blue-600 mb-4">Giới thiệu</h2>
          <p className="text-gray-700 mb-4">
            Bác sĩ Võ Thị My Na phụ trách chuyên môn và hiện đang công tác tại{" "}
            <span className="font-semibold">Bệnh viện Nhi đồng 2</span> – Là địa
            chỉ uy tín dành cho các bậc phụ huynh khi cần chăm sóc sức khỏe cho
            trẻ nhỏ.
          </p>
          <p className="text-gray-700 mb-4">
            Với hơn{" "}
            <span className="font-semibold">
              10 năm kinh nghiệm trong lĩnh vực Nhi khoa
            </span>
            , bác sĩ My Na đã trực tiếp thăm khám và điều trị cho hơn{" "}
            <span className="font-semibold">500.000 trẻ em</span>, đặc biệt
            chuyên sâu về{" "}
            <span className="font-semibold">
              dị ứng, hô hấp, miễn dịch và dinh dưỡng
            </span>
            .
          </p>

          <h3 className="text-lg font-bold text-blue-600 mb-3">
            Thành tích nổi bật:
          </h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>2009: Thủ khoa kỳ thi đại học tỉnh Kon Tum</li>
            <li>
              2009 - 2014: Tốt nghiệp bác sĩ đa khoa tại Đại học Y Dược TPHCM;
            </li>
            <li>2014 - nay: Làm việc tại Bệnh viện Nhi đồng 2.</li>
          </ul>
        </div>

        {/* Related Articles Section */}
        <div className="md:col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-blue-600 mb-4">
            Bài viết liên quan
          </h2>
          <div className="space-y-4">
            {/* Article 1 */}
            <div className="flex items-start space-x-3">
              <img
                src="https://via.placeholder.com/60" // Placeholder image
                alt="Article Thumbnail"
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="text-blue-600 text-sm">
                  Triệt lông vĩnh viễn bao nhiêu tiền? Ở đâu uy tín?
                </p>
                <div className="flex items-center text-gray-500 text-xs">
                  <i className="fas fa-calendar-alt mr-1"></i>
                  <span>15/06/2025</span>
                </div>
              </div>
            </div>
            {/* Article 2 */}
            <div className="flex items-start space-x-3">
              <img
                src="https://via.placeholder.com/60" // Placeholder image
                alt="Article Thumbnail"
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="text-blue-600 text-sm">
                  Top 6 địa chỉ khám chữa bệnh zona thần kinh uy tín nhất
                </p>
                <div className="flex items-center text-gray-500 text-xs">
                  <i className="fas fa-calendar-alt mr-1"></i>
                  <span>09/06/2025</span>
                </div>
              </div>
            </div>
            {/* Article 3 */}
            <div className="flex items-start space-x-3">
              <img
                src="https://via.placeholder.com/60" // Placeholder image
                alt="Article Thumbnail"
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="text-blue-600 text-sm">
                  Bệnh tim mạch khám chữa ở đâu tốt nhất TPHCM?
                </p>
                <div className="flex items-center text-gray-500 text-xs">
                  <i className="fas fa-calendar-alt mr-1"></i>
                  <span>05/06/2025</span>
                </div>
              </div>
            </div>
            {/* Article 4 */}
            <div className="flex items-start space-x-3">
              <img
                src="https://via.placeholder.com/60" // Placeholder image
                alt="Article Thumbnail"
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="text-blue-600 text-sm">
                  Mổ sỏi túi mật ở đâu tốt nhất TPHCM? Top 4 địa chỉ hàng đầu
                  nên biết
                </p>
                <div className="flex items-center text-gray-500 text-xs">
                  <i className="fas fa-calendar-alt mr-1"></i>
                  <span>03/06/2025</span>
                </div>
              </div>
            </div>
            {/* Article 5 */}
            <div className="flex items-start space-x-3">
              <img
                src="https://via.placeholder.com/60" // Placeholder image
                alt="Article Thumbnail"
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="text-blue-600 text-sm">
                  Bị ù tai khám ở đâu? Gợi ý 5 bệnh viện
                </p>
                <div className="flex items-center text-gray-500 text-xs">
                  <i className="fas fa-calendar-alt mr-1"></i>
                  <span>25/05/2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Doctors Section */}
      <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">
        Bác sĩ cùng cơ sở y tế
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
        {/* Doctor Card 1 */}
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <img
            src="https://via.placeholder.com/80" // Placeholder image
            alt="Doctor Avatar"
            className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
          />
          <h3 className="text-lg font-semibold text-blue-600">
            BS.CKI. Đỗ Đăng Khoa | Tim Mạch
          </h3>
          <p className="text-gray-700 text-sm">
            Chuyên trị: BS Đỗ Đăng Khoa là Bác sĩ chuyên ngành Nội tim mạch –
            Tim mạch can thiệp.
          </p>
          <p className="text-gray-700 text-sm">
            Lịch khám: Thứ 2,3,4,5,6,7,Chủ nhật,Hẹn khám
          </p>
          <p className="text-gray-700 text-sm font-bold">Giá khám: 200.000đ</p>
          <button className="text-blue-500 text-sm mt-2">Xem chi tiết</button>
          <div className="flex items-center text-blue-500 text-sm mt-3 justify-center">
            <i className="fas fa-user-md mr-1"></i>
            <span>Bác sĩ Chuyên Khoa</span>
          </div>
          <p className="text-xs text-gray-500">Tư vấn Online qua App Medpro</p>
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full">
            Đặt ngay
          </button>
        </div>
        {/* Doctor Card 2 */}
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <img
            src="https://via.placeholder.com/80" // Placeholder image
            alt="Doctor Avatar"
            className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
          />
          <h3 className="text-lg font-semibold text-blue-600">
            Ths BS. Lê Hoàng Thiện | Tổng Quát
          </h3>
          <p className="text-gray-700 text-sm">Chuyên trị: Nội tổng quát</p>
          <p className="text-gray-700 text-sm">
            Lịch khám: Thứ 2,3,4,5,6,7,Chủ nhật,Hẹn khám
          </p>
          <p className="text-gray-700 text-sm font-bold">Giá khám: 149.000đ</p>
          <button className="text-blue-500 text-sm mt-2">Xem chi tiết</button>
          <div className="flex items-center text-blue-500 text-sm mt-3 justify-center">
            <i className="fas fa-user-md mr-1"></i>
            <span>Bác sĩ Chuyên Khoa</span>
          </div>
          <p className="text-xs text-gray-500">Tư vấn Online qua App Medpro</p>
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full">
            Đặt ngay
          </button>
        </div>
        {/* Doctor Card 3 */}
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <img
            src="https://via.placeholder.com/80" // Placeholder image
            alt="Doctor Avatar"
            className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
          />
          <h3 className="text-lg font-semibold text-blue-600">
            BS.CKI. Vũ Thị Hà | Mắt
          </h3>
          <p className="text-gray-700 text-sm">
            Chuyên trị: Điều trị, tư vấn cũng như phẫu thuật các bệnh lý tại mắt
            như đục thể thủy tinh, glaucoma, mộng thịt,...
          </p>
          <p className="text-gray-700 text-sm">
            Lịch khám: Thứ 2,3,4,5,6,7,Chủ nhật,Hẹn khám
          </p>
          <p className="text-gray-700 text-sm font-bold">Giá khám: 150.000đ</p>
          <button className="text-blue-500 text-sm mt-2">Xem chi tiết</button>
          <div className="flex items-center text-blue-500 text-sm mt-3 justify-center">
            <i className="fas fa-user-md mr-1"></i>
            <span>Bác sĩ Chuyên Khoa</span>
          </div>
          <p className="text-xs text-gray-500">Tư vấn Online qua App Medpro</p>
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full">
            Đặt ngay
          </button>
        </div>
        {/* Doctor Card 4 */}
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <img
            src="https://via.placeholder.com/80" // Placeholder image
            alt="Doctor Avatar"
            className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
          />
          <h3 className="text-lg font-semibold text-blue-600">
            Ths BS. Trịnh Xuân Quân | Tai Mũi Họng
          </h3>
          <p className="text-gray-700 text-sm">
            Chuyên trị: Điều trị nội khoa và phẫu thuật các bệnh lý Tai Mũi Họng
            ở người lớn và trẻ em
          </p>
          <p className="text-gray-700 text-sm">
            Lịch khám: Thứ 2,3,4,5,6,7,Chủ nhật,Hẹn khám
          </p>
          <p className="text-gray-700 text-sm font-bold">Giá khám: 150.000đ</p>
          <button className="text-blue-500 text-sm mt-2">Xem chi tiết</button>
          <div className="flex items-center text-blue-500 text-sm mt-3 justify-center">
            <i className="fas fa-user-md mr-1"></i>
            <span>Bác sĩ Chuyên Khoa</span>
          </div>
          <p className="text-xs text-gray-500">Tư vấn Online qua App Medpro</p>
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full">
            Đặt ngay
          </button>
        </div>
        {/* Doctor Card 5 */}
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <img
            src="https://via.placeholder.com/80" // Placeholder image
            alt="Doctor Avatar"
            className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
          />
          <h3 className="text-lg font-semibold text-blue-600">
            Ths BS. Nguyễn Ngọc Bách - Nhi Đồng 1 | Nhi Khoa
          </h3>
          <p className="text-gray-700 text-sm">
            Chuyên trị: Hen suyễn, ho kéo dài ở trẻ. Tư vấn, chăm sóc
          </p>
          <p className="text-gray-700 text-sm">
            Lịch khám: Thứ 2,3,4,5,6,7,Chủ nhật,Hẹn khám
          </p>
          <p className="text-gray-700 text-sm font-bold">Giá khám: 150.000đ</p>
          <button className="text-blue-500 text-sm mt-2">Xem chi tiết</button>
          <div className="flex items-center text-blue-500 text-sm mt-3 justify-center">
            <i className="fas fa-user-md mr-1"></i>
            <span>Bác sĩ Chuyên Khoa</span>
          </div>
          <p className="text-xs text-gray-500">Tư vấn Online qua App Medpro</p>
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full">
            Đặt ngay
          </button>
        </div>
        {/* Doctor Card 6 */}
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <img
            src="https://via.placeholder.com/80" // Placeholder image
            alt="Doctor Avatar"
            className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
          />
          <h3 className="text-lg font-semibold text-blue-600">
            Bác sĩ Nguyễn Lê Nguyên | Truyền Nhiễm - Tâm Thần
          </h3>
          <p className="text-gray-700 text-sm">
            Chuyên trị: Tâm thần, Truyền nhiễm
          </p>
          <p className="text-gray-700 text-sm">
            Lịch khám: Thứ 2,3,4,5,6,7,Chủ nhật,Hẹn khám
          </p>
          <p className="text-gray-700 text-sm font-bold">Giá khám: 250.000đ</p>
          <button className="text-blue-500 text-sm mt-2">Xem chi tiết</button>
          <div className="flex items-center text-blue-500 text-sm mt-3 justify-center">
            <i className="fas fa-user-md mr-1"></i>
            <span>Bác sĩ Chuyên Khoa</span>
          </div>
          <p className="text-xs text-gray-500">Tư vấn Online qua App Medpro</p>
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full">
            Đặt ngay
          </button>
        </div>
      </div>
      <div className="text-center">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded">
          Xem thêm
        </button>
      </div>
    </div>
  );
}
