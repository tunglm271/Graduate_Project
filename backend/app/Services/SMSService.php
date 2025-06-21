<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class SmsService
{
    public static function sendOtpViaEsms(string $phone, string $code): array
    {
        $apiKey = "";
        $secretKey = "";
        $brandname = 'Baotrixemay';

        $payload = [
            "ApiKey"     => $apiKey,
            "Content"    => "$code la ma xac minh dang ky Baotrixemay cua ban",
            "Phone"      => $phone,
            "SecretKey"  => $secretKey,
            "Brandname"  => $brandname,
            "SmsType"    => "2", // 2 = OTP
            "IsUnicode"  => "0",
            "campaignid" => "Cam on sau mua hang thang 7",
            "RequestId"  => Str::uuid()->toString(),
            "CallbackUrl" => "https://esms.vn/webhook/",
            "Sandbox" => "1",
        ];

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post('https://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_post_json/', $payload);

        return $response->json();
    }
}
