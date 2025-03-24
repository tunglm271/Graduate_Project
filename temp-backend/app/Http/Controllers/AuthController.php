<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role_id' => 'required|integer|exists:roles,id',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
    
        try {
            // Bắt đầu transaction
            DB::beginTransaction();
    
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role_id' => $request->role_id,
            ]);
    
            switch ($request->role_id) {
                case 2:
                    $patient = $user->patient()->create([
                        'name' => $request->name,
                    ]);
                    $patient->healthProfiles()->create([
                        'name' => $request->name,
                        'relationship' => 'Self',
                    ]);
                    break;
                case 4:
                    $user->medicalFacility()->create([
                        'facility_name' => $request->facility_name,
                        'phone' => $request->phone ?? null,
                        'address' => $request->address,
                        'description' => $request->description ?? null,
                        'status' => 'pending',
                        'working_time' => $request->working_time ?? null,
                        'thumbnail' => $request->thumbnail ?? null,
                        'logo' => $request->logo ?? null,
                        'website' => $request->website ?? null,
                        'lat' => $request->lat ?? null,
                        'lng' => $request->lng ?? null,
                        'legal_representative_name' => $request->legal_representative_name,
                        'legal_representative_id' => $request->legal_representative_id,
                        'tax_code' => $request->tax_code ?? null,
                        'medical_practice_license' => $request->medical_practice_license,
                        'issuance_date' => $request->issuance_date,
                        'issuance_place' => $request->issuance_place,
                    ]);
                    break;
            }
    
            // Tạo token sau khi hoàn tất
            $token = $user->createToken($user->email)->plainTextToken;
    
            // Xác nhận transaction
            DB::commit();
    
            return response()->json([
                'message' => 'User registered successfully', 
                'user' => $user,
                'token' => $token
            ], 201);
    
        } catch (\Exception $e) {
            // Nếu có lỗi, rollback transaction
            DB::rollBack();
            return response()->json(['error' => 'Registration failed', 'details' => $e->getMessage()], 500);
        }
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
    
        // Tìm user theo email
        $user = User::where('email', $request->email)->first();
    
        // Kiểm tra mật khẩu
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    
        // Xóa token cũ nếu cần
        $user->tokens()->delete();
    
        // Tạo token mới
        $token = $user->createToken('api-token')->plainTextToken;
    
        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Successfully logged out'], 200);
    }
}
