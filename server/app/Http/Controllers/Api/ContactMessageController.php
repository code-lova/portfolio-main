<?php

namespace App\Http\Controllers\Api;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Http\Controllers\MailController;
use App\Models\ContactMessage;
use App\Models\Settings;
use Illuminate\Support\Facades\Validator;

class ContactMessageController extends Controller
{
    public function ContactMessageApi(Request $request){
        try{

            $validator = Validator::make($request->all(), [
                'name' => [
                    'required',
                    'max:100',
                    'string',
                    'regex:/^[a-zA-Z0-9\s]+$/'
                ],
                'email' => 'required|email',
                'message' => [
                    'required',
                    'max:1000',
                    'regex:/^[a-zA-Z0-9\s\.,!?\'"-]+$/'
                ]
            ],[
                'name.required'=> 'Your name is required',
                'name.string'=> 'Only strings of character is required',
                'name.max'=> 'Name field has exceeded required limit',
                'name.regex' => 'The name field contains invalid characters',
                'email.required'=> 'Your email is required',
                'email.email'=> 'Not a valid email address',
                'message.regex' => 'The message field contains invalid characters'
            ]);

            if($validator->fails()){
                return response()->json([
                    'status' => 422,
                    'errors' => $validator->errors(),
                ]);
            }else{
                $adminEmail = env(key: 'NOTIFICATION_EMAIL');
                $settings = Settings::find(1);

                $message = new ContactMessage();
                $message->name = $request->name;
                $message->email = $request->email;
                $message->message = $request->message;
                $message->save();
                if($message){
                    if($settings->email_notification == 1){
                        MailController::SendNotification(
                            $message->name,
                            $message->email,
                            $message->message,
                            $adminEmail
                        );
                        MailController::SendReply($message->name, $message->email);
                    }else{
                        return response()->json([
                            'status' => 200,
                            'message' => "Message Sent Successfully."
                        ]);
                    }
                }
                return response()->json([
                    'status' => 200,
                    'message' => "Message Sent Successfully."
                ]);
            }



        }catch(\Exception $e){
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
}
