<?php

namespace App\Http\Controllers;

use App\Mail\ContactMessage;
use App\Mail\ReplyMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
   //Success email after registration
   public static function SendNotification($name, $email, $message, $adminEmail){
       $data = [
           'name' => $name,
           'email' => $email,
           'message' => $message,
           'adminEmail' => $adminEmail
       ];
       Mail::to($adminEmail)->send(new ContactMessage($data));
    }

    //Success email after registration
   public static function SendReply($name, $email){
       $data = [
           'name' => $name,
           'email' => $email,
       ];
       Mail::to($email)->send(new ReplyMessage($data));
    }

}
