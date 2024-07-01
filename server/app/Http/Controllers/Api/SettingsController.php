<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Models\Settings;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class SettingsController extends Controller
{
    public function UpdatePasswordApi(Request $request){
        try{
            // Validate the request
            $validator = Validator::make($request->all(), [
                'oldpassword' => 'required',
                'password' => 'required|min:8|confirmed',
            ],[
                'oldpassword.required' => 'Current password is required',
                'password.required' => 'New password is required',
                'password.min' => 'New password must be at least 8 characters',
                'password.confirmed' => 'New password and confirmation do not match',
            ]);
            // If validation fails, return the errors
            if ($validator->fails()) {
                return response()->json([
                    'status' => 422,
                    'errors' => $validator->errors(),
                ]);
            }
            // Get the authenticated user
            $user = User::find(Auth::user()->id);
            if($user){
                if(Hash::check($request->oldpassword, $user->password)){
                    $user->password = Hash::make($request->password);
                    $user->save();
                    return response()->json([
                        'status' => 200,
                        'message' => 'Password updated successfully.',
                    ]);
                }else{
                    return response()->json([
                        'status' => 401,
                        'message' => 'Current password is incorrect',
                    ]);
                }
            }else {
                return response()->json([
                    'status' => 401,
                    'message' => 'Unauthorized access',
                ]);
            }
        }catch (\Exception $e) {
            Log::error($e->getMessage(), ['exception' => $e]);

            $message = app()->environment('production')
                ? 'Something Went Wrong'
                : $e->getMessage();

            return response()->json([
                'message' => $message,
            ], 500);
        }
    }


    //function to update switch
    public function updateSettingsApi(Request $request){
        try{
             // Validate the request
             $validator = Validator::make($request->all(), [
                'blog' => 'required',
                'email_notification' => 'required',
            ]);
            // If validation fails, return the errors
            if ($validator->fails()) {
                return response()->json([
                    'status' => 422,
                    'errors' => $validator->messages(),
                ]);
            }
            $updateSettings = Settings::where('id', '1')->first();
            if($updateSettings){
                $updateSettings->blog = $request->blog == true ? '1':'0';
                $updateSettings->email_notification = $request->email_notification == true ? '1':'0';
                $updateSettings->save();
                return response()->json([
                    'status' => 200,
                    'message' => 'Settings updated successfully.',
                ]);
            }
            else{
                $updateSettings = new Settings;
                $updateSettings->blog = $request->blog == true ? '1':'0';
                $updateSettings->email_notification = $request->email_notification == true ? '1':'0';
                $updateSettings->save();
                return response()->json([
                    'status' => 200,
                    'message' => 'Settings Added successfully.',
                ]);
            }

        }catch (\Exception $e) {
            Log::error($e->getMessage(), ['exception' => $e]);

            $message = app()->environment('production')
                ? 'Something Went Wrong'
                : $e->getMessage();

            return response()->json([
                'message' => $message,
            ], 500);
        }
    }


}
