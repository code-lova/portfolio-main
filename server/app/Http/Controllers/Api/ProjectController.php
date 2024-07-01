<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{
    public function storeProjectApi(Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'category_id'=> 'required',
                'image'=> 'required|mimes:jpeg,jpg,png,webp|max:2048',
                'project_name' => 'required|max:191',
                'description' => 'required',
                'hash_tag_tech' => 'required',
                'status' => 'required',
            ],[
                'description.required'=> 'project description is required',
                'project_name.required'=> 'The project name is necessary',

            ]);

            if($validator->fails()){
                return response()->json([
                    'errors' => $validator->errors(),
                ]);
            }else{
                $project = new Project();
                $project->category_id = $request->category_id;
                $project->project_name = $request->project_name;
                $project->description = $request->description;
                $project->hash_tag_tech = $request->hash_tag_tech;
                $project->code_base = $request->code_base;
                $project->project_link = $request->project_link;
                $project->demo_link = $request->demo_link;
                if($request->hasFile('image')){
                    $file = $request->file('image');
                    $filename = time() .'.'.$file->hashName();
                    $file->move('uploads/project/', $filename);
                    $project->image = 'uploads/project/'.$filename;

                }
                $project->status = $request->status == true ? '1': '0';
                $project->save();
                return response()->json([
                    'status' => 200,
                    'message' => "New Project was Created."
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



    public function fetchProjectApi(){
        try{
            $project = Project::all();
            return response()->json([
                'status' => 200,
                'project' => $project
            ]);
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

    public function EditProjectApi(int $id) {
        try{

            $projectId = Project::findOrFail($id);
            if($projectId){
                return response()->json([
                    'status' => 200,
                    'project' => $projectId
                ]);
            }
        }catch(\Exception $e){
            Log::error($e->getMessage(), ['exception' => $e]);

            $message = app()->environment('production')
            ? 'Something Went Wrong'
            : $e->getMessage();

            return response()->json([
                'message' => $message
            ], 500);
        }
    }



    public function updateProjectApi(Request $request, int $id){
        try{
            $validator = Validator::make($request->all(), [
                'category_id'=> 'required',
                'project_name' => 'required|max:191',
                'description' => 'required',
                'hash_tag_tech' => 'required',
                'status' => 'required',
            ],[
                'description.required'=> 'project description is required',
                'project_name.required'=> 'The project name is necessary',
            ]);

            if($validator->fails()){
                return response()->json([
                    'errors' => $validator->errors(),
                ]);
            }else{
                $project = Project::findOrFail($id);
                $project->category_id = $request->category_id;
                $project->project_name = $request->project_name;
                $project->description = $request->description;
                $project->hash_tag_tech = $request->hash_tag_tech;
                $project->code_base = $request->code_base;
                $project->project_link = $request->project_link;
                $project->demo_link = $request->demo_link;
                if($request->hasFile('image')){

                    $destination_path = $project->image;
                    if(File::exists($destination_path)){
                        File::delete($destination_path);
                    }
                    $file = $request->file('image');
                    $filename = time() .'.'.$file->hashName();
                    $file->move('uploads/project/', $filename);
                    $project->image = 'uploads/project/'.$filename;

                }
                $project->status = $request->status == true ? '1': '0';
                $project->save();
                return response()->json([
                    'status' => 200,
                    'message' => "Project Updated Successfully."
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



    public function deleteProjectApi(int $id){
        try{
            $project = Project::find($id);
            if($project){
                $project->delete();
                return response()->json([
                    'status' => 200,
                    'message' => 'Project Deleted Successfully'
                ]);
            }else{
                return response()->json([
                    'status' => 404,
                    'message' => 'Record ID Not Found'
                ]);
            }
        }catch(\Exception $e){
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
