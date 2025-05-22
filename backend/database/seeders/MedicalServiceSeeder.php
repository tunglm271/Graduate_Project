<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MedicalService;

class MedicalServiceSeeder extends Seeder
{
    private function getImgUrl($i) {
        return "https://res.cloudinary.com/dftiye2et/image/upload/v1740473611/medical-service-{$i}";
    }

    public function run(): void
    {
        $services = [
            [
                'name' => 'Nội soi dạ dày',
                'category' => 'Nội soi',
                'duration' => 60,
                'description' => 'Dịch vụ nội soi dạ dày giúp chẩn đoán các bệnh lý về dạ dày như viêm loét, xuất huyết, polyp... được thực hiện bằng thiết bị nội soi hiện đại, đảm bảo an toàn và chính xác.'
            ],
            [
                'name' => 'Tầm soát ung thư vú',
                'category' => 'Tầm soát ung thư',
                'duration' => 45,
                'description' => 'Dịch vụ tầm soát ung thư vú giúp phát hiện sớm các khối u bất thường, tăng khả năng điều trị thành công. Khuyến khích phụ nữ trên 40 tuổi nên kiểm tra định kỳ.'
            ],
            [
                'name' => 'Khám tổng quát',
                'category' => 'Khám sức khỏe định kỳ',
                'duration' => 90,
                'description' => 'Gói khám tổng quát bao gồm kiểm tra huyết áp, chỉ số sinh học, xét nghiệm máu, siêu âm ổ bụng... nhằm đánh giá toàn diện tình trạng sức khỏe hiện tại.'
            ],
            [
                'name' => 'Xét nghiệm máu',
                'category' => 'Xét nghiệm',
                'duration' => 30,
                'description' => 'Dịch vụ xét nghiệm máu kiểm tra các chỉ số như đường huyết, mỡ máu, chức năng gan thận... Giúp chẩn đoán sớm các bệnh lý nguy hiểm và theo dõi điều trị.'
            ],
            [
                'name' => 'Siêu âm bụng tổng quát',
                'category' => 'Chẩn đoán hình ảnh',
                'duration' => 40,
                'description' => 'Dịch vụ siêu âm bụng tổng quát kiểm tra các cơ quan như gan, mật, thận, tụy, bàng quang... bằng thiết bị siêu âm hiện đại, không xâm lấn và an toàn.'
            ],
            [
                'name' => 'Khám phụ khoa',
                'category' => 'Sản phụ khoa',
                'duration' => 50,
                'description' => 'Dịch vụ khám phụ khoa định kỳ giúp phát hiện và điều trị sớm các bệnh lý phụ khoa như viêm nhiễm, u nang buồng trứng, ung thư cổ tử cung,... Phù hợp với phụ nữ đã lập gia đình.'
            ],
            [
                'name' => 'Khám tai mũi họng',
                'category' => 'Chuyên khoa',
                'duration' => 30,
                'description' => 'Dịch vụ khám chuyên khoa tai - mũi - họng dành cho người bị viêm xoang, viêm họng, ù tai... Bác sĩ sẽ khám lâm sàng và đưa ra hướng điều trị phù hợp.'
            ],
            [
                'name' => 'Tư vấn dinh dưỡng',
                'category' => 'Dinh dưỡng',
                'duration' => 60,
                'description' => 'Tư vấn dinh dưỡng cho từng độ tuổi, thể trạng và bệnh lý nền. Hướng dẫn chế độ ăn khoa học giúp cải thiện sức khỏe và phòng tránh bệnh tật.'
            ],
            [
                'name' => 'Khám tim mạch',
                'category' => 'Tim mạch',
                'duration' => 60,
                'description' => 'Dịch vụ khám tim mạch giúp kiểm tra huyết áp, nhịp tim, điện tâm đồ (ECG), và phát hiện sớm các vấn đề như rối loạn nhịp tim, suy tim, bệnh mạch vành...'
            ],
            [
                'name' => 'Khám mắt',
                'category' => 'Mắt',
                'duration' => 30,
                'description' => 'Dịch vụ khám mắt bao gồm kiểm tra thị lực, đo độ cận - loạn - viễn, phát hiện các bệnh lý về mắt như đục thủy tinh thể, tăng nhãn áp, viêm kết mạc...'
            ],
        ];
        for ($i = 0; $i < 5; $i++) {
            foreach ($services as $index => $service) {
                $medicalService = MedicalService::create([
                    'name' => $service['name'],
                    'description' => $service['description'],
                    'thumbnail' => $this->getImgUrl(rand(1,5)),
                    'category' => $service['category'],
                    'price' => rand(300, 1000) * 1000,
                    'duration' => $service['duration'],
                    'status' => 'active',
                    'service_audience_gender' => ['male', 'female', 'both'][rand(0, 2)],
                    'is_public' => $index >= 5,
                    'min_age_requirement' => rand(0, 18),
                    'max_age_requirement' => rand(50, 80),
                    'medical_facility_id' => $i + 1,
                ]);
    
                $medicalService->doctors()->attach([1, 2]);
            }
        }
    }
}
