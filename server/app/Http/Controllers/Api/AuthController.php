<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function LoginApi(Request $request){
        try{

            $validator = Validator::make($request->all(), [
                'email' => 'required|email|max:20',
                'password' => 'required|min:6',
            ], [
                'email.required' => 'Provide administrative email',
                'password.required' => 'Provide administrative password'
            ]);

            if($validator->fails()){
                return response()->json([
                    'errors' => $validator->errors()
                ]);
            }else{
                $email = $request->email;
                $password = $request->password;
                $user = User::where('email', $email)->first();

                if(!$user || !Hash::check($password, $user->password)){
                    return response()->json([
                        'status' => 401,
                        'message' => 'Invalid Credentials'
                    ]);

                }else{
                    if($user->role_as == 'admin01'){
                        $role = 'admin';
                        $accessToken = $user->createToken($user->email.'_AdminToken', ['server:admin'], now()->addHour())->plainTextToken;
                    }else{
                        $role = '';
                        $accessToken = $user->createToken($user->email.'_Token', [''], now()->addHour())->plainTextToken;
                    }
                    return response()->json([
                        'status' => 200,
                        'role' => $role,
                        'access_token' => $accessToken,
                        'username' => $user->name,
                        'message' => 'Welcome Back Sir..!!!'
                    ]);
                }
            }
        }catch(Exception $e){
            // Log the exception message along with the stack trace for better debugging
            Log::error($e->getMessage(), ['exception' => $e]);

            $message = app()->environment('production')
                ? 'Something Went Wrong'
                : $e->getMessage();

            return response()->json([
                'message' => $message
            ], 500);
        }
    }



    //Logout controller
    public function logoutApi(Request $request)
    {
        try {
            // Deleting the current access token of the authenticated user
            $request->user('sanctum')->currentAccessToken()->delete();

            return response()->json([
                'status' => 200,
                'message' => 'Logged out successfully'
            ]);

        } catch (\Exception $e) {
            // Log the exception message along with the stack trace for better debugging
            Log::error($e->getMessage(), ['exception' => $e]);

            $message = app()->environment('production') ? 'Something went wrong' : $e->getMessage();

            return response()->json([
                'status' => 500,
                'message' => $message
            ], 500);
        }
    }
}
