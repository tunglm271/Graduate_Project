<?php

namespace Database\Seeders;
use DB;
use App\Models\User;
use App\Models\Role\Patient;
use App\Models\Role\MedicalFacility;
use Illuminate\Support\Facades\Hash;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    protected $defaultDescription = '
        <h2><strong>Phòng khám Đa khoa Pháp Anh - Lựa chọn sức khỏe cho mọi nhà </strong></h2><p>Chăm sóc sức khỏe là yếu tố cần thiết giúp duy trì cuộc sống hạnh phúc cho mọi gia đình. Chính vì thế, việc lựa chọn cơ sở uy tín để khám và điều trị bệnh chiếm phần lớn quan trọng. Phòng khám Đa khoa Pháp Anh tự hào là một trong những địa chỉ khám bệnh chất lượng, được đông đảo người dân trên địa bàn khu vực TP. HCM tin tưởng và lựa chọn.</p><h3><strong>Khái quát chung về Đa khoa Pháp Anh</strong></h3><p>Được thành lập vào năm 2013, phòng khám Đa khoa Pháp Anh trải qua từng bước trưởng thành, tự hào là một trong những đơn vị chăm sóc sức khỏe uy tín tại khu vực Tp. Hồ Chí Minh. Hướng đến phương châm "Sức khỏe là vàng", phòng khám luôn phấn đấu và nỗ lực không ngừng, trở thành người bạn đồng hành đáng tin cậy trong hành trình bảo vệ sức khỏe cho khách hàng.&nbsp;</p><p><img src="https://cdn.medpro.vn/prod-partner/82324185-d696-400d-b970-4b37cb533dfb-phong-kham-da-khoa-phap-anh.jpeg" alt="Phòng khám Đa khoa Pháp Anh là cơ sở y tế đáng tin cậy của nhiều người dân. Nguồn: Phòng khám Đa khoa Pháp Anh" class="ql-image"></p><p class="ql-align-center"><em>Phòng khám Đa khoa Pháp Anh là cơ sở y tế đáng tin cậy. Nguồn: Phòng khám Đa khoa Pháp Anh</em></p><h3><strong>Dịch vụ chăm sóc sức khỏe tại phòng khám </strong></h3><p><strong>Chuyên khoa</strong></p><p>Để mang đến dịch vụ khám chữa bệnh hiệu quả, đáp ứng với đa dạng nhu cầu của người dân, Đa khoa Pháp Anh đang có các chuyên khoa bao gồm:</p><p>+ Khoa Nội tổng hợp: Khám sức khỏe tổng quát; Tầm soát bệnh lý đa khoa; Tư vấn các vấn đề sức khỏe; Lập kế hoạch theo dõi định kỳ; Chẩn đoán và điều trị ngoại trú các bệnh lý nội khoa</p><p>+ Khoa Tai - mũi - họng: Chích rạch màng nhĩ; Chăm sóc tai; Chọc hút dịch vành tai; Lấy dị vật; Khâu vết rách vành tai; Làm thuốc tai; Nội soi mũi/ tai/ thanh quản – vòm họng</p><p>+ Khoa Răng hàm mặt: Khám &amp; tư vấn phụ khoa; Khám &amp; tầm soát ung thư vú; Tư vấn tầm soát ung thư cổ tử cung; Tư vấn tiền sản &amp; theo dõi thai kỳ; Tư vấn tầm soát bệnh lây qua QHTD;...</p><p>+ Khoa Chẩn đoán hình ảnh: Siêu âm; Chụp Xquang</p><p>+ Khoa Dược: nhà thuốc chuẩn GPP chuyên cung cấp đầy đủ các loại thuốc phục vụ nhu cầu khám chữa bệnh, phối hợp với các bác sĩ lâm sàng theo dõi, kiểm tra, đánh giá, giám sát và tư vấn việc sử dụng thuốc một cách hợp lý, an toàn và hiệu quả cho người bệnh.</p><p>+ Khoa Xét nghiệm: bao gồm các dịch vụ xét nghiệm tại cơ sở và tại nhà</p><p>+ Khoa Nội soi tiêu hóa: Nội soi trực tràng, dạ dày, thực quản,..</p><p><img src="https://cdn.medpro.vn/prod-partner/da034724-a301-4b11-8ab9-fde6e7863894-dv-kham-suc-khoe-tai-da-khoa-phap-anh.jpeg" alt="Dịch vụ khám và điều trị bệnh tại Đa khoa Pháp Anh luôn đa dạng và chất lượng. Nguồn: Internet" class="ql-image"></p><p><br></p><p class="ql-align-center"><em>Dịch vụ khám và điều trị bệnh tại Đa khoa Pháp Anh đa dạng và chất lượng. Nguồn: Internet</em></p><p><strong>Các gói khám sức khỏe tiện lợi</strong></p><p>Song song với đó, phòng khám cũng mở rộng dịch vụ với các gói khám, hỗ trợ chăm sóc sức khỏe một cách toàn diện và tiện lợi. Các gói khám đều có chi phí phải chăng, phù hợp với túi tiền của nhiều người. Một số gói khám nổi bật tại Pháp Anh như:</p><p>+ Gói chăm sóc sức khỏe cho cha mẹ</p><p>+ Gói khám sức khỏe xin việc; sức khỏe doanh nghiệp</p><p>+ Gói khám tổng quát cơ bản; cao cấp</p><p>+ Các gói tầm soát: chức năng gan; ung thư tiêu hóa; nguy cơ đột quỵ,...</p><p>+ Xét nghiệm tiêm mạch,...</p><p>Đặc biệt, nắm bắt thị hiếu của người dân với xu hướng trực tuyến đầy tiện lợi, phòng khám đã kết hợp cùng với Medpro, cho phép người dân đặt lịch online các dịch vụ khám chuyên khoa, gói khám sức khỏe và <strong>xét nghiệm tại nhà</strong>.</p><p>Với <strong><em>dịch vụ xét nghiệm tại nhà</em></strong>, khi đăng ký dịch vụ trên nền tảng Medpro, khách hàng sẽ được trải nghiệm các tiện ích có một không hai:</p><p>+ Lấy mẫu miễn phí tại nhà ( áp dụng khu vực TP.HCM, trừ Nhà Bè)</p><p>+ Hỗ trợ trả kết quả nhanh chóng qua bưu điện.</p><p>+ Bác sĩ tư vấn kết quả xét nghiệm thông qua tính năng tư vấn khám bệnh qua video.&nbsp;</p><h3><strong>Tập thể Đa khoa Pháp Anh tận tâm, tận tình</strong></h3><p>Một trong những điểm sáng tại Pháp Anh chính là đội ngũ y bác sĩ, hiện đang công tác tại các cơ sở y tế uy tín hàng đầu như bệnh viện Chợ Rẫy, bệnh viện Đại học Y dược TP. HCM, Bệnh viện Medic... Không chỉ đảm bảo yếu tố về mặt chuyên môn, các bác sĩ luôn tận tâm, tận tụy trong công việc, đặt người bệnh là trung tâm, mang đến cảm giác gần gũi và thân thuộc cho người dân khi đến với Pháp Anh. Để liên tục cập nhật những kiến thức y khoa tiên tiến, hiện đại nhất, phòng khám hợp tác chuyên môn với các bệnh viện trong và ngoài nước, nâng cao kỹ năng khám chữa bệnh.</p><p>Bên cạnh đó, các nhân viên y tế tại phòng khám luôn không ngừng tiếp thu, học hỏi để mang đến trải nghiệm dịch vụ tốt nhất cho người bệnh. Quy trình tiếp đón và hướng dẫn cho người bệnh và thân nhân luôn được đảm bảo một cách chỉnh chu, thân thiện.</p><p><img src="https://cdn.medpro.vn/prod-partner/e7ceef4e-6370-411f-9922-d7fecb282abf-doi-ngu-bac-sy-tai-da-khoa-phap-anh.jpeg" alt="Các bác sĩ tại Đa khoa Pháp anh hiện đang công tác tại các bệnh viện hàng đầu. Nguồn: Internet " class="ql-image"></p><p><br></p><p class="ql-align-center"><em>Các bác sĩ tại Đa khoa Pháp anh hiện đang công tác tại các bệnh viện hàng đầu. Nguồn: Internet&nbsp;</em></p><h3><strong>Hệ thống trang thiết bị đạt chuẩn</strong></h3><p>Nhằm đáp ứng chất lượng khám chữa bệnh đạt hiệu quả tốt nhất, phòng khám trang bị cơ sở vật chất cho từng chuyên khoa. Các thiết bị được sử dụng trong Chẩn đoán hình ảnh như Máy X-quang kỹ thuật số hiện đại, siêu âm tổng quát, Doppler màu tim – mạch, siêu âm đầu dò âm đạo…</p><p>Đối với quy trình xét nghiệm tại Pháp Anh, phòng khám đã đầu tư hệ thống thiết bị y khoa đồng bộ, tân tiến, đạt chuẩn An toàn sinh học cấp II với đầy đủ các chức năng như: Sinh hóa, Huyết học, Miễn dịch, Vi sinh và Ký sinh trùng… nhằm hỗ trợ tối đa cho quá trình chẩn đoán bệnh.</p><p><img src="https://cdn.medpro.vn/prod-partner/38344f4e-a539-4e55-8f7c-132d8bad3bea-trang-thiet-bi-tai-da-khoa-phap-anh.jpeg" alt="Phòng khám trang bị các máy móc hiện đại, tiên tiến bậc nhất. Nguồn: Internet" class="ql-image"></p><p class="ql-align-center"><em>Phòng khám trang bị các máy móc hiện đại, tiên tiến bậc nhất. Nguồn: Internet</em></p><h3><strong>Hướng đến mục tiêu vì cộng đồng</strong></h3><p>Không chỉ đơn thuần là cơ sở cung cấp các dịch vụ y tế, phòng khám Đa khoa Pháp Anh luôn hướng mục tiêu phụng sự cho cộng đồng bằng các hoạt động thiết thực và nhân ái.</p><p>Bên cạnh việc khám chữa bệnh cho người dân, đội ngũ lãnh đạo và y bác sĩ của phòng khám còn thường xuyên triển khai các chương trình thăm khám từ thiện miễn phí, hỗ trợ tối đa BHYT cho các bệnh nhân có hoàn cảnh khó khăn. Nhờ đó, hàng nghìn người bệnh trên khắp các tỉnh thành phía Nam đã được chữa trị thành công và có cơ hội cải thiện cuộc sống.</p><p>Ngoài ra, Phòng khám Đa khoa Pháp Anh còn là nhà tài trợ và bảo trợ nhiều hoạt động xã hội ý nghĩa, như: xây dựng nhà tình nghĩa, tặng quà cho trẻ em nghèo, tổ chức các chương trình thiện nguyện,...</p><p><em><img src="https://cdn.medpro.vn/prod-partner/fde02ffd-6a1d-49dc-9fd6-6f71a2684be4-phong-kham-da-khoa-phap-anh.jpeg" alt="Phòng khám thường xuyên tổ chức các chương trình thiện nguyện vì cộng đồng. Nguồn: Internet" class="ql-image"></em></p><p class="ql-align-center"><em>Phòng khám thường xuyên tổ chức các chương trình thiện nguyện. Nguồn: Internet</em></p><h3><strong>Đặt lịch Đa khoa Pháp Anh trên nền tảng Mepdro</strong></h3><p>Hiện nay, phòng khám cho phép đặt lịch trên Medpro. Nếu có nhu cầu khám và điều trị bệnh tại Đa khoa Pháp Anh, người dân có thể:</p><ol><li>Truy cập website<a href=" https://medpro.vn/phong-kham-da-khoa-phap-anh/hinh-thuc-dat-kham" rel="noopener noreferrer" target="_blank"> https://medpro.vn/phong-kham-da-khoa-phap-anh/hinh-thuc-dat-kham</a> hoặc ứng dụng Medpro trên di động.</li><li>Gọi đến tổng đài <strong>1900 2115 </strong>để được hỗ trợ tư vấn chi tiết về quy trình đặt lịch.</li></ol><p>Cú bắt tay hợp tác giữa Medpro và Pháp Anh đánh dấu bước tiếp cận với chăm sóc sức khỏe mới và tiện lợi hơn cho người bệnh. Đặt lịch ngay hôm nay để trải nghiệm các dịch vụ chăm sóc sức khỏe siêu tiện lợi đến từ phòng khám Đa khoa Pháp Anh.&nbsp;</p>
    ';


    protected $facilities = [
        [
            'logo' => "https://res.cloudinary.com/dftiye2et/image/upload/v1740473611/facility1_dtegiu",
            'facility_name' => 'Phòng khám nhi đồng 2',
            'address' => "222-224-226 Nguyễn Duy Dương, Phường 4, Quận 10, TP.HCM",
        ],
        [
            'logo' => "https://res.cloudinary.com/dftiye2et/image/upload/v1740473611/facility2_y5loth",
            'facility_name' => 'Phòng khám trung ương',
            'address' => "222-224-226 Nguyễn Duy Dương, Phường 4, Quận 10, TP.HCM",
        ],
        [
            'logo' => "https://res.cloudinary.com/dftiye2et/image/upload/v1740473611/facility3_xnesoj",
            'facility_name' => 'Phòng khám đa khoa minh nhật',
            'address' => "222-224-226 Nguyễn Duy Dương, Phường 4, Quận 10, TP.HCM",
        ],
    ];
    
    public function run(): void

    {
        // User::factory(10)->create();
        $this->call([
            MedicineSeeder::class,
            AllergySeeder::class,
            DiseaseSeeder::class,
            VoyagerDatabaseSeeder::class,
        ]);
        
        $admin = User::factory()->create([
            'name' => 'Test Admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('12345678'),
            'role_id' => 1,
        ]);

        DB::transaction(function () {
            // Tạo 2 bệnh nhân
            foreach (['Test Patient 1', 'Test Patient 2'] as $index => $patientName) {
                $patient = User::factory()->create([
                    'name' => $patientName,
                    'email' => 'patient' . ($index + 1) . '@example.com',
                    'password' => Hash::make('12345678'),
                    'role_id' => 2,
                ]);

                $patientProfile = Patient::create([
                    'user_id' => $patient->id,
                    'name' => $patientName,
                ]);

                // Tạo hồ sơ sức khỏe
                $patientProfile->healthProfiles()->create([
                    'name' => $patientName,
                    'relationship' => 'Self',
                ]);
            }
        });
        
        User::factory()->create([
            'name' => 'Test Doctor',
            'email' => 'doctor@example.com',
            'password' => bcrypt('12345678'),
            'role_id' => 3,
        ]);
                
        foreach ($this->facilities as $index => $facilityData) {
            $facilityUser = User::factory()->create([
                'name' => 'Test Facility ' . ($index + 1),
                'email' => 'facility' . ($index + 1) . '@example.com',
                'password' => Hash::make('12345678'),
                'role_id' => 4,
            ]);

            MedicalFacility::create([
                'user_id' => $facilityUser->id,
                'facility_name' => $facilityData['facility_name'],
                'phone' => "1900 2115",
                'address' => $facilityData["address"],
                'description' => $this->defaultDescription,
                'status' => 'pending',
                'working_time' => "Thứ 2 - Thứ 7: 07:00 - 16:00 | Chủ Nhật: 07:00 - 12:00",
                'thumbnail' => null,
                'logo' => $facilityData['logo'],
                'website' => null,
                'lat' => 0,
                'lng' => 0,
                'legal_representative_name' => 'Người đại diện ' . ($index + 1),
                'legal_representative_id' => 'ID' . ($index + 1),
                'tax_code' => 'TAX' . ($index + 1),
                'medical_practice_license' => 'LICENSE' . ($index + 1),
                'issuance_date' => now(),
                'issuance_place' => 'Cơ quan cấp ' . ($index + 1),
            ]);
        }
    }
}
