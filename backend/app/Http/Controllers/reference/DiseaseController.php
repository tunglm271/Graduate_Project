<?php

namespace App\Http\Controllers\reference;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;
class DiseaseController extends Controller
{
    public function getDiseases(Request $request)
    {
        // Kiểm tra cache Redis trước khi truy vấn DB
        $disease = Redis::get('disease_list');
        
        if (!$disease) {
            // Nếu không có trong Redis, thực hiện truy vấn từ DB và lưu vào Redis
            $disease = DB::table('diseases')->get();

            // Lưu vào Redis trong 10 phút (600 giây)
            Redis::setex('disease_list', 600, json_encode($disease));
        } else {
            // Nếu có trong Redis, giải mã dữ liệu
            $disease = json_decode($disease);
        }

        return response()->json($disease);
    }
}
