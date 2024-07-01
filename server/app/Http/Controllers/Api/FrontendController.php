<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Models\Blog;

class FrontendController extends Controller
{
    public function fetchProjectsApi(){
        try{
            $project = Project::where('status', '1')->orderBy('id', 'DESC')->get();
            if($project){
                return response()->json([
                    'status' => 200,
                    'project' => $project
                ]);
            }

        }catch(Exception $e){
            Log::error($e->getMessage(), ['exception' => $e]);

            $message = app()->environment('production')
            ? 'Something Went Wrong'
            : $e->getMessage();

            return response()->json([
                'message' => $message
            ], 500);
        }
    }



    public function fetchBlogsApi(){
        try{
            $blog = Blog::where('status', '1')->orderBy('id', 'DESC')->limit(3)->get();
            if($blog){
                return response()->json([
                    'status' => 200,
                    'blog' => $blog
                ]);
            }

        }catch(Exception $e){
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
