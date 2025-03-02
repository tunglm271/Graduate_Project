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
                case 3:
                    $user->doctor()->create();
                    break;
                case 4:
                    $user->medicalFacility()->create([
                        'facility_name' => $request->facility_name,
                        'address' => $request->address,
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
