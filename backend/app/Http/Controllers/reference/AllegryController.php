<?php

namespace App\Http\Controllers\Reference;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;

class AllegryController extends Controller
{
    public function getAllergies(Request $request)
    {
        // Kiểm tra cache Redis trước khi truy vấn DB
        $allergy = Redis::get('allergy_list');
        
        if (!$allergy) {
            // Nếu không có trong Redis, thực hiện truy vấn từ DB và lưu vào Redis
            $allergy = DB::table('allergies')->get();

            // Lưu vào Redis trong 10 phút (600 giây)
            Redis::setex('allergy_list', 600, json_encode($allergy));
        } else {
            // Nếu có trong Redis, giải mã dữ liệu
            $allergy = json_decode($allergy);
        }

        return response()->json($allergy);
    }
}

